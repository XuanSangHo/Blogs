import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getFromStorage } from './utils/storage';
import { StorageKeys } from './utils/constants';

import BlogLayout from './page/blogs';
import LoginPage from './page/login';
import Register from './page/register';
import Profile from './page/profile';
import ForgotPassword from './page/forgot-password';
import ResetPasswordPage from './page/reset-password';

import Header from './layout/header';
import Wrapper from './layout/wrapper';

function App() {
  const ACCESS_TOKEN = getFromStorage(StorageKeys.USER_TOKEN_KEY);
  return (
    <>
      <Wrapper>
        <Header />
        <Routes>
          <Route path="/*" element={<BlogLayout />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset_password" element={<ResetPasswordPage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </Wrapper>

      <ToastContainer
        position={toast.POSITION.TOP_RIGHT}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        autoClose={5000}
        draggable
        pauseOnHover
        style={{ fontSize: '14px' }}
      />
    </>
  );
}

export default App;
