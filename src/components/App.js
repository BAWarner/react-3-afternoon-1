import React, { Component } from 'react';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import axios from 'axios';
import Post from './Post/Post';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      text: '',
      baseURL: 'https://practiceapi.devmountain.com/api'
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
    this.filterPost = this.filterPost.bind( this );

  }

  
  componentDidMount() {

    axios
    .get(`${this.state.baseURL}/posts`)
    .then(
      results => {
        console.log(results);
        this.setState(
          {
            posts: results.data
          }
        );
      }
    )
    .catch(
      error => {
        console.log(error);
      }
    );

  }

  updatePost(id, text) {
    axios
    .put(`${this.state.baseURL}/posts?id=${id}` , {text})
    .then(
      results => {
        this.setState(
          {
            posts: results.data
          }
        )
      }
    )
  
  }

  deletePost(id) {
    axios
    .delete(`${this.state.baseURL}/posts?id=${id}`)
    .then(
      results => {
        this.setState(
          {
            posts: results.data
          }
        );
      }
    )
    .catch(
      error => {
        console.log(error);
      }
    )

  }

  createPost(text) {
    axios
    .post(`${this.state.baseURL}/posts`, {text})
    .then(
      results => {
        console.log(results)
        this.setState(
          {posts: results.data}
        )
      }
    )
    .catch(
      error => {
        console.log(error)
      }
    )

  }

  filterPost(filteredString){
    console.log(filteredString);
    if(filteredString !== '' || filteredString !== undefined){
      let encodedFilter = encodeURI(filteredString)
      axios
      .get(`${this.state.baseURL}/posts/filter?text=${encodedFilter}`)
      .then(
        results => {
          this.setState(
            {
              posts: results.data
            }
          )
        }
      )
      .catch(
        error => {
          console.log(error);
        }
      )
    }
    else{
      axios
      .get(`${this.state.baseURL}/posts`)
      .then(
        results => {
          this.setState(
            {
              posts: results.data
            }
          )
        }
      )
      .catch(
        error => {
          console.log(error);
        }
      )
    }
    
  }

  render() {
    const { posts } = this.state;
    let postLoop = posts.map(
      (val, i) => {
        return <Post key={i}
                  id={val.id}
                  text={val.text}
                  date={val.date}
                  updatePostFn={this.updatePost}
                  deletePostFn={this.deletePost}
               />
      }
    );
    
    return (
      <div className="App__parent">
        <Header 
          filterPostFn={this.filterPost}
        />

        <section className="App__content">

          <Compose createPostFn={this.createPost}/>
          {postLoop}
        </section>
      </div>
    );
  }
}

export default App;
