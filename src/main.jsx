import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import App from './App.jsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import theme from './theme';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>
);
