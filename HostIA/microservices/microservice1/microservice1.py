import numpy as np
import math
from typing import List
import os
import argparse
import glob
import shutil
from torchvision import transforms
import torchvision.datasets as datasets
import torch.utils.data as loader
from torchvision import models
import torch
import torch.nn as nn
import time
import torch.optim as optim
from PIL import Image
import requests
import matplotlib.pyplot as plt
import base64
import re

IMG_NAME = "targetImage.png"

def makePrediction(model, url,image_transforms, index_to_class):
    response = {}
    
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    transform = image_transforms['test']

    # test_image = Image.open(requests.get(url, stream=True).raw)
    test_image = Image.open(url)

    test_image_tensor = transform(test_image)
    test_image_tensor = test_image_tensor.view(1, 3, 224, 224).to(device)
    with torch.no_grad():
        model.eval()
        out = model(test_image_tensor)
        ps = torch.exp(out)
        
        topk, topclass = ps.topk(3, dim=1)
        for i in range(3):
            print(f"Prediction {i+1} : {index_to_class[topclass.cpu().numpy()[0][i]]}, Score: {topk.cpu().numpy()[0][i] * 100}%")
            response[index_to_class[topclass.cpu().numpy()[0][i]]] = topk.cpu().numpy()[0][i] * 100
    
    return response

def runService(base64Img):

    base64Img = re.sub('^data:image/[^;]+;base64,', '', base64Img)
    base64Img = base64.b64decode(base64Img)
    imgFile = open(IMG_NAME, 'wb')
    imgFile.write(base64Img)
    imgFile.close()
    
    image_transforms = {
        'test': transforms.Compose([
                transforms.Resize(size=256),
                transforms.CenterCrop(size=224),
                transforms.ToTensor(),
                transforms.Normalize([0.485, 0.456, 0.406],[0.229, 0.224, 0.225])              
        ])
    }

    data = {
        'test': datasets.ImageFolder(root='./101_ObjectCategories_sets/test', transform=image_transforms['test'])
    }

    model = models.resnet50(pretrained=False)

    fc_inputs = model.fc.in_features

    model.fc = nn.Sequential(
        nn.Linear(fc_inputs, 2048),
        nn.ReLU(inplace=True),
        nn.Linear(2048, 10),
        nn.Dropout(0.4),
        nn.LogSoftmax(dim=1))

    if(torch.cuda.is_available()):
        model = model.to("cuda")

    map_location=torch.device('cpu')

    model.load_state_dict(torch.load('model_0.pth',map_location=map_location))

    index_to_class = {v: k for k, v in data['test'].class_to_idx.items()}

    return makePrediction(model, './'+IMG_NAME,image_transforms, index_to_class)