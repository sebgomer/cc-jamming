import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {

  constructor(props) {
    super(props);
    // QUESTION 71: WORKAROUND! 
    // no workaround, implicitly specified
    this.state = {
      term: ''
    }

    this.search = this.search.bind(this); 
    this.handleTermChange = this.handleTermChange.bind(this); 
  }

  // QUESTION 69: create a method called search that passes 
  // the state of the term to this.props.onSearch
  search() {
    this.props.onSearch(this.state.term)
  }

  handleTermChange(event) {
    let searchTerm = event.target.value; 
    this.setState({term: searchTerm}); 
  }

  render() {
    return(
      <div className="SearchBar">
        <input 
          placeholder="Enter A Song, Album, or Artist" 
          onChange={this.handleTermChange}/>
        <button className="SearchButton">SEARCH</button>
      </div>
    )
  }
}

export default SearchBar;