let accessToken; 
const client_id = "6a6b12546af34886989e3d782002156c"
const redirect_uri = "http://localhost:3000/"

let Spotify = {
    getAccessToken() {
        if(accessToken) {
            return accessToken; 
        }

        const accessTokenReg = window.location.href.match(/access_token=([^&]*)/); 
        const expireTokenReg = window.location.href.match(/expires_in=([^&]*)/);

        if(accessTokenReg && expireTokenReg) {
            // QUESTION 80: LOOKUP .match() returned array
            accessToken = accessTokenReg[1]; 
            const expiresIn = Number(expireTokenReg[1]);
            // clears URL field
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken; 
        } else {
            const access_url = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`
            window.location = access_url; 
        }
    },
    
    search(term) {
        const accessToken = Spotify.getAccessToken();
        const url = `https://api.spotify.com/v1/search?type=track&q=${term}`; 
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        })
        // QUESTION 87: Convert the returned response to JSON.
        .then(res => res.json())
        // Then, map the converted JSON to an array of tracks. If the JSON does not contain any tracks, return an empty array.
        .then(jsonRes => {
            if(!jsonRes.tracks) {
                return [];
            }
            return jsonRes.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artists: track.artists[0].name,
                album: track.album.name, 
                uri: track.uri
            })); 
        })
    }, 

    savePlaylist(playlistName, trackUris) {
        if(!(playlistName || trackUris.length)) {
            return; 
        }
        const accessToken = Spotify.getAccessToken();
        const headers = {Authorization: accessToken};
        let id;


        //QUESTION 92: Save response ID from user API 
        fetch('https://api.spotify.com/v1/me', {headers: headers})
        .then(res => res.json())
        .then(data => {
            id = data.id;
            // QUESTION 93: Use the returned user ID to make a POST request that creates a new playlist in the user’s account and returns a playlist ID.
            // --> nest fetch using user id above
            return fetch(`https://api.spotify.com/v1/users/${id}/playlists`,{
                    method: 'POST',
                    headers: headers,
                    // name: playlistName
                    // argument needs to be passed in another way:
                    body: JSON.stringify({ name: playlistName })  
            })
            .then(res => res.json())
            .then(data => {
                const playlistId = data.id;
                // QUESTION 94: another nested fetch
                // Use the returned user ID to make a POST request that creates a new playlist in the user’s account and returns a playlist ID.
                return fetch(`/v1/users/${id}/playlists/${playlistId}/tracks`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({ uris: trackUris})
                })
            })
        })
    }
}

export default Spotify; 