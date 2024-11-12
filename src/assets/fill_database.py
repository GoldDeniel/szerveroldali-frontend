#!/bin/python3
# Load data form json file and print it

import json
import requests
uri = "http://localhost:5289/api/Books/";

with open('MOCK_DATA.json') as f:
    data = json.load(f)

    
for i in data:
    
    header = {
        'Content-Type': 'application/json'
    }
    response = requests.post(uri, headers=header, data=json.dumps(i))
    print(response.text)
