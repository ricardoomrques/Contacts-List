import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './Home/Home';
import Details from './Details/Details';
import AddContact from './AddContact/AddContact';
import EditContact from './EditContact/EditContact';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/edit/:id" element={<EditContact />} />
          <Route path="/add" element={<AddContact />} />
      </Routes>
    </BrowserRouter>
);

