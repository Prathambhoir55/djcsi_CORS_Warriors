import cv2
import urllib
import numpy as np

req = urllib.urlopen('http://answers.opencv.org/upfiles/logo_2.png')
arr = np.asarray(bytearray(req.read()), dtype=np.uint8)
img = cv2.imdecode(arr, -1) # 'Load it as it is'

cv2.imshow('lalala', img)
if cv2.waitKey() & 0xff == 27: quit()