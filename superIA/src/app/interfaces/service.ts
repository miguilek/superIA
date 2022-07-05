export interface Service {
    name: string,
    type: string,  
    uri: string,
    inputType: string,
    outputType: string,
    body: Array<string>
}
