import requests
from urllib.request import Request, urlopen
from bs4 import BeautifulSoup

url = "https://www.bhaskar.com/"
response = Request(url,headers={'User-Agent':'Mozilla/5.0'})
webpage = urlopen(response).read()

with requests.Session() as c:
    soup = BeautifulSoup(webpage, 'html.parser')
    print(soup)