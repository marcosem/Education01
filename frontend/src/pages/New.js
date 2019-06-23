import React, { Component } from 'react';
import api from '../services/api';

import './New.css';

class New extends Component {
  state = {
    image: null,
    author: '',
    place: '',
    description: '',
    hashtags: ''
  };

  // this function were created in this format "x = e =>{}" in order to be able to access "this"
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  hangleImageChange = e => {
    this.setState({ image: e.target.files[0] });
  };

  // async is necessay in order to use await
  handleSubmit = async e => {
    // Prevent HTML default behave to jump to another page after click on submit
    e.preventDefault();

    // if the submit was only about texts not image, you could only use (JSON):
    // await api.post('posts', { author, place, description, hashtags });
    // but since you are handle image as well you need to use the following:
    const data = new FormData();
    data.append('image', this.state.image);
    data.append('author', this.state.author);
    data.append('place', this.state.place);
    data.append('description', this.state.description);
    data.append('hashtags', this.state.hashtags);

    await api.post('posts', data);

    this.props.history.push('/');
  };

  render() {
    return (
      <form id="new-post" onSubmit={this.handleSubmit}>
        <input type="file" onChange={this.hangleImageChange} />

        <input
          type="text"
          name="author"
          placeholder="Enter the author"
          onChange={this.handleChange}
          value={this.state.author}
        />

        <input
          type="text"
          name="place"
          placeholder="Enter the place"
          onChange={this.handleChange}
          value={this.state.place}
        />

        <input
          type="text"
          name="description"
          placeholder="Enter the description"
          onChange={this.handleChange}
          value={this.state.description}
        />

        <input
          type="text"
          name="hashtags"
          placeholder="hashtags"
          onChange={this.handleChange}
          value={this.state.hashtags}
        />

        <button type="submit">Post</button>
      </form>
    );
  }
}

export default New;
