

// الاساسي

const API_key="api_key=c9cdd1fa8ab4894e033a966c7961ebe8";
const BASE_URL= 'https://api.themoviedb.org/3';
const API_URL = BASE_URL+'/discover/movie?sort_by=popularity.desc&' + API_key;
const IMG_URL= 'https://image.tmdb.org/t/p/w500';
const SearchURL= BASE_URL+'/search/movie?'+ API_key;

const form = document.getElementById("form");
const main = document.getElementById("main");
const search = document.getElementById("search");

getMovies(API_URL);
function getMovies(url) {
    fetch(url).then(response => response.json()).then(data => {
        console.log(data.results);
      showMovies(data.results);
    })
}


function showMovies(data) {
  main.innerHTML = '';

  data.forEach(movie=>{
    const {title,poster_path,vote_average,overview } = movie;
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = ` 

    <div class="movie">
    <img src="${IMG_URL+poster_path}" alt="${title} ">
    <div class="movie-info">
      <h3>${title}</h3>
      <span class="${getColor(vote_average)} ">${vote_average} </span>
    </div>
    <div class="overview">
      ${overview};
    </div>
  </div>
    
    `
    main.appendChild(movieEl);
  }) ;
}

function getColor(vote){
  if(vote >= 8){
    return 'green'
  }
  else if(vote >=5){
    return "orange"
  }
  else {
    return 'red'
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = search.value;

  if(searchTerm ){
     getMovies(SearchURL + '&query=' + searchTerm )
  }
  else {
    getMovies(API_URL);
  }
   
  
})








