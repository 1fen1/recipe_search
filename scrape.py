import pandas as pd
import requests
from bs4 import BeautifulSoup as soup
import re
from urllib.request import Request, urlopen

recipe_name = []
image = []
time = []
calories = []
portions = []
ingredient = []
process = []

for i in range(1, 101):
    url = 'https://eda.ru/recepty?page=' + str(i)
    req = Request(url , headers={'User-Agent': 'Mozilla/5.0'})
    webpage = urlopen(req).read()
    page_soup = soup(webpage, "html.parser")

    links = page_soup.find_all("a", "emotion-18hxz5k")
    for recipe in links:
        recipe_link = 'https://eda.ru' + recipe.get('href')
        url = recipe_link
        req = Request(url , headers={'User-Agent': 'Mozilla/5.0'})
        webpage = urlopen(req).read()
        page_soup = soup(webpage, "html.parser")
        
        try:
            recipe_name_ = page_soup.find("h1").getText()
            
            image_ = page_soup.find("img", "emotion-1sh0a0t").get('src')

            time_text = page_soup.find('div', 'emotion-my9yfq').getText()
            time_words = time_text.split()
            if len(time_words) == 4:
                time_min = int(time_words[0])*60 + int(time_words[2])
            else:
                if "час" in time_text:
                    time_min = int(time_words[0])*60
                else:
                    time_min = int(time_words[0])

            calories_ = page_soup.find('span', itemprop="calories").getText()

            portions_ = page_soup.find('span', itemprop="recipeYield").getText()

            ingredients = ""
            ingredient_name = page_soup.find_all(itemprop="recipeIngredient")
            ingredient_amount = page_soup.find_all(class_="emotion-15im4d2")
            for i in range(0, len(ingredient_name)):
                ingredients = ingredients + ingredient_name[i].getText() + ":" + ingredient_amount[i].getText() + ";"

            process_text = ""
            process_paragraph = page_soup.find_all(itemprop="text")
            for i in range(0, len(process_paragraph)):
                process_text = process_text + process_paragraph[i].getText(strip=True) + "\n"
            process_text = process_text.replace(u'\xa0', u' ')
        except:
            continue

        recipe_name.append(recipe_name_)
        image.append(image_)
        time.append(time_min)
        calories.append(calories_)
        portions.append(portions_)
        ingredient.append(ingredients)
        process.append(process_text)

features = {'recipe_name':recipe_name, 'image':image, 'time':time, 'calories':calories, 'portions':portions, 'ingredients':ingredient, 'process':process}
table = pd.DataFrame(features)
table.to_excel('recipe_data9.xls', index=False)