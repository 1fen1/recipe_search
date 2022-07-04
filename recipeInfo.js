const result = document.getElementById("recipe");
const id = new URLSearchParams(window.location.search).get('id');
fetch("https://localhost:7211/recipes/"+id,
  {
    "headers": {
      "accept": "text/plain",
      "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
      "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"102\", \"Google Chrome\";v=\"102\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin"
    },
    "referrer": "https://localhost:7211/swagger/index.html",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors",
    "credentials": "omit"
  })
.then(response => response.json())
.then(recipe => {
  
    const box = document.createElement('div');
    box.className = 'recipe';
    const image = document.createElement('img');
    image.className = 'image';
    image.src = recipe.image;    
    const text = document.createElement('h1');
    text.className = 'recipeName';    
    text.innerHTML = recipe.name;
    box.appendChild(text);
    box.appendChild(image);
    const portions = document.createElement('h3');
    portions.className = 'recipePortions';   
    portions.innerHTML = "Количество порций: " + recipe.portions;
    box.appendChild(portions);
    const time = document.createElement('h3');
    time.className = 'recipeTime';   
    time.innerHTML = "Время приготовления: " + ~~(recipe.timeToCook/60) + " ч " + recipe.timeToCook%60 + " мин";
    box.appendChild(time);
    const calories = document.createElement('h3');
    calories.className = 'recipeCalories';
    calories.innerHTML = "Количество калорий: " + recipe.calories + " ккал";
    box.appendChild(calories);
    const ing = document.createElement('h3');
    ing.innerHTML = "Требуемые ингредиенты: ";
    box.appendChild(ing);
    const inbox = document.createElement('div');
    recipe.engredients.forEach(ingredient => {
        const inname = document.createElement('div');
        inname.className = 'inname';
        inname.innerHTML = ingredient;
        inbox.appendChild(inname);
    });
    box.appendChild(inbox);
    const stepsname = document.createElement('h3');
    stepsname.innerHTML = "Способ приготовления:";
    box.appendChild(stepsname);
    const steps = document.createElement('div');
    steps.className = "recipeSteps";
    steps.innerHTML = recipe.steps;
    box.appendChild(steps);
    result.appendChild(box);

});