// global constants
const movieFormEl = document.querySelector("#movie-form")
const userInputEl = document.querySelector("#search-input")
const movieResultsEl = document.querySelector("#movies-grid")
const MY_API_KEY = "7a335bdf5d0d4591e95ae546290d36b6"

//Event listener for submission
movieFormEl.addEventListener("submit",getMovies)
console.log("submit=",submit)


//Functions

async function getMovies(evt){
//prevent reload
evt.preventDefault()
console.log("evt=",evt)
let search =userInputEl.value
console.log("search=",search)
let URL = 'https://api.themoviedb.org/3/search/movie?api_key='+ MY_API_KEY + '&query=' + search
console.log("url=", URL)
const response = await fetch(URL)
const movieData = await response.json();
console.log("movieData=",movieData)
displayMovies(movieData)



}


function displayMovies(movieData){
movieData.results.forEach(function(element){
 movieResultsEl.innerHTML += 
  '<div class = "grid-item movie-card">'
  + '<img class = "movie-poster" src= https://image.tmdb.org/t/p/w500/' + element.poster_path + ' width = 200 height = 200/>' + 
  '<br>' + '<p class = "movie-title">'+ element.original_title +'</p>' +
  '<br>'+ '<p class = "movie-votes">'+element.vote_count+'</p>'
  '</div>'

;
 
    console.log("movieResults=",movieResultsEl)
});
}