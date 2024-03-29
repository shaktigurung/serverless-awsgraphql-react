import React from 'react'
import { Query } from 'react-apollo'
import { listPosts } from './../graphql/queries';
import { onCreatePost } from './../graphql/subscriptions'
import gql from 'graphql-tag';
import Post from './post';
import './../styles/displayPosts.css';
import Grid from '@material-ui/core/Grid';


class DisplayPosts extends React.Component {

    subsCribeNewPosts = (subscribeToMore) => {
        return subscribeToMore({
            document: gql(onCreatePost),
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newPostData = subscriptionData.data.onCreatePost;
                return Object.assign({}, prev, {
                    listPosts: {
                        ...prev.listPosts,
                        items: [...prev.listPosts.items, newPostData]
                    }
                })
            }
        })
    }

    render() {
        return (
            <Grid container>
                <Query query={gql(listPosts)}  >
                    {({ loading, data, error, subscribeToMore }) => {

                        if (loading) return <p>loading...</p>
                        if (error) return <p>{error.message}</p>

                        return <Post data={data} subscribeToMore={() =>
                            this.subsCribeNewPosts(subscribeToMore)} />
                    }}
                </Query>
            </Grid>
        )
    }
}

export default DisplayPosts;