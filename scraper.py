
from flask import Flask,jsonify,request 
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
import json


app =   Flask(__name__) 
CORS(app)
def scrape(name):
    url = f'https://coinmarketcap.com/currencies/{name}'
    html = requests.get(url).text
    soup = BeautifulSoup(html, 'lxml')
    heading = soup.find_all('div', class_='sc-26ba3ba-1 gtqeBx')
    numbers = soup.find_all('dd')
    myans={}
    print(url)
    for i in range(len(numbers)):
        myans[heading[i].text]=numbers[i].text
    try:
        myans[heading[0].text]=myans[heading[0].text].split('%')[-1]
    except:
        myans['term']=name
        myans['message']="Coin Not Found!"
        return myans
    myans[heading[1].text]=myans[heading[1].text].split('%')[-1]
    image = soup.find('div', class_="sc-f70bb44c-0 jImtlI").img['src']
    price = soup.find('span', class_="sc-f70bb44c-0 jxpCgO base-text").text
    crypto = soup.find('span', class_="sc-f70bb44c-0 jltoa")['title']
    myans['crypto']=crypto
    myans['price']=price
    myans['logo']=image
    myans['term']=name
    
    return myans
    
@app.route('/getinfo', methods = ['POST']) 
def ReturnJSON(): 
    names = request.json.get('names')
    print(names)
    data = {'cryptos':[]}
    for name in names:
        data['cryptos'].append(scrape(name))
    response = jsonify(data)
    return response 
    
if __name__=='__main__': 
    app.run(debug=True)