import React from "react";
import { updatePost } from "./../graphql/mutations";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import UpdateIcon from '@material-ui/icons/Update';

class EditPost extends React.Component {
  state = {
    show: false,
    postData: {
      title: this.props.title,
      body: this.props.body
    }
  };

  handleModal = () => {
    this.setState({ show: !this.state.show });
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  handleSubmit = (e, updatePost) => {
    e.preventDefault();
    updatePost({
      variables: {
        input: {
          id: this.props.id,
          title: this.state.postData.title,
          body: this.state.postData.body
        }
      }
    }).then(res => this.handleModal());
  };

  handleTitle = e => {
    this.setState({
      postData: { ...this.state.postData, title: e.target.value }
    });
  };

  handleBody = e => {
    this.setState({
      postData: { ...this.state.postData, body: e.target.value }
    });
  };

  render() {
    return (
      <>
        {this.state.show && (
          <div className="modal">
             <button className="close" onClick={this.handleModal}>
              <CloseIcon /> 
            </button>
            <Mutation mutation={gql(updatePost)}>
              {updatePost => {
                return (
                  <form
                    className="add-post"
                    onSubmit={e => this.handleSubmit(e, updatePost)}
                  >
                    <input
                      type="text"
                      required
                      value={this.state.postData.title}
                      onChange={this.handleTitle}
                    />
                    <textarea
                      rows="3"
                      cols="40"
                      required
                      value={this.state.postData.body}
                      onChange={this.handleBody}
                    />
                    <button> <UpdateIcon /> </button>
                  </form>
                );
              }}
            </Mutation>
          </div>
        )}
        <EditIcon style={{cursor: "pointer"}} onClick={this.handleModal} />
      </>
    );
  }
}

export default EditPost;
