const accessToken = ""
const client_id = "6a6b12546af34886989e3d782002156c"
const url = "https://accounts.spotify.com/authorize"
const request_url = "https://accounts.spotify.com/authorize?client_id=6a6b12546af34886989e3d782002156c&redirect_uri=http%3A%2F%2Flocalhost:3000%2F&response_type=token"
const response_url = "http://localhost:3000/#access_token=BQDG_nP8fGsUg9Tt6qk2uk1Se8oxUf7JH5IfKmduCKaNF0I2s8S3aSdr0-R3GU4sefAyeGPo59EQ_X9E2LAIiFDuWrQmNYwZnWHgt81S-ScThNpDstrqQHAGQ1MQlQhIfQRIs6Fy-h-yrZM&token_type=Bearer&expires_in=3600"

let Spotify = {
    getAccessToken() {
        // QUESTION 78: Check
        if(window.location.href === ) {
            return accessToken;
        }
        fetch(url)
        .then(response => response.json())
        .then(data => console.log(data))
    }
}

export default Spotify; 