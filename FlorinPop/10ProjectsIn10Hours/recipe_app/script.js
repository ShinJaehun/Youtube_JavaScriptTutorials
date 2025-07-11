console.log("hello")

const mealsEl = document.getElementById("meals");
const favoriteContainer=document.getElementById("fav-meals");
const searchTerm=document.getElementById("search-term");
const searchBtn=document.getElementById("search");
const mealPopup=document.getElementById("meal-popup");
const mealInfoEl=document.getElementById("meal-info");
const popupCloseBtn=document.getElementById("close-popup");

getRandomMeal();
fetchFavMeals();

async function getRandomMeal() {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const respData = await resp.json();
    const randomMeal = respData.meals[0];
    // console.log(randomMeal);

    addMeal(randomMeal, true);
}

async function getMealById(id) {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i="+id);
    const respData=await resp.json();
    const meal=respData.meals[0];
    return meal
}

async function getMealsBySearch(term) {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s="+term)
    const respData=await resp.json()
    const meals=respData.meals;
    return meals
}

function addMeal(mealData,random=false){
    console.log(mealData)
    const meal = document.createElement('div');
    meal.classList.add("meal");
    meal.innerHTML=`
        <div class="meal-header">
            ${random ? `<span class="random">Random Recipe</span>` : ''}
            <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        </div>
        <div class="meal-body">
            <h4>${mealData.strMeal}</h4>
            <button class="fav-btn" onclick="">
                <i class="fas fa-heart"></i>
            </button>
        </div>
    `;

    // meal.querySelector('.meal-body .fav-btn').addEventListener('click',(e)=>{
    //     // alert("hello")
    //     e.target.classList.toggle("active")
    // }); // 이게 안되는 이유는...

    const btn = meal.querySelector('.meal-body .fav-btn')
    btn.addEventListener('click',()=>{
        // btn.classList.toggle("active")
        if(btn.classList.contains('active')){
            removeMealLS(mealData.idMeal)
            btn.classList.remove("active")
        }else{
            addMealLS(mealData.idMeal)
            btn.classList.add("active")  
        }

        fetchFavMeals();
    });

    // 원래 이건데 fav 버튼 클릭하면 showMealInfo()까지 해버려서...
    // meal.addEventListener('click',()=>{
    //     showMealInfo(mealData);
    // })
    const mealHeader = meal.querySelector(".meal-header")
    console.log(mealHeader)
    mealHeader.addEventListener('click',()=>{
        showMealInfo(mealData)
    })

    mealsEl.appendChild(meal);
}

function addMealLS(mealId){
    const mealIds = getMealsLS();
    localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]));
    // Uncaught TypeError: mealIds is not iterable
    // at addMealLS (script.js:61:56)
    // null 이잖어...
}

function removeMealLS(mealId){
    const mealIds = getMealsLS();
    localStorage.setItem('mealIds',JSON.stringify(mealIds.filter(id=>id!==mealId)));
}

function getMealsLS(){
    const mealIds = JSON.parse(localStorage.getItem('mealIds'));
    return mealIds === null ? [] : mealIds;
}

async function fetchFavMeals(){
    //clean the container
    favoriteContainer.innerHTML="";

    const mealIds = getMealsLS();
    const meals=[];
    for(let i=0;i<mealIds.length;i++){
        const mealId=mealIds[i]
        const meal=await getMealById(mealId)
        // meals.push(meal)
        addMealFav(meal)
    }
    // console.log(meals)
}

function addMealFav(mealData){

    const favMeal = document.createElement('li');

    favMeal.innerHTML=`
        <li>
            <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
            <span>${mealData.strMeal}</span>
            <button class="clear"><i class="fas fa-window-close"></i></button>
        </li>
    `;
    const btn=favMeal.querySelector(".clear");
    btn.addEventListener('click',()=>{
        removeMealLS(mealData.idMeal);
        fetchFavMeals()
    })
    
    favMeal.addEventListener('click',()=>{
        showMealInfo(mealData);
    })

    favoriteContainer.appendChild(favMeal);
}

function showMealInfo(mealData){
    mealInfoEl.innerHTML="";
    const mealEl=document.createElement('div');

    const ingredients=[];
    for(let i=1; i<=20; i++){
        if(mealData["strIngredient"+i]) {
            ingredients.push(`${mealData["strIngredient"+i]} - ${mealData["strMeasure"+i]}`);
        }else{
            break;
        }
    }

    mealEl.innerHTML=`
        <h1>${mealData.strMeal}</h1>
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        <p>${mealData.strInstructions}</p>
        <h3>Ingredients:</h3>
        <ul>
            ${ingredients.map((ing)=>`
                <li>${ing}</li>
            `).join("")}
        </ul>
    `
    mealInfoEl.appendChild(mealEl);
    mealPopup.classList.remove('hidden');
}

searchBtn.addEventListener('click',async ()=>{ //요거 찾는 게 어려워 pending 상태의 Promise를 return하기 때문!
    // clean container
    mealsEl.innerHTML='';
    const search=searchTerm.value;
    // console.log(await getMealsBySearch(search));
    const meals=await getMealsBySearch(search);
    if(meals){
        meals.forEach((meal)=>{
            addMeal(meal)
        });
    };
    
});

popupCloseBtn.addEventListener('click',()=>{
    mealPopup.classList.add('hidden');
})