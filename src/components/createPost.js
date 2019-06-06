import React from "react";
import { Mutation } from "react-apollo";
import { createPost } from "./../graphql/mutations";
import gql from "graphql-tag";
import './../styles/createPost.css';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder'

class CreatePost extends React.Component {
  handleSubmit = (e, createPost) => {
    e.preventDefault();
    createPost({
      variables: {
        input: {
          title: this.title.value,
          body: this.body.value,
          createdAt: new Date().toISOString()
        }
      }
    }).then(res => {
      this.title.value = "";
      this.body.value = "";
    });
  };
  render() {
    return (
      <>
        <h1> Hacker News </h1>
        <Mutation mutation={gql(createPost)}>
          {(createPost, { data, loading, error }) => {
            return (
              <div>
                <form
                  className="add-post"
                  onSubmit={e => this.handleSubmit(e, createPost)}
                >
                  <input
                    type="text" 
                    placeholder="Title"
                    ref={node => (this.title = node)}
                    required
                    className = "input-post"
                  />
                  <textarea
                    rows="3"
                    cols="40"
                    placeholder="Body"
                    ref={node => (this.body = node)}
                    required
                  />
                  <button>  <CreateNewFolderIcon /> </button>
                </form>
                {error && <p>{error.message}</p>}
              </div>
            );
          }}
        </Mutation>
      </>
    );
  }
}

export default CreatePost;