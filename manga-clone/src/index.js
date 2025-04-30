import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MAR from './App';
import reportWebVitals from './reportWebVitals';
import { LibraryProvider } from './Components/Library';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <LibraryProvider>
        <MAR />
    </LibraryProvider>
);
reportWebVitals();
