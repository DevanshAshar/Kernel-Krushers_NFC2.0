import requests
from bs4 import BeautifulSoup

# Define the URL of the news website you want to scrape.
url = "https://www.bhaskar.com/"

# Send an HTTP GET request to the URL.
response = requests.get(url)
print('running')
# print(response.text)
# Check if the request was successful (status code 200).
if response.status_code == 200:
    # Parse the HTML content of the page using BeautifulSoup.
    soup = BeautifulSoup(response.text, 'html.parser')
    # print(soup)
    # print(h3)
    # Locate the HTML elements that contain the news headlines.
    # You may need to inspect the website's HTML structure to find the appropriate tags.
    headlines = soup.find_all('h3')
    # print(headlines)
    # Loop through the headlines and print them.
    for headline in headlines:
        print(headline.text)
else:
    print("Failed to retrieve the web page.")

# Remember to handle exceptions and add more code for specific websites' structures.

