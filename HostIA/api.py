from time import time
from flask import Flask, jsonify, request
from flask_restful import Api, Resource, reqparse
# import pickle
# import numpy as np
# import json
from microservices.microservice1 import microservice1 as ms1
from flask_cors import CORS
import time

app = Flask(__name__)
CORS(app)
api = Api(app)

# Create parser for the payload data
parser = reqparse.RequestParser()
parser.add_argument('data')

# Define how the api will respond to the post requests
# class TestRes(Resource):
#     def get(self):
#         return jsonify({"a":"get"})

#     def post(self):
#         return jsonify({"a":"post"})

#     def delete(self):
#         return jsonify({"a":"delete"})
   
# api.add_resource(TestRes, '/test')

# TODO: presentar rutas de manera dinamica
@app.post('/microservice1')
def microservice1():
    payload = request.get_json()["data"]
    print(1)
    time.sleep(1)
    print(2)

    return ms1.runService(payload)

if __name__ == '__main__':
    app.run(debug=True)