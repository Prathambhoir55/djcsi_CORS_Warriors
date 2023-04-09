import requests
url = "https://corswarriors.pythonanywhere.com/blackflag/list/"
r = requests.get(url = url)
data = r.json()
print(len(data))