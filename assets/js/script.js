

function getMusicalArtist() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'bf414946damshfe6a477585380f8p1bd8e7jsnecd224242b38',
            'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
        }
    };
    
    fetch('https://genius-song-lyrics1.p.rapidapi.com/search?q=the%20beatles&per_page=10&page=1', options)
        .then(function (response) {
            console.log(response)
            return response.json()
        })
        .then(function(data) {
            console.log(data)
        })
        .catch(function(err) {
            console.error(err)
        });
}


function getArtistForPlaylist() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'bf414946damshfe6a477585380f8p1bd8e7jsnecd224242b38',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };
    
    fetch('https://spotify23.p.rapidapi.com/search/?q=queen&type=artists&offset=0&limit=1&numberOfTopResults=5', options)
        .then(function (response) {
            console.log(response)
            return response.json()
        })
        .then(function(data) {
            console.log(data)
        })
        .catch(function(err) {
            console.error(err)
        });
}

function getArtistPlaylist() {
    var apiURL = 'https://spotify23.p.rapidapi.com/seed_to_playlist/?uri=spotify%3Aartist%3A1dfeR4HaWDbWqFHLkxsg1d'
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'bf414946damshfe6a477585380f8p1bd8e7jsnecd224242b38',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };
    
    fetch(apiURL, options)
        .then(function (response) {
            console.log(response)
            return response.json()
        })
        .then(function(data) {
            console.log(data)
        })
        .catch(function(err) {
            console.error(err)
        });

}
// getArtistPlaylist()

// embed spotify player in app
window.onSpotifyIframeApiReady = (IFrameAPI) => {
    let element = $('#embed-iframe');
    let options = {
        uri: 'spotify:episode:7makk4oTQel546B0PZlDM5'
      };
    let callback = (EmbedController) => {
        console.log(EmbedController, 'testing callback')
    };
    IFrameAPI.createController(element, options, callback);
  };





// TO DO

// need to query the genius api for Artist from search input
// query genius api for songs by artist
// query genius api for song lyrics??
// need to create a function that iterates over the artist search input value to replace the spaces with '%20'

// need to query the spotify api for artist from search input
    // need to get the artist uri
// need to query spotify api with the artist uri
// need to create a function that iterates the artist uri and replaces colons (:) with '%3A'
    // save in a variable to add to api endpoint as query param
//


