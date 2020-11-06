let accessToken = ""
const client_id = "6a6b12546af34886989e3d782002156c"
const redirect_uri = "http://localhost:3000/"

const request_url = "https://accounts.spotify.com/authorize?client_id=6a6b12546af34886989e3d782002156c&redirect_uri=http%3A%2F%2Flocalhost:3000%2F&response_type=token"
const response_url = "http://localhost:3000/#access_token=BQDG_nP8fGsUg9Tt6qk2uk1Se8oxUf7JH5IfKmduCKaNF0I2s8S3aSdr0-R3GU4sefAyeGPo59EQ_X9E2LAIiFDuWrQmNYwZnWHgt81S-ScThNpDstrqQHAGQ1MQlQhIfQRIs6Fy-h-yrZM&token_type=Bearer&expires_in=3600"

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

    savePlaylist(playlistName, trackUri) {
        if(!(playlistName && trackUri)) {
            return; 
        }
        const access_token = Spotify.getAccessToken();
        const headers = {Authorization: access_token};
        let id;


        //QUESTION 92: Save response ID from user API 
        fetch('https://api.spotify.com/v1/me', {headers: headers})
        .then(res => res.json())
        .then(data => {
            id = data.id;
            return id;
        })
    }
}

export default Spotify; 