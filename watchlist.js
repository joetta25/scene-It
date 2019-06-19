
function loadPage(){
    var movieJSON = localStorage.getItem('watchlist'); // the data is currently a string of data , because it is coming from the API 
    var movie = JSON.parse(movieJSON); // this turn the string of data ,into an object
    document.getElementsByClassName('movies-container')[0].innerHTML = renderMovies(movie); // this is loading the data onto the HTML page in the movie container div
}

loadPage();