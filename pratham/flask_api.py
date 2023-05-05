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


def mse(img1, img2):
    print(img1.shape)
    height1, width1 = img1.shape
    height2, width2 = img2.shape
    min_height = min(height1, height2)
    min_width = min(width1, width2)
    img11 = img1[0:min_height, 0:min_width]
    img22 = img2[0:min_height, 0:min_width]
    diff = cv2.subtract(img1, img22)
    err = np.sum(diff**2)
    mse = err/(float(min_height*min_width))
    msre = np.sqrt(mse)
    return msre, diff


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
        faceCascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
        faces = faceCascade.detectMultiScale(
            gray_image,
            scaleFactor=1.3,
            minNeighbors=3,
            minSize=(30, 30)
        )
        (x, y, w, h) = faces[-1]
        roi_gray1 = gray_image[y:y + h, x:x + w]
        # histogram = cv2.calcHist([roi_gray], [0], None, [256], [0, 256])
        
        # histogram_list = []
        error_list = []
        for element in blacklist:
            req = urllib.request.urlopen(element['photo'])
            arr = np.asarray(bytearray(req.read()), dtype=np.uint8)
            image = cv2.imdecode(arr, -1)
            gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
            faceCascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
            faces = faceCascade.detectMultiScale(
                gray_image,
                scaleFactor=1.3,
                minNeighbors=3,
                minSize=(30, 30)
            )
            (x, y, w, h) = faces[-1]
            roi_gray = gray_image[y:y + h, x:x + w]
            error, diff = mse(roi_gray, roi_gray1)
            error_list.append(error)

        min_index = 0
        list_len = len(error_list)
        for index in range(list_len):
            if error_list[index] < error_list[min_index]:
                min_index = index

        print(error_list)
        if error_list[min_index] < 5.0:
            data = {
                "photo" : blacklist[min_index]["photo"],
                "score" : float(error_list[min_index]),
                "message" : "match found",
                "text" : blacklist[min_index]["text"]
            }
        else:
            data = {
                "message" : "match not found"
            }
        
        # c_list = []
        # for histogram1 in histogram_list:
        #     c1 = 0
        #     i = 0
        #     while i<len(histogram) and i<len(histogram1):
        #         c1+=(histogram[i]-histogram1[i])**2
        #         i+= 1
        #     c_list.append(c1**(1 / 2))
        # print(c_list)
        # c_normalised = []
        # for i in c_list:
        #     c_normalised.append(i/sum(c_list))

        # min_index = 0
        # list_len = len(c_normalised)
        # for index in range(list_len):
        #     if c_normalised[index] < c_normalised[min_index]:
        #         min_index = index
        # print(c_normalised)
        # if c_normalised[min_index] < 0.15:
        #     data = {
        #         "photo" : blacklist[min_index]["photo"],
        #         "score" : float(c_normalised[min_index]),
        #         "message" : "match found",
        #         "text" : blacklist[min_index]["text"]
        #     }
        # else:
        #     data = {
        #         "message" : "match not found"
        #     }
        
        return data, 201
  

# class Aadhaar(Resource):

#     def post(self):
#         url = "https://corswarriors.pythonanywhere.com/blackflag/list/"
#         r = requests.get(url = url)
#         response = r.json()
#         input_data = request.get_json()
#         encoded_data = input_data['photo'].split(',')[1]
#         nparr = np.frombuffer(base64.b64decode(encoded_data), np.uint8)
#         image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
#         gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
#         faceCascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
#         faces = faceCascade.detectMultiScale(
#             gray_image,
#             scaleFactor=1.3,
#             minNeighbors=3,
#             minSize=(30, 30)
#         )
#         (x, y, w, h) = faces[-1]
#         roi_gray = gray_image[y:y + h, x:x + w]
#         histogram = cv2.calcHist([roi_gray], [0], None, [256], [0, 256])


api.add_resource(FaceDetect, '/face-detect/')
  
# driver function
if __name__ == '__main__':
  
    app.run(debug = True)