// app/javascript/components/PostEditModal.jsx
import React, { useState } from 'react';

const PostEditModal = ({ post, onClose, onSave }) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const handleSave = () => {
    onSave({ ...post, title, content });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-xl font-semibold mb-4">Edit Post</h2>
        <div className="mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full rounded-lg"
          />
        </div>
        <div className="mb-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border p-2 w-full rounded-lg"
            rows="4"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded-lg">
            Cancel
          </button>
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostEditModal;
