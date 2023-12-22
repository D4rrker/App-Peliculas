const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

apiFetch(API_URL); //Api inicial

async function apiFetch(URL, movie) {
  try {
    const data = await fetch(URL);
    const response = await data.json();

    if (response.results.length > 0) showMovies(response.results);
    else listMoviesEmpty(movie);
  } catch (err) {
    console.log(err);
  }
}

const main = document.getElementById("main");

function listMoviesEmpty(movie) {
  main.innerHTML = "";
  const span = document.createElement("span");
  span.textContent = `No se a encontrado la película "${movie}".`;
  main.appendChild(span);
}

function showMovies(movies) {
  main.innerHTML = "";
  movies.forEach((movie) => {
    const mainElement = document.createElement("div");
    const { adult, poster_path, overview, title, vote_average } = movie;
    const averageFixed = vote_average.toFixed(1);
    const averageFixedToNumber = parseFloat(averageFixed);
    mainElement.classList.add("movie");

    mainElement.innerHTML = `
        <div class="container_img_info">
            <img src="${IMG_PATH + poster_path}" title="${title}"/>
            <span class="${adult ? "adult" : "no_adult"}">${adult ? "+18" : ""}</span>
            <div class="main_info_movie">
                <h1>${title}</h1>
                <span class="${colorAverageMovie(vote_average)}">${averageFixedToNumber}</span>
            </div>
        </div>
        <div class="main_overview_movie">
            <h2>${title}</h2>
            <p>${overview}</p>
        </div>
        `;
    main.appendChild(mainElement);
  });
}

function colorAverageMovie(average) {
  if (average >= 8) {
    return "green";
  }
  if (average >= 5 && average < 8) {
    return "orange";
  }
  if (average < 5) {
    return "red";
  }
}

const form = document.getElementById("form");
const input = document.getElementById("search");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchMovie = input.value;

  if (searchMovie !== "") {
    apiFetch(SEARCH_API + searchMovie, searchMovie);
  }
});

const movieApp = document.getElementById("movieApp");

movieApp.addEventListener("click", () => {
  apiFetch(API_URL);
  input.value = "";
});
