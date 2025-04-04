// src/main.jsx
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; // Import CssBaseline
import App from './App.jsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import theme from './theme';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> {/* Added StrictMode */}
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Apply baseline styles (background, etc.) */}
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
