import React, { Component } from 'react';
import api from '../services/api';
import io from 'socket.io-client';

import './Feed.css';

import more from '../assets/more.svg';
import like from '../assets/like.svg';
import comment from '../assets/comment.svg';
import send from '../assets/send.svg';

class Feed extends Component {
  // to store values in a React class component it is necessary to create a variable called state
  state = {
    feed: []
  };

  // This method is automatically callend when the component is build on screen
  // it can be async if you want to not wait for build to go to the next object
  async componentDidMount() {
    // A function to manipulate the socket for this component (it was created by me)
    this.registerToSocket();

    // getting the response from "http://localhost:3333/posts"
    const response = await api.get('posts');

    // It forces the state to refresh
    this.setState({ feed: response.data });
  }

  registerToSocket = () => {
    const socket = io('http://localhost:3333');
    // post, like

    socket.on('post', newPost => {
      this.setState({ feed: [newPost, ...this.state.feed] });
    });

    socket.on('like', likedPost => {
      this.setState({
        feed: this.state.feed.map(post =>
          post._id === likedPost._id ? likedPost : post
        )
      });
    });
  };

  handleLike = id => {
    api.post(`/posts/${id}/like`);
  };

  handleRightClick = e => {
    e.preventDefault();
  };

  // the following method is required for every component. It is how it will draw the objet
  render() {
    return (
      <section id="post-list">
        {// the property map work likes for each in an array
        this.state.feed.map(post => (
          <article key={post._id}>
            <header>
              <div className="user-info">
                <span>{post.author}</span>
                <span className="place">{post.place}</span>
              </div>

              <img
                src={more}
                alt="More"
                onContextMenu={e => this.handleRightClick(e)}
              />
            </header>
            <img
              src={`http://localhost:3333/files/${post.image}`}
              alt={`${post.image}`}
              onContextMenu={e => this.handleRightClick(e)}
              onMouseDown={e => this.handleRightClick(e)}
            />

            <footer>
              <div className="actions">
                <button type="button" onClick={() => this.handleLike(post._id)}>
                  <img
                    src={like}
                    alt="Like"
                    onContextMenu={e => this.handleRightClick(e)}
                  />
                </button>

                <img
                  src={comment}
                  alt="Comment"
                  onContextMenu={e => this.handleRightClick(e)}
                />
                <img
                  src={send}
                  alt="Send"
                  onContextMenu={e => this.handleRightClick(e)}
                />
              </div>

              <strong>
                {post.likes} {post.likes === 1 ? 'like' : 'likes'}
              </strong>
              <p>
                {post.description}
                <span>{post.hashtags}</span>
              </p>
            </footer>
          </article>
        ))}
      </section>
    );
  }
}

export default Feed;
