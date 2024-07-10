// src/PostList.js (example component)
import React, { useEffect, useState } from 'react';
import { fetchData } from './api';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await fetchData();
        setPosts(data); // Assuming data is an array of post objects
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Posts</h2>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <img src={`http://localhost:1337${post.image.url}`} alt={post.image.alternativeText} />
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
