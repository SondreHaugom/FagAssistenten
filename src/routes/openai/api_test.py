# Programming Quotes API API Example
import requests
import pprint


while True:
    user_input = input("Press Enter to fetch a random Chuck Norris joke or type 'exit' to quit: ")
    if user_input.lower() == 'exit':
        print("Exiting the program.")
        break
    if user_input.strip() != '':
        continue
    url = "https://api.chucknorris.io/jokes/random"
    response = requests.get(url)
    data = response.json()
    pprint.pprint(data)
