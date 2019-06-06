import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import { deletePost } from './../graphql/mutations';
import gql from 'graphql-tag';
import { listPosts } from './../graphql/queries';
import DeleteIcon from '@material-ui/icons/Delete';

class DeletePost extends Component {

    handleDelete = (deletePost) => {
        console.log("the Delete Post title", this.props.title);
        deletePost({
            variables: {
                input: {
                    id: this.props.id
                }
            },
            optimisticResponse: () => ({
                deletePost: {
                    // This type must match the return type of
                    //the query below (listPosts)
                    __typename: 'ModelPostConnection',
                    id: this.props.id,
                    title: this.props.title,
                    body: this.props.body,
                    createdAt: this.props.createdAt
                }
            }),
            update: (cache, { data: { deletePost } }) => {
                const query = gql(listPosts);

                // Read query from cache
                const data = cache.readQuery({ query });

                // Add updated postsList to the cache copy
                data.listPosts.items = [
                    ...data.listPosts.items.filter(item =>
                     item.id !== this.props.id)
                ];

                //Overwrite the cache with the new results
                cache.writeQuery({ query, data });
            }
        })
    }

    render() {
        console.log("props", this.props)
        //const deletePost = this.props.deletePost
        return (
            <Mutation mutation={gql(deletePost)}>
                {( deletePost, { loading, error }) => {
                    return <DeleteIcon style={{cursor: "pointer"}} onClick={
                       () => this.handleDelete(deletePost)} />
                }}
            </Mutation>
        )
    }
}

export default DeletePost;