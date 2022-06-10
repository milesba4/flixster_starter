// global constants
const movieFormEl = document.querySelector("#movie-form")
const userInputEl = document.querySelector("#search-input")
const movieResultsEl = document.querySelector("#movies-grid")
const loadButtonEl= document.querySelector("#load-more-movies-btn")
const MY_API_KEY = "7a335bdf5d0d4591e95ae546290d36b6"
let pageNum = 1
let NowPlayingPage = true;
//Event listener for submission
movieFormEl.addEventListener("submit",handleSubmitForm)
loadButtonEl.addEventListener("click",loadMore)



//Functions


async function getSqResult(){
    let search =userInputEl.value
    let URL = 'https://api.themoviedb.org/3/search/movie?api_key='+ MY_API_KEY + '&query=' + search + '&page=' + pageNum
    console.log("url=", URL)
    const response = await fetch(URL)
    const movieData = await response.json();
    return movieData


}
async function getMovies(evt){
//prevent reload
evt.preventDefault()
NowPlayingPage = false
console.log("evt=",evt)
let search =userInputEl.value
console.log("search=",search)

const movieData = await getSqResult()
console.log("movieData=",movieData)
displayMovies(movieData)



}


function displayMovies(movieData){
movieData.results.forEach(function(element){
 document.getElementById("load-more-movies-btn").hidden = false;
 movieResultsEl.innerHTML += 
  '<div class = "grid-item movie-card">'
  + '<img class = "movie-poster" src= https://image.tmdb.org/t/p/w500/' + element.poster_path +' alt= '+'"'+element.original_title +'" ' + ' width = 300 height = 300/>' + 
  '<br>' + '<p class = "movie-title">'+ element.original_title +'</p>' +
  '<br>'+ '<img class ="star" src="https://cdn-icons-png.flaticon.com/512/3004/3004112.png" height = 20 width = 20 >' + '<p class = "movie-votes">'+element.vote_average+'</p>'
  '</div>'
});
;
}


function handleSubmitForm(evt){
    movieResultsEl.innerHTML = " "
    pageNum=1
    getMovies(evt)



}
async function loadMore(evt){
    pageNum+=1
    if (NowPlayingPage ==true) {
        const dataNowPlaying = await getNowPlayingResults(pageNum)
        console.log("dataNowPlaying=",dataNowPlaying)
        DisplayNowPlaying(dataNowPlaying)
      } else {
        const dataMovie = await getSqResult()
        displayMovies(dataMovie)
      }

}

 async function getNowPlayingResults(pageNum){
    let URL = 'https://api.themoviedb.org/3/movie/now_playing?api_key='+ MY_API_KEY + '&page=' + pageNum
    console.log("url=", URL)
    const response = await fetch(URL)
    const NowPlayingData = await response.json();
    console.log("NowPLayingData=", NowPlayingData)
    return NowPlayingData
    
}


async function getNowPlaying(){
    console.log("here")
    const NowPlayingData = await getNowPlayingResults()
    DisplayNowPlaying(NowPlayingData)
    console.log("NowPlayingData=",NowPlayingData)
    
}


window.onload = function(){
    getNowPlaying()
    }

function DisplayNowPlaying(NowPlayingData){
    console.log("hi")
    NowPlayingData.results.forEach(function(element){
        document.getElementById("load-more-movies-btn").hidden = false;
        movieResultsEl.innerHTML += 
         '<div class = "grid-item movie-card">'
         + '<img class = "movie-poster" src= https://image.tmdb.org/t/p/w500/' + element.poster_path +' alt= '+'"'+element.original_title +'" ' + ' width = 300 height = 300/>' + 
         '<br>' + '<p class = "movie-title">'+ element.original_title +'</p>' +
         '<br>'+ '<div class="votes"> <img class ="star" src="https://cdn-icons-png.flaticon.com/512/3004/3004112.png" height = 30 width = 30 >' + '<p class = "movie-votes">'+element.vote_average+'</p>'
         '</div> </div>'
       });
       console.log("DisplayNowPlayingInner=",movieResultsEl )
       ;
      


}







