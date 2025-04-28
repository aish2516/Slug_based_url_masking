// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

import React from 'react';
import ReactDOM from 'react-dom';
import PostList from './components/PostList';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <PostList />,
    document.getElementById('react-post-list')
  );
});
