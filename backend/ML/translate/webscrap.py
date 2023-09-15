# import requests
# from bs4 import BeautifulSoup

# # Define the URL of the news website you want to scrape.
# # url = "https://www.bhaskar.com/"
# # url = "https://timesofindia.indiatimes.com/sports/cricket/asia-cup"
# url = "https://timesofindia.indiatimes.com/sports/cricket/asia-cup/how-sri-lanka-pipped-pakistan-in-last-over-thriller-to-set-up-asia-cup-final-with-india/articleshow/103673099.cms"
# # Send an HTTP GET request to the URL.
# headers = {
#     "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
#   }
# response = requests.get(url,headers=headers)
# news_title = []
# news_description = []
# news_links = []
# print('running')
# if response.status_code == 200:
#     soup = BeautifulSoup(response.text, 'html.parser')
#     links = soup.find_all('a')
#     # for headline in links:
#     #     print(headline.text)
#     for link in links:
#         href = link.get('href')
#         news_links.append(href) 
#         # print(news_links)
#     for link in news_links:
#         try:
#             res = requests.get(link,headers=headers)
#             soup2 = BeautifulSoup(res.text, 'html.parser')
#             title = soup2.find('title')
#             news_title.append(title)
#             meta_tag = soup2.find('meta', attrs={'name': 'description'})
#             if meta_tag:
#                 description = meta_tag.get('content')
#                 news_description.append(description)      
#             else:
#                 print("No meta tag found for link:", link)
#         except Exception as e:
#             print(e)
            
#     print(news_title,news_description)
# else:
#     print("Failed to retrieve the web page.")


