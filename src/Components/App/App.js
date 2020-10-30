import React from 'react';
import './App.css';
import '../SearchBar/SearchBar'
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist'
import Spotify from '../../util/Spotify'; 

class App extends React.Component {
  constructor(props) {
    // Question 31: Pull in props from React.Component (?)
    super(props);
    this.state = {
      SearchResults: [{name: 'Harder', artist: 'Kanye West', album: 'Graduation', id: 1},
                      {name: 'Faster', artist: 'Kanye West', album: 'Graduation', id: 2},
                      {name: 'Stronger', artist: 'Kanye West', album: 'Graduation', id: 3}],
      playlistName: 'Test',
      playlistTracks: [{ name: 'Track1', artist: 'Artist1', album: 'Album1', id: 'id1'}]
    }

    this.addTrack = this.addTrack.bind(this); 
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this); 
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this); 
  }

  addTrack(track) {
    //needed, see below
    let tracks = this.state.playlistTracks;
    if(tracks.find( savedTrack => savedTrack.id === track.id )) {
      return; 
    }
    // NOT SURE IF THIS IS RIGHT; PUSH METHOD? (QUESTION 41)
    // 26_10_2020: .push() was right, add to existing array of objects
    // BUT: create variable to not change state directly!
    tracks.push(track);
    this.setState({playlistTracks: tracks})
  }


  // QUESTION 49 IMPLEMENTATION 
  removeTrack(track) {
    let tracks = this.state.playlistTracks; 

    tracks = tracks.filter(filteredTrack => filteredTrack.id !== track.id)

    this.setState({playlistTracks: tracks}); 
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name})
  }

  // QUESTION 63: Generates an array of uri values called 
  // trackURIs from the playlistTracks property.
  savePlaylist() {
    let uri = this.state.playlistTracks.map(track => track.uri);
    console.log(uri); 
  }

  search(search) {
    console.log(search);
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar 
            onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults 
              searchResults={this.state.SearchResults} 
              onAdd={this.addTrack}/>
            <Playlist 
              playlistName={this.state.playlistName} 
              playlistTracks={this.state.playlistTracks} 
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
