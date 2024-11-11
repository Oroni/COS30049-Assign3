// src/components/Layout.js
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './styles/Layout.css'; 

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
