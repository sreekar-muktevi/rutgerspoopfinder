import json

# Parameters: JSON file path
# Returns: python object of said JSON file
def read_json(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)
        return data

#----------------------------------------------------------------------------------------------------------------

# Object for stops.json
stops = read_json('json/stops.json')
stops = stops["data"]

# Fills an array with all the stop IDs
stop_ids = []
for i in range(0, len(stops)):
    if stops[i]["location"]["lat"] > 40.6 or stops[i]["location"]["lng"] < -75:
        stop_ids.append(None)
    else:
        stop_ids.append(stops[i]["stop_id"])

# Fills an array with all the stop names
stop_names = []
for i in range(0, len(stops)):
    if stops[i]["location"]["lat"] > 40.6 or stops[i]["location"]["lng"] < -75:
        stop_names.append(None)
    else:
        stop_names.append(stops[i]["name"])

#---------------------------------------------------------------------------------------------------------------

# Object for routes.json
routes = read_json('json/routes.json')
routes = routes["data"]["1323"]

# Fills an array with a list of stops in each route
route_stops = []
for i in range(0, len(routes)):
    if "Route" in routes[i]["long_name"]:
        route_stops.append(routes[i]["stops"])
    else: route_stops.append(None)


# Fills an array with the names of each route
route_names = []
for i in range(0, len(routes)):
    if "Route" in routes[i]["long_name"]:
        route_names.append(routes[i]["long_name"])
    else: route_names.append(None)

#---------------------------------------------------------------------------------------------------------------
