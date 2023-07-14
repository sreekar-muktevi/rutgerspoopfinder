import json

# Parameters: JSON file path
# Returns: python object of said JSON file
def read_json(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)
        return data

# Object for stops.json
json_stops = read_json('json/stops.json')
json_stops = json_stops["data"]

# Cleaning Data: Getting rid of Newark and Camden stops
i = 0
while(i < len(json_stops)):
    if json_stops[i]["description"] == "we assigned code":
        del json_stops[i]
    elif json_stops[i]["location"]["lng"] < -75:
        del json_stops[i]
    else: i = i+1

# Fills an array with all the stop IDs
stop_ids = []
for i in range(0, len(json_stops)):
    stop_ids.append(json_stops[i]["stop_id"])

print(stop_ids)
print()

# Fills an array with all the stop names
stop_names = []
for i in range(0, len(json_stops)):
    stop_names.append(json_stops[i]["name"])

print(stop_names)
print()
