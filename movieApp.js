let APIURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
let imgPath ='https://image.tmdb.org/t/p/w1280';
let SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';
let main = document.querySelector('main');
let form = document.getElementById('form');
let search = document.getElementById('search');

getMovies(APIURL);

async function getMovies(url){
  let response = await fetch(url);
  let responseData = await response.json();

  showMovies(responseData.results);
}

function showMovies(movies){
  main.innerHTML = '';

  movies.forEach((movie) => {
    let {poster_path, title, vote_average, overview} = movie;

    let movieEl = document.createElement('div');
    movieEl.classList.add('movie');

    movieEl.innerHTML = `
        <img src="${imgPath + movie.poster_path}" alt="${title}">
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
          <h4>Overview:</h4>
          ${overview}
        </div>
        `;
        main.appendChild(movieEl);
  });
}

function getClassByRate(vote){
  if (vote >= 8){
    return 'green';
  }else if(vote >= 5){
    return 'orange'
  }else{
    return 'red';;
  }
}

form.addEventListener('submit',(e) => {
  e.preventDefault();

  let searchTerm = search.value;
  if (searchTerm){
    getMovies(SEARCHAPI + searchTerm);

    search.value = '';
  }
});
