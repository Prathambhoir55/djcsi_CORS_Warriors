import cv2
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
import urllib.request
import numpy as np

req = urllib.request.urlopen('http://tinyurl.com/urmidon')
arr = np.asarray(bytearray(req.read()), dtype=np.uint8)
image = cv2.imdecode(arr, -1) # 'Load it as it is'
# test image
# image = cv2.imread('https://tinyurl.com/urmidon')
gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
histogram = cv2.calcHist([gray_image], [0], None, [256], [0, 256])
   
# data1 image
image = cv2.imread('dataset/pratham/pratham.jpeg')
gray_image1 = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
histogram1 = cv2.calcHist([gray_image1], [0], None, [256], [0, 256])
   
# data2 image
image = cv2.imread('dataset/urmi/urmi.jpeg')
gray_image2 = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
histogram2 = cv2.calcHist([gray_image2], [0], None, [256], [0, 256])

# data3 image
image = cv2.imread('dataset/kush/kush.jpeg')
gray_image3 = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
histogram3 = cv2.calcHist([gray_image3], [0], None, [256], [0, 256])
   
c1, c2, c3 = 0, 0, 0
   
# Euclidean Distace between data1 and test
i = 0
while i<len(histogram) and i<len(histogram1):
    c1+=(histogram[i]-histogram1[i])**2
    i+= 1
c1 = c1**(1 / 2)
   
i = 0
while i<len(histogram) and i<len(histogram2):
    c2+=(histogram[i]-histogram2[i])**2
    i+= 1
c2 = c2**(1 / 2)

i = 0
while i<len(histogram) and i<len(histogram3):
    c3+=(histogram[i]-histogram3[i])**2
    i+= 1
c3 = c3**(1 / 2)

c_list = [c1,c2,c3]
c_sum = sum(c_list)

if(min(c_list)==c1):
    print("similarity score is "+str(1-c1/c_sum))
    req = urllib.request.urlopen('http://tinyurl.com/urmidon')
    arr = np.asarray(bytearray(req.read()), dtype=np.uint8)
    img1 = cv2.imdecode(arr, -1) # 'Load it as it is'
    imgplot1 = plt.imshow(img1)
    plt.show()

    img = mpimg.imread('dataset/pratham/pratham.jpeg')
    imgplot = plt.imshow(img)
    plt.show()
elif min(c_list)==c2:
    print("c2 score is "+str(1-c2/c_sum))
    req = urllib.request.urlopen('http://tinyurl.com/urmidon')
    arr = np.asarray(bytearray(req.read()), dtype=np.uint8)
    img1 = cv2.imdecode(arr, -1) # 'Load it as it is'
    imgplot1 = plt.imshow(img1)
    plt.show()

    img = mpimg.imread('dataset/urmi/urmi.jpeg')
    imgplot = plt.imshow(img)
    plt.show()
else:
    print("c2 score is "+str(1-c3/c_sum))
    req = urllib.request.urlopen('http://tinyurl.com/urmidon')
    arr = np.asarray(bytearray(req.read()), dtype=np.uint8)
    img1 = cv2.imdecode(arr, -1) # 'Load it as it is'
    imgplot1 = plt.imshow(img1)
    plt.show()

    img = mpimg.imread('dataset/kush/kush.jpeg')
    imgplot = plt.imshow(img)
    plt.show()