import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './homePage';
import BlogDetailPage from './blog-detail';
import AddEditBlog from './addEditBlogs';

export default function BlogLayout() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:id" element={<BlogDetailPage />} />
      <Route path="/add" element={<AddEditBlog />} />
      <Route path="/edit/:id" element={<AddEditBlog />} />
    </Routes>
  );
}
