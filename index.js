function saveToWatchlist(imdbID) { // this will tell us which movie the user clicked on , and then go through the movieData to find the relevant movie information 
    var movie = movieData.find(function(currentMovie) { // this contains the rest of the , movieData 
        return currentMovie.imdbID == imdbID;
    });
    var watchlistJSON = localStorage.getItem('watchlist'); // getItem() method of the Storage interface, when passed a key name (watchlist), will return (watchlist) value, or null if the (watchist) does not exist, in the given Storage object.
    var watchlist = JSON.parse(watchlistJSON);
    if ( watchlist == null) {
        watchlist = [];
    }
        watchlist.push(movie);
        watchlistJSON = JSON.stringify(watchlist); // turn the watchlist into JSON ( lightweight format for storing and transporting data )
        localStorage.setItem('watchlist',watchlistJSON); // Save the JSONified watchlist back into local storage
        document.getElementById('search-form').innerHTML = localStorage.getItem("watchlist"); // then retrieve the data in the local storage stored as watchlist 
    

    

    // console.log(imdbID,"this is the ID that was passed in");
    // console.log(movie,"This the movie clicked");
    // console.log(watchlist, "this is array should update");
    
} 
function renderMovies(movieArray) { /// this represents the movieData
    var movieHTML = movieArray.map((currentMovie) => { // current movie is just on of the objects in movieData
        return `
        <div class="card movie">
            <img class="card-img-top" src="${currentMovie.Poster}" />
            <div class="card-body">
                <h5 class="card-title">${currentMovie.Title} <span class="badge badge-secondary">${currentMovie.Year}</span></h5>
                <button class="btn btn-primary" type="button" onclick="saveToWatchlist('${currentMovie.imdbID}')">add</button>
            </div>
        </div>
        `
    })

    return movieHTML.join('');
}

document.addEventListener('DOMContentLoaded', function(){ // once everything is loaded from the HMTL document then do this 
   document.getElementById('search-form').addEventListener( 'submit', function(e){ // this is a submit listener

    e.preventDefault(); // the e.preventDefault stops the page from refreshing each it the search butto is push, loads a movie when it is searched in the search bar 

    var searchString = document.getElementsByClassName("search-bar")[0].value // I am accessing the search bar and wanting to get the value of the string when type it in the search bar , since searc-bar is a array i want to grab the first index 
    var urlEncodedSearchString = encodeURIComponent(searchString); // this function santize the users input and make it a url-friendly search string http://www.omdbapi.com/?apikey=3430a78&s=Fun%20With
    axios.get(`http://www.omdbapi.com/?apikey=3430a78&s=${urlEncodedSearchString}`).then(function(response) { /// the parameter resposne contains the data that comes back from the OMDB API
        console.log(response.data.Search);
        document.getElementsByClassName("movies-container")[0].innerHTML=renderMovies(response.data.Search)
    });

   })

})