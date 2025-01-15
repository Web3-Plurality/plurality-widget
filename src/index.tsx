import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SecondPage from './pages/secondPage';

// Ensure that the 'root' element exists and has a valid type
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Root element not found. Make sure your HTML file has an element with id='root'.");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<SecondPage />} />
        <Route path="/second" element={<Home />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
