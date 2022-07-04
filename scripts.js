const results = document.getElementById("recipes");
var num;
function getRecipes() {
  var e = document.getElementById("ingredientSort");
  fetch("https://localhost:7211/ingredients?"+new URLSearchParams({
    include: document.getElementById('ingredientWant').value,
    remove: document.getElementById('ingredientExcept').value,
    count: 12,
    skip: 0,
    name: e.selectedIndex == 0,
    avail: e.selectedIndex == 1,
    time: e.selectedIndex == 2,
    cals: e.selectedIndex == 3,
  }),
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
.then(data => {
  results.textContent = "";
  num = 12;
  data.forEach(recipe => {
    const box = document.createElement('div');
    box.className = 'recipe';
    const image = document.createElement('img');
    image.className = 'image';
    image.src = recipe.image;
    image.onclick = function (event) {
      window.open("/recipe.html?id="+recipe.pkid);
    }  
    const text = document.createElement('div');
    text.className = 'overlay';    
    text.innerHTML = recipe.name;
    box.appendChild(image);
    box.appendChild(text);
    results.appendChild(box);
  });
  const load = document.createElement('button');
  load.className = 'recipeLoad';
  load.innerHTML = "пук";
  load.onclick = function() {loadMore()};
  results.appendChild(load);
});

}

function loadMore() {
  var e = document.getElementById("ingredientSort");
  fetch("https://localhost:7211/ingredients?"+new URLSearchParams({
    include: document.getElementById('ingredientWant').value,
    remove: document.getElementById('ingredientExcept').value,
    count: 12,
    skip: num,
    name: e.selectedIndex == 0,
    avail: e.selectedIndex == 1,
    time: e.selectedIndex == 2,
    cals: e.selectedIndex == 3,
  }),
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
.then(data => {
  results.removeChild(results.lastChild);
  num+=12;
  data.forEach(recipe => {
    const box = document.createElement('div');
    box.className = 'recipe';
    const image = document.createElement('img');
    image.className = 'image';
    image.src = recipe.image;
    image.onclick = function (event) {
      window.open("/recipe.html?id="+recipe.pkid);
    }  
    const text = document.createElement('div');
    text.className = 'overlay';    
    text.innerHTML = recipe.name;
    box.appendChild(image);
    box.appendChild(text);
    results.appendChild(box);
  });
  const load = document.createElement('button');
  load.className = 'recipeLoad';
  load.innerHTML = "пук";
  load.onclick = function() {loadMore()};
  results.appendChild(load);
});

}

function getRecipesByName() {
  var e = document.getElementById("recipeSort");
  fetch("https://localhost:7211/byname?"+new URLSearchParams({
    recipeName: document.getElementById('recipeName').value,
    count: 12,
    skip: 0,
    name: e.selectedIndex == 0,
    avail: e.selectedIndex == 1,
    time: e.selectedIndex == 2,
    cals: e.selectedIndex == 3,
  }),
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
.then(data => {
  results.textContent = "";
  num = 12;
  data.forEach(recipe => {
    const box = document.createElement('div');
    box.className = 'recipe';
    const image = document.createElement('img');
    image.className = 'image';
    image.src = recipe.image;
    image.onclick = function (event) {
      window.open("/recipe.html?id="+recipe.pkid);
    }      
    const text = document.createElement('div');
    text.className = 'overlay';    
    text.innerHTML = recipe.name;
    box.appendChild(image);
    box.appendChild(text);
    results.appendChild(box);
  });
  const load = document.createElement('button');
  load.className = 'recipeLoad';
  load.innerHTML = "пук";
  load.onclick = function() {loadMoreByName()};
  results.appendChild(load);
});
}

function loadMoreByName() {
  var e = document.getElementById("recipeSort");
  fetch("https://localhost:7211/byname?"+new URLSearchParams({
    recipeName: document.getElementById('recipeName').value,
    count: 12,
    skip: num,
    name: e.selectedIndex == 0,
    avail: e.selectedIndex == 1,
    time: e.selectedIndex == 2,
    cals: e.selectedIndex == 3,
  }),
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
.then(data => {
  results.removeChild(results.lastChild);
  num+=12;
  data.forEach(recipe => {
    const box = document.createElement('div');
    box.className = 'recipe';
    const image = document.createElement('img');
    image.className = 'image';
    image.src = recipe.image;
    image.onclick = function (event) {
      window.open("/recipe.html?id="+recipe.pkid);
    }      
    const text = document.createElement('div');
    text.className = 'overlay';    
    text.innerHTML = recipe.name;
    box.appendChild(image);
    box.appendChild(text);
    results.appendChild(box);
  });
  const load = document.createElement('button');
  load.className = 'recipeLoad';
  load.innerHTML = "пук";
  load.onclick = function() {loadMoreByName()};
  results.appendChild(load);
});
}