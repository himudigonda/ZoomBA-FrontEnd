// src/App.jsx
import React, { useEffect, useState } from 'react'; // Added useState for auth simulation
import { Routes, Route, Navigate } from 'react-router-dom'; // Added Navigate
import Layout from './components/Layout';
import CreateMeeting from './screens/CreateMeeting';
import Leaderboard from './screens/Leaderboard';
import UploadChat from './screens/UploadChat';
import UpcomingMeetings from './screens/UpcomingMeetings';
import LoginScreen from './screens/LoginScreen'; // <-- Import Login Screen
import { Box, Typography, CircularProgress } from '@mui/material'; // Added CircularProgress for loading state
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

console.log("[DEBUG] App.jsx :: Module loaded.");

// Base Screen (Welcome screen for authenticated area)
const BaseScreen = () => {
  console.log("[DEBUG] App.BaseScreen :: Component rendering started.");
  useEffect(() => {
    console.log("[INFO] App.BaseScreen :: Component mounted.");
    return () => {
      console.log("[INFO] App.BaseScreen :: Component will unmount.");
    };
  }, []);
  console.log("[DEBUG] App.BaseScreen :: Component rendering finished.");
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1, textAlign: 'center', p: 2 }}>
      <AddCircleOutlineIcon sx={{ fontSize: 80, color: 'grey.400', mb: 2 }} />
      <Typography variant="h6" sx={{ color: 'text.secondary' }}>
        Select an option from the sidebar to get started
      </Typography>
    </Box>
  );
};

// Simple 404 Component
const NotFoundScreen = () => {
  console.log("[DEBUG] App.NotFoundScreen :: Component rendering started.");
  useEffect(() => {
    console.log("[INFO] App.NotFoundScreen :: Component mounted.");
    return () => {
      console.log("[INFO] App.NotFoundScreen :: Component will unmount.");
    };
  }, []);
  console.log("[DEBUG] App.NotFoundScreen :: Component rendering finished.");
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1, textAlign: 'center', p: 2 }}>
      <ErrorOutlineIcon sx={{ fontSize: 80, color: 'grey.400', mb: 2 }} />
      <Typography variant="h5" sx={{ color: 'text.primary', mb: 1 }}>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
        The page you are looking for does not exist.
      </Typography>
    </Box>
  );
};

// --- Main App Component with Simulated Auth ---
function App() {
  console.log("[DEBUG] App.App :: Component rendering started.");
  // --- Simulate Authentication ---
  // Replace this with real auth logic later (e.g., checking context, tokens)
  const [isLoadingAuth, setIsLoadingAuth] = useState(true); // Simulate checking auth status
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Default to not logged in

  useEffect(() => {
    console.log("[INFO] App.App :: Component mounted. Simulating auth check.");
    // Simulate checking for a token or session
    const checkAuth = () => {
      // In a real app: check localStorage, cookies, or context API
      const fakeAuthStatus = localStorage.getItem('zoomBAAuth') === 'true'; // Example check
      console.log("[DEBUG] App.App.checkAuth :: Simulated auth status from storage:", fakeAuthStatus);
      setIsAuthenticated(fakeAuthStatus);
      setIsLoadingAuth(false);
      console.log("[INFO] App.App.checkAuth :: Auth check simulation complete.");
    };
    const timer = setTimeout(checkAuth, 500); // Simulate delay

    return () => {
      console.log("[INFO] App.App :: Component will unmount.");
      clearTimeout(timer);
    };
  }, []); // Run only once on mount

  // --- Provide a way to simulate login for testing ---
  // In a real app, this would be handled by the OAuth callback
  window.simulateLogin = () => {
    console.log("[INFO] App.App.simulateLogin :: Simulating login...");
    localStorage.setItem('zoomBAAuth', 'true');
    setIsAuthenticated(true);
    console.log("[INFO] App.App.simulateLogin :: Auth status set to true.");
    // Navigate might be needed here if called from login page, but the redirect handles it
  };
  window.simulateLogout = () => {
    console.log("[INFO] App.App.simulateLogout :: Simulating logout...");
    localStorage.removeItem('zoomBAAuth');
    setIsAuthenticated(false);
    console.log("[INFO] App.App.simulateLogout :: Auth status set to false.");
    // Could add navigation back to /login here if needed
  };

  if (isLoadingAuth) {
    console.log("[DEBUG] App.App :: Auth check in progress, rendering loading spinner.");
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  console.log("[DEBUG] App.App :: Rendering Routes based on isAuthenticated:", isAuthenticated);
  return (
    <Routes>
      {isAuthenticated ? (
        // --- Authenticated Routes ---
        <Route path="/*" element={ // Use /* to catch all routes within the authenticated area
          <Layout>
            <Routes>
              {console.log("[DEBUG] App.App :: Setting up Authenticated Route for /")}
              <Route path="/" element={<BaseScreen />} />
              {console.log("[DEBUG] App.App :: Setting up Authenticated Route for /create-meeting")}
              <Route path="/create-meeting" element={<CreateMeeting />} />
              {console.log("[DEBUG] App.App :: Setting up Authenticated Route for /upcoming-meetings")}
              <Route path="/upcoming-meetings" element={<UpcomingMeetings />} />
              {console.log("[DEBUG] App.App :: Setting up Authenticated Route for /leaderboard")}
              <Route path="/leaderboard" element={<Leaderboard />} />
              {console.log("[DEBUG] App.App :: Setting up Authenticated Route for /upload-chat")}
              <Route path="/upload-chat" element={<UploadChat />} />
              {console.log("[DEBUG] App.App :: Setting up Authenticated catch-all (*) Route for 404")}
              <Route path="*" element={<NotFoundScreen />} /> {/* Catch-all inside Layout */}
              {console.log("[DEBUG] App.App :: Finished setting up Authenticated Routes.")}
            </Routes>
          </Layout>
        } />
      ) : (
        // --- Unauthenticated Routes ---
        <>
          {console.log("[DEBUG] App.App :: Setting up Unauthenticated Route for /login")}
          <Route path="/login" element={<LoginScreen />} />
          {console.log("[DEBUG] App.App :: Setting up Unauthenticated catch-all redirect to /login")}
          <Route path="*" element={<Navigate to="/login" replace />} /> {/* Redirect all other paths to login */}
          {console.log("[DEBUG] App.App :: Finished setting up Unauthenticated Routes.")}
        </>
      )}
    </Routes>
  );
}

export default App;
