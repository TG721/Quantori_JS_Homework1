import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Header from './components/Header/Header';

function App() {
  return (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/tasks" element={<Home />} />
    <Route path="/tasks/:tag" element={<Home />} />
    <Route path="*" element={<Header title="Not Found" importance="h1"/>} />
  </Routes>
  )
}

export default App;
