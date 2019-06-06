import React from 'react';
import './../styles/App.css';
import CreatePost from './../components/createPost';
import DisplayPosts from './../components/displayPosts';

function App() {
  return (
    <>
      <div className="App">
        <h1> Serverless Backend </h1> 
        <CreatePost />
        <DisplayPosts />
      </div>
    </>
  );
}

export default App;
