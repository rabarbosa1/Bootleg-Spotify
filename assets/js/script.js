var artist
var artistSearchStr
var artistId
var artistPlaylistURI 
var artistInputSubmit = $("#artist-input-btn")
var artistPlaylistSubmit = $('#artist-playlist-input-btn')
var artistInput = $("#artist-name")
var songName = $("#songName")
var artistSearchTerm = $('#artist-search-term')
var playlistSubtitle = $('#playlist');


// replace spaces in artist name with '%20'
var artistForSearch = function () {
    artist.split(" ")
    console.log(artist)
}

function getMusicalArtistId(event) {
    event.preventDefault()
    // get the value of the search input for artist
    artist = artistInput.val()
    // replace spaces in artist name with '%20'
    console.log(artist.replace(/ /g, "%20"))
    artistSearchStr = artist.replace(/ /g, "%20")

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'bf414946damshfe6a477585380f8p1bd8e7jsnecd224242b38',
            'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
        }
    };

    fetch(`https://genius-song-lyrics1.p.rapidapi.com/search?q=${artistSearchStr}&per_page=1&page=1`, options)
        .then(function (response) {
            console.log(response)
            return response.json()
        })
        .then(function (data) {
            console.log(data)

            //add artist name to search term
            artistSearchTerm.text('Showing Album Results For: ' + data.response.hits[0].result.artist_names);
            playlistSubtitle.text(data.response.hits[0].result.artist_names + "'s" + "  Playlist :" );
            $('#song-info').removeClass('hide');
            $('#spotify-player').removeClass('hide');

            // query the data response to get the artist id
            artistId = data.response.hits[0].result.primary_artist.id
            console.log(artistId)
            getArtistAlbums()
            
        })
        .catch(function (err) {
            console.error(err)
        });


}

function getArtistAlbums() {
 
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'bf414946damshfe6a477585380f8p1bd8e7jsnecd224242b38',
            'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
        }
    };

    //fetch(`https://genius-song-lyrics1.p.rapidapi.com/artists/${artistId}/songs?sort=title&per_page=20&page=1`, options)
    fetch(`https://genius-song-lyrics1.p.rapidapi.com/artists/${artistId}/albums?per_page=20&page=1`, options)
        .then(function (response) {
            console.log(response)
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            
        })
        .catch(function (err) {
            console.error(err)
        });
}


function getArtistForPlaylist(event) {
    event.preventDefault();
    artist = artistInput.val()
    // replace spaces in artist name with '%20'
    console.log(artist.replace(/ /g, "%20"))
    artistSearchStr = artist.replace(/ /g, "%20")
    console.log(artistSearchStr);
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'bf414946damshfe6a477585380f8p1bd8e7jsnecd224242b38',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };

    
    fetch(`https://spotify23.p.rapidapi.com/search/?q=${artistSearchStr}&type=artists&offset=0&limit=1&numberOfTopResults=5`, options)

        .then(function (response) {
            console.log(response)
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            artistPlaylistURI = data.artists.items[0].data.uri
            getArtistPlaylist();
        })
        .catch(function (err) {
            console.error(err)
        });
}

function getArtistPlaylist() {
    var artistPlaylistSearchURI = artistPlaylistURI.replace(/:/g, "%3A")
    var apiURL = `https://spotify23.p.rapidapi.com/seed_to_playlist/?uri=${artistPlaylistSearchURI}`
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
        .then(function (data) {
            console.log(data)
        
        })
        .catch(function (err) {
            console.error(err)
        });

}
// getArtistPlaylist()


artistInputSubmit.on("click", getMusicalArtistId)

artistPlaylistSubmit.on("click", getArtistForPlaylist)

// embed spotify player in app
// get the iframe from the html
// update the src url with the playlist id:
    // example: https://open.spotify.com/embed/playlist/5a2OuIJ1kEttA8X3PaewlI?utm_source=oembed
// create a function that splits the spotify playlist uri to pop out the playlist id to then dynamically add to iframe src url





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


// create one button that calls both the albums function and the playlist function
// another function that calls both the get albums function and playlist function to show the albums and playlist at the same time
// set localStorage with the key as 'artist' and the value as the event.target.value - value of the artist search input value
// get the value of artist from localStorage and pass that into the functions to get the albums and the playlist

