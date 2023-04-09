from flask import Flask, jsonify, request, make_response
from flask_restful import Resource, Api
import cv2
import requests
import urllib
import numpy as np
import base64
from flask_cors import CORS

# creating the flask app
app = Flask(__name__)
CORS(app)
# creating an API object
api = Api(app)
class FaceDetect(Resource):
  
    def post(self):
        url = "https://corswarriors.pythonanywhere.com/blackflag/list/"
        r = requests.get(url = url)
        blacklist = r.json()
        input_data = request.get_json()
        encoded_data = input_data['photo'].split(',')[1]
        nparr = np.frombuffer(base64.b64decode(encoded_data), np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        histogram = cv2.calcHist([gray_image], [0], None, [256], [0, 256])
        
        histogram_list = []
        for element in blacklist:
            req = urllib.request.urlopen(element['photo'])
            arr = np.asarray(bytearray(req.read()), dtype=np.uint8)
            image = cv2.imdecode(arr, -1)
            gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
            histogram_list.append(cv2.calcHist([gray_image], [0], None, [256], [0, 256]))
        
        c_list = []
        for histogram1 in histogram_list:
            c1 = 0
            i = 0
            while i<len(histogram) and i<len(histogram1):
                c1+=(histogram[i]-histogram1[i])**2
                i+= 1
            c_list.append(c1**(1 / 2))
        print(c_list)
        c_normalised = []
        for i in c_list:
            c_normalised.append(i/sum(c_list))

        min_index = 0
        list_len = len(c_normalised)
        for index in range(list_len):
            if c_normalised[index] < c_normalised[min_index]:
                min_index = index
        print(c_normalised)
        if c_normalised[min_index] < 0.3:
            data = {
                "photo" : blacklist[min_index]["photo"],
                "score" : float(c_normalised[min_index]),
                "message" : "match found",
                "text" : blacklist[min_index]["text"]
            }
        else:
            data = {
                "message" : "match not found"
            }
        return data, 201
  
  
api.add_resource(FaceDetect, '/face-detect/')
  
# driver function
if __name__ == '__main__':
  
    app.run(debug = True)