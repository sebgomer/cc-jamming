import React from 'react';
import './App.css';
import '../SearchBar/SearchBar'
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist'

class App extends React.Component {
  constructor(props) {
    //Question 31: Pull in props from React.Component (?)
    super(props);
    this.state = {
      SearchResults: [{name: 'Harder', artist: 'Kanye West', album: 'Graduation', id: 1},
                      {name: 'Faster', artist: 'Kanye West', album: 'Graduation', id: 2},
                      {name: 'Stronger', artist: 'Kanye West', album: 'Graduation', id: 3}],
      playlistName: 'Test',
      playlistTracks: [{ name: 'Track1', artist: 'Artist1', album: 'Album1', id: 'id1'}]
    }

    this.addTrack = this.addTrack.bind(this); 
  }

  addTrack(track) {
    if(this.state.playlistTracks.find( savedTrack => savedTrack.id === track.id )) {
      return; 
    }
    //NOT SURE IF THIS IS RIGHT; PUSH METHOD? (QUESTION 41)
    this.setState({playlistTacks: track})
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.SearchResults} onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
