let arrayOfAllMeals = [];
const api = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
let searchBar = document.getElementById("search-bar");
let modalBody = document.getElementById("modal-body");

searchBar.addEventListener("input",(event)=>{
    let allResult = document.getElementById("search-results");
    let inputValue = document.getElementById("search-bar").value;
    fetch(api + inputValue)
    .then(res => res.json())
    .then(data => {
        allResult.innerHTML = "";
        if(inputValue == ""){
            let markUp = `
            <div class="col-12">
                <h5 class="h5 text-center text-white">Here are some meal Suggestion for you!!<br>Happy Eating!" </h5>
                <div class="h4 text-white text-center"><i class="far fa-laugh-wink"></i></div>
            </div>
            <br>
            `;
            allResult.innerHTML += markUp;
        }
        else{
            let markUp = `
            <div class="col-12">
                <h5 class="h5 text-center text-white">Yee!!! I've found <span class="font-weight-bold">${data.meals.length}</span> meals on "${inputValue}"</h5>
                <div class="h4 text-white text-center"><i class="far fa-laugh-wink"></i></div>
            </div>
            <br>
            `;
            allResult.innerHTML += markUp;
        }
        let i = 0;
        const arrayOfMeals = data.meals;
        arrayOfAllMeals = data.meals;
        arrayOfMeals.forEach(meal => {
            let mealName = meal.strMeal;
            let imageLink = meal.strMealThumb;
            let markup = `
            <div class="item">
                <img src="${imageLink}" class="img-1" alt="${mealName}">
                <p class="text-white">${mealName}</p>
                <button id="itemno-${i}" data-toggle="modal" data-target=".bd-example-modal-lg"
                    class="btn btn-block btn-outline-light col-8 mx-auto my-2" onclick="modalEdit(this.id)">Details</button>
            </div>
            `;
            i++;
            allResult.innerHTML += markup;
        });
    })
    .catch((error) => {
        let markUp = `
        <div class="col-12">
            <h2 class="h2 text-center text-white">Sorry no Result Found For "${inputValue}" </h2>
            <div class="display-1 text-white text-center"><i class="far fa-sad-tear"></i></div>
        </div>
        `;
        allResult.innerHTML += markUp;
    });
});
modalEdit = (id) =>{
    let idNo = id.slice(7);
    modalBody.innerHTML = "";
    let mealId = arrayOfAllMeals[idNo];
    let putTitle = document.getElementById("recipeTitle");
    putTitle.innerText = mealId.strMeal;
    let markup = `
        <div class="text-center mb-3">
            <img src="${mealId.strMealThumb}" class="img-2 rounded" alt="">
        </div>
        <p>
            Area: ${mealId.strArea}
            <br>
            Category: ${mealId.strCategory}
            <br>
            Tags: <small class="font-italic">${mealId.strTags}</small>
        </p>
        <h6 class="h6 text-info">Ingredients:</h6>
        <ul id="allIngre" class="ml-4 small" >
        </ul>
        <h6 class="text-info text-center font-weight-bold h6">Instructions</h6>
        <p class="text-justify small">${mealId.strInstructions}</p>
        <a href="${mealId.strYoutube}" class="btn col-md-4 col-lg-3 mx-auto btn-block btn-danger"><i class="fab fa-youtube"></i> Watch Process</a>
    `;
    modalBody.innerHTML = markup;

    let ulOfInge = document.getElementById("allIngre");
    const nameofIng = "strIngredient1";
    const measureofIng = "strMeasure1";
    for(let i = 1; i<=100 ;i++){
        if(mealId[nameofIng+i] == undefined || mealId[nameofIng+i] == null || mealId[nameofIng+i] ==""){
            break;
        }
        let newIng = `
        <li>
            <p><i class="far fa-dot-circle text-secondary"></i> ${mealId[measureofIng+i]} ${mealId[nameofIng+i]}</p>
        </li>
        `;
        ulOfInge.innerHTML += newIng;
    }
}
