# Library built into python, no need to include in files
import http.client
import json
import io

# Connection to Transloc API through URL
conn = http.client.HTTPSConnection("transloc-api-1-2.p.rapidapi.com")

# Necessary variables to access API
headers = {
    'X-RapidAPI-Key': "1c7c83b3a0mshb7fa8e611e55e56p122606jsn348617db2e34", # Rohan API Key
    'X-RapidAPI-Host': "transloc-api-1-2.p.rapidapi.com"
}

# Agencies set at 16 or code will not work. Why? -> I don't know
conn.request("GET", "/stops.json?agencies=16", headers=headers)

res = conn.getresponse()
data = res.read()

# Decodes data into JSON string
stops_string = data.decode("utf-8")
json.loads(stops_string)

with io.open('json/test.json', 'w', encoding='utf8') as outfile:
    str_ = json.dumps(stops_string)
    outfile.write(str_)

with open('json/test.json') as data_file:
    stops = json.load(data_file)

stops = json.loads(stops)

print(stops[data])


