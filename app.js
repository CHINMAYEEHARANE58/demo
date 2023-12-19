let data;

// random meal function            
async function getRandomMeal() {
    try {
        var response = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
        data = await response.json();
        console.log(data.meals)
        displaymeal(data.meals[0]);
    } catch (error) {
        console.error(error);
    }
}

// displaying the random meal in html
function displaymeal(meals){
    // console.log(meals)
    document.querySelector(".randomMeal").src = meals.strMealThumb
    document.querySelector("#randomHeading").innerHTML = `${meals.strMeal}<br>Category: ${meals.strCategory}<br> Region: ${meals.strArea}`;
    // id = meals.idMeal; 
}

getRandomMeal();

// function searched meal
let searchBar = document.getElementById('search')

async function getSearchedDishes() {
    let meals = searchBar.value
    try {
      let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${meals}`);
      let resp = await data.json();

      if(resp.meals){
        searchedDishes(resp.meals);
      }

    } catch (error) {
      console.error(error);
    }
  }
  
//  searched dishes category function 
function searchedDishes(array){
    let searchedMeal = ""
    array.forEach((meals)=>{
        searchedMeal+=`<div class="dishes">
        <img class="dishImage" src="${meals.strMealThumb}" alt="">
        <h3>${meals.strMeal}</h3>
        </div>`
    })
    document.getElementById('searchedCategory').innerHTML = searchedMeal;
}


searchBar.addEventListener("keypress", function(e){
    if(e.key == "Enter"){
        getSearchedDishes();
    }
})


document.getElementById("ingredients").addEventListener("click" , ()=>{
    getIngredients(data.meals[0].idMeal);
})

async function getIngredients(mealId) {
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        let detailedData = await response.json();

        // Call the function to display ingredients in the modal
        displayIngredients(detailedData.meals);
    } catch (error) {
        console.error(error);
    }
}

// Function to display ingredients in the modal
function displayIngredients(meals) {
    const meal = meals[0];

    let ingredientsList = "<h6>Ingredients:</h6><ul id='list'>";

    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (ingredient && measure) {
            ingredientsList += `<li>${measure} ${ingredient}</li>`;
        }
    }

    ingredientsList += "</ul>";

    // Assuming you have a modal with the id 'modal' and a content div with the id 'modal-content'
    document.getElementById('modal-content').innerHTML = ingredientsList;

    // Show the modal
    document.getElementById('modal').style.display = 'block';
}

document.querySelector("#closeBtn").addEventListener("click" , ()=>{
    document.getElementById("modal").style.display = "none"
})



// async function GetIngredients(){
//     try{

//     }
//     catch(error){
//         console.log("Cannot access the Data:",error)
//     }
// }

// Function to display ingredients in the modal
// function displayIngredients(meals) {
//     const meal = meals[0];

//     let ingredientsList = "<h3>Ingredients:</h3><ul>";

//     for (let i = 1; i <= 20; i++) {
//         const ingredient = meal[`strIngredient${i}`];
//         const measure = meal[`strMeasure${i}`];

//         if (ingredient && measure) {
//             ingredientsList += `<li>${measure} ${ingredient}</li>`;
//         }
//     }

//     ingredientsList += "</ul>";

//     // Assuming you have a modal with the id 'modal' and a content div with the id 'modal-content'
//     document.getElementById('modal-content').innerHTML = ingredientsList;

//     // Show the modal
//     // document.getElementById('modal').style.display = 'block';
// }
