import React, { Component } from 'react';

import './Search.css';

import SearchIcon from 'react-icons/lib/md/search';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
  constructor(){
    super();
    this.state = {
      filterSting: ''
    }
    this.updateFilter = this.updateFilter.bind(this);
  }
  filterPost(){
    let {filterPostFn} = this.props;
    let {filterString} = this.state;

    filterPostFn(filterString);

  }
  updateFilter(e){
    let value = e.target.value.replace(/ /g, '+');
    this.setState({
      filterString: value
    });
    this.filterPost();
  }
  render() {
    return (
      <section className="Search__parent">

        <div className="Search__content">
          <input onChange={ this.updateFilter } placeholder="Search Your Feed" />

          <SearchIcon id="Search__icon" />
        </div>
        
      </section>
    )
  }
}