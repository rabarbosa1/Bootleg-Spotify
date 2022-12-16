function getMusicalArtist() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'bf414946damshfe6a477585380f8p1bd8e7jsnecd224242b38',
            'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
        }
    };
    
    fetch('https://genius-song-lyrics1.p.rapidapi.com/search?q=Alan%20Walker&per_page=10&page=1', options)
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
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'bf414946damshfe6a477585380f8p1bd8e7jsnecd224242b38',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };
    
    fetch('https://spotify23.p.rapidapi.com/search/?q=%3CREQUIRED%3E&type=multi&offset=0&limit=10&numberOfTopResults=5', options)
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