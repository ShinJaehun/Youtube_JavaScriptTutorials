console.log("hello")
console.log(MOVIE_APIKEY)

const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key="+MOVIE_APIKEY+"&page=1";
const IMGPATH= "https://image.tmdb.org/t/p/w1280/";
const SEARCHAPI= "https://api.themoviedb.org/3/search/movie?&api_key="+MOVIE_APIKEY+"&query=";
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getMovies(APIURL);

async function getMovies(url){
    // console.log(url)
    const resp = await fetch(url);
    const respData = await resp.json();
    
    // console.log(respData);

    // respData.results.forEach((movie)=>{
    //     const img = document.createElement("img");
    //     img.src=IMGPATH+movie.poster_path;
    //     document.body.appendChild(img);
    // });


    // respData.results.forEach((movie)=>{
    //     const {poster_path, title, vote_average}=movie;


    //     const movieEl=document.createElement("div");
    //     movieEl.classList.add("movie");
    //     movieEl.innerHTML=`
    //         <img src="${IMGPATH+poster_path}" alt="${title}">
    //         <div class="movie-info">
    //             <h3>${title}</h3>
    //             <span class="${getClassByRate(vote_average)}">${vote_average}</span>
    //         </div>
    //     `;
    //     main.appendChild(movieEl);
    // })

    // return respData;

    showMovies(respData.results);
}

function showMovies(movies){
    main.innerHTML='';
    movies.forEach((movie)=>{
        const {poster_path,title,vote_average,overview}=movie;

        const movieEl=document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML=`
            <img src="${IMGPATH+poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview:</h3>
                ${overview}
            </div>
        `;
        main.appendChild(movieEl);    
    });
}

function getClassByRate(vote){
    if(vote > 8){
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
};

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const searchTerm=search.value;
    if(searchTerm){
        getMovies(SEARCHAPI+searchTerm);
        search.value='';
    }
});

