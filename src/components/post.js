import React from 'react';
import EditPost from './editPost';
import DeletePost from './deletePost';
import './../styles/post.css';
import Grid from '@material-ui/core/Grid';

class Post extends React.Component {

    componentDidMount() {
        this.props.subscribeToMore();
    }

    render() {
        const items = this.props.data.listPosts.items;
        return items.map((post) => {
            return (
                <Grid item xs={3} key={post.id}>
                        <div className="card">
                            <div className="container">
                                <h4><b>{post.title}</b></h4> 
                                <p>{post.body}</p> 
                                <p> <time dateTime={post.createdAt}>
                                {new Date(post.createdAt).toDateString()}</time></p>
                                <EditPost {...post} />
                                <DeletePost {...post} />
                            </div>
                        </div>
                </Grid>
            )
        })
    }
}

export default Post;