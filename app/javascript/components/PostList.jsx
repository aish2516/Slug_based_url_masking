import React, { useState, useEffect } from 'react';
import PostEditModal from './PostEditModal';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    fetch('/posts.json')
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts([data, ...posts]);
        setNewPost({ title: '', content: '' });
      });
  };

  const handleEdit = (post) => {
    setSelectedPost(post);
  };

  const handleSaveEdit = (updatedPost) => {
    fetch(`/posts/${updatedPost.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPost),
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts(posts.map((post) => (post.id === data.id ? data : post)));
      });
  };

  const closeModal = () => setSelectedPost(null);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-center mb-6">Posts</h1>
      {loading ? <p>Loading posts...</p> : (
        <ul className="list-none space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="border p-4 rounded-lg">
              <h3 className="font-bold">{post.title}</h3>
              <p>{post.content}</p>
              <button
                onClick={() => handleEdit(post)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
              >
                Edit Post
              </button>
            </li>
          ))}
        </ul>
      )}

      {selectedPost && (
        <PostEditModal
          post={selectedPost}
          onClose={closeModal}
          onSave={handleSaveEdit}
        />
      )}

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Create a New Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="title"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              placeholder="Post Title"
              className="border p-2 w-full rounded-lg"
            />
          </div>
          <div className="mb-4">
            <textarea
              name="content"
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              placeholder="Post Content"
              className="border p-2 w-full rounded-lg"
              rows="4"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostList;
