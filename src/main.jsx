// src/main.jsx
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App.jsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import theme from './theme';

console.log("[INFO] main.jsx :: Script execution started.");
console.log("[DEBUG] main.jsx :: Importing dependencies finished.");

try {
  console.log("[DEBUG] main.jsx :: Getting root element from DOM.");
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error("Root element with id 'root' not found in the DOM.");
  }

  console.log("[DEBUG] main.jsx :: Creating React root.");
  const root = ReactDOM.createRoot(rootElement);

  console.log("[INFO] main.jsx :: Rendering application into the root.");
  root.render(
    <React.StrictMode>
      {console.log("[DEBUG] main.jsx :: StrictMode enabled.")}
      <BrowserRouter>
        {console.log("[DEBUG] main.jsx :: BrowserRouter initialized.")}
        <ThemeProvider theme={theme}>
          {console.log("[DEBUG] main.jsx :: ThemeProvider initialized.")}
          <CssBaseline />
          {console.log("[DEBUG] main.jsx :: CssBaseline applied.")}
          <App />
          {console.log("[DEBUG] main.jsx :: App component rendering initiated.")}
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
  console.log("[INFO] main.jsx :: Application rendering complete.");

} catch (error) {
  console.error("[ERROR] main.jsx :: Failed to render application:", error);
  // Optionally display an error message to the user in the DOM
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = '<div style="color: red; padding: 20px;">An error occurred while loading the application. Please check the console.</div>';
  }
}
