import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Details from './components/Details';
import Home from './components/Home';

const App = () => (
  <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/details" element={<Details />} />
    </Routes>
    <Navigate to="/" />
  </>
);

export default App;
