# import json
# import csv
# # data = []
# i = 0 
# with open('News_Category_Dataset_v3.json', 'r') as json_file:
#     for line in json_file:
#         data = (json.loads(line))
        

# keys = data.keys()
# print(data.values())

# with open('output.csv', 'w', newline='') as csv_file:
#     writer = csv.writer(csv_file)
    
#     # Write the header row (column names)
#     writer.writerow(data.keys())  # Assumes the data is a list of dictionaries

#     # Write the data rows
#     for item in data:
#         print(item)
#         writer.writerow(data.values())


import json

with open('News_Category_Dataset_v3.json', 'r') as json_file:
    data = [json.loads(line) for line in json_file]

# print(data[0].keys())
import csv

# Assuming all JSON objects have the same keys, take the keys from the first object
fieldnames = data[0].keys()

with open('output.csv', 'w', newline='', encoding='utf-8') as csv_file:
    writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
    
    # Write the header row
    writer.writeheader()
    
    # Write the data
    for row in data:
        # print(row)
        writer.writerow(row)
