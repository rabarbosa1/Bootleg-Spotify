var artist;
var artistSearchStr;
var artistId;
var artistURI;
var artistPlaylistURI;
var playlistId;
var artistAlbumsAndPlaylist = [];
var artistSearchHistoryBtn = $("#search-artist-history-btn");
var playlistIframe = $("#playlist-iframe");
var artistInputSubmit = $("#artist-input-btn");
var artistPlaylistSubmit = $("#artist-playlist-input-btn");
var artistInput = $("#artist-name");
var songName = $("#songName");
var artistSearchTerm = $("#artist-search-term");
var playlistSubtitle = $("#playlist");
var songHistory = [];

function getMusicalArtistId(event) {
  event.preventDefault();
  // get the value of the search input for artist
  artist = artistInput.val();
  
  
  // replace spaces in artist name with '%20'
  artistSearchStr = artist.replace(/ /g, "%20");

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "bf414946damshfe6a477585380f8p1bd8e7jsnecd224242b38",
      "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
    },
  };

  fetch(
    `https://genius-song-lyrics1.p.rapidapi.com/search?q=${artistSearchStr}&per_page=10&page=1`,
    options
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var artistResponseHits = data.response.hits;
      for (var i = 0; i < artistResponseHits.length; i++) {
        if (artist == artistResponseHits[i].result.artist_names) {
          //add artist name to search term
          artistSearchTerm.text(
            "Showing Album Results For: " +
              artistResponseHits[i].result.artist_names
          );
          playlistSubtitle.text(
            artistResponseHits[i].result.artist_names + "' s" + "  Playlist :"
          );
          $("#album-info").removeClass("hide");
          $("#spotify-player").removeClass("hide");
          $('.side-card').removeClass('hide');

          // query the data response to get the artist id
          artistId = artistResponseHits[i].result.primary_artist.id;
        }
      }
      getArtistAlbums();
      getArtistForPlaylist(event);
      searchHistory();
    })
    .catch(function (err) {
    });
}

function getArtistAlbums() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "bf414946damshfe6a477585380f8p1bd8e7jsnecd224242b38",
      "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
    },
  };

  fetch(
    `https://genius-song-lyrics1.p.rapidapi.com/artists/${artistId}/albums?per_page=20&page=1`,
    options
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // for loop to iterate the albums array
      // print button to UI with album name
      $("#album-container").empty();
      artistAlbumsAndPlaylist = [];
      var albumArray = data.response.albums;
      for (let i = 0; i < albumArray.length; i++) {

        $("#album-container").append(
          `<button data-album=${albumArray[i].name} class="listed-album">${albumArray[i].name}</button>`
        );

        var artistAlbumsForStorage = {
          album: albumArray[i].name,
        };
        artistAlbumsAndPlaylist.push(artistAlbumsForStorage);
      }

    })
    .catch(function (err) {
      console.error(err);
    });
}

function getArtistForPlaylist(event) {
  event.preventDefault();
  artist = artistInput.val();
  // replace spaces in artist name with '%20'
  artistSearchStr = artist.replace(/ /g, "%20");
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "bf414946damshfe6a477585380f8p1bd8e7jsnecd224242b38",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };

  fetch(
    `https://spotify23.p.rapidapi.com/search/?q=${artistSearchStr}&type=artists&offset=0&limit=1&numberOfTopResults=5`,
    options
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      artistURI = data.artists.items[0].data.uri;
      getArtistPlaylist();
    })
    .catch(function (err) {
      console.error(err);
    });
}

function getArtistPlaylist() {
  var artistSearchURI = artistURI.replace(/:/g, "%3A");
  var apiURL = `https://spotify23.p.rapidapi.com/seed_to_playlist/?uri=${artistSearchURI}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "bf414946damshfe6a477585380f8p1bd8e7jsnecd224242b38",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };

  fetch(apiURL, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      artistPlaylistURI = data.mediaItems[0].uri;
      // split artistPlaylistSearchInput variable on :
      // store the playlist id in a new variable - var playlistId
      // update the src in the iFrame to https://open.spotify.com/embed/playlist/${playlistId}?utm_source=oembed
      getPlaylistId();
      playlistIframe.attr(
        "src",
        `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=oembed`
      );
    })
    .catch(function (err) {
      console.error(err);
    });
}

function getPlaylistId() {
  var artistPlaylistURISplit = artistPlaylistURI.split(":");
  playlistId = artistPlaylistURISplit.pop();

  // create an object to store playlist id
  var artistPlaylistForStorage = {
    playlist: playlistId
  };
  // push playlist id object into artistAlbumsAndPlaylist array
  artistAlbumsAndPlaylist.push(artistPlaylistForStorage);
  // add album and playlist array to local storage
  localStorage.setItem(artist, JSON.stringify(artistAlbumsAndPlaylist));
}

function searchHistory() {
  var searchEl = $(
    `<button id="search-artist-history-btn" data-artist="button-1" class="btn">${artist}</button>`
  );
  $("#search-history").append(searchEl);
}

function getArtistInfoFromStorage(event) {
  $("#album-container").empty()
  var getDataFromStorage = JSON.parse(localStorage.getItem(event.currentTarget.innerHTML));

  var playlistIdFromStorage = getDataFromStorage.pop()

  
  for(var i = 0; i < getDataFromStorage.length; i++) {
    $("#album-container").append(`<button data-album=${getDataFromStorage[i].album} class="listed-album">${getDataFromStorage[i].album}</button>`)
  }
    playlistIframe.attr(
      "src",
      `https://open.spotify.com/embed/playlist/${playlistIdFromStorage.playlist}?utm_source=oembed`
    );
    
    artistSearchTerm.text(
      "Showing Album Results For: " +
      event.currentTarget.innerHTML
    );
    playlistSubtitle.text(
      event.currentTarget.innerHTML + "'s" + "  Playlist :"
    );
}

function initializeSavedArtists() {
  var getArtists = JSON.parse(localStorage.getItem(artist))
  for(var i = 0; i < localStorage.length; i++) {
    $("#search-history").append( `<button id="search-artist-history-btn" data-artist="button-1" class="btn">${localStorage.key(i)}</button>`)
  }
}

initializeSavedArtists()


$("#search-history").on("click", "#search-artist-history-btn", getArtistInfoFromStorage);
artistInputSubmit.on("click", getMusicalArtistId);

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
