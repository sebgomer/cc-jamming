const accessToken = ""
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

        if( reg_access && reg_expire) {
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
        fetch(url)
    }
}

export default Spotify; 