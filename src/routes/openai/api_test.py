# Programming Quotes API API Example
import requests

url = "https://snl.no/api/v1/search?query=Stavanger&limit=4"
headers = {
    "Content-Type": "application/json"
}

response = requests.get(url)
data = response.json()
