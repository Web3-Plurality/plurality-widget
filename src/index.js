import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.tsx'
import SecondPage from './pages/secondPage.tsx'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/second' element={<SecondPage />}></Route>
        </Routes>
    </Router>
);
