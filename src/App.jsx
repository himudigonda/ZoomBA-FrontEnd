// src/App.jsx
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import CreateMeeting from './screens/CreateMeeting';
import Leaderboard from './screens/Leaderboard';
import UploadChat from './screens/UploadChat';
import UpcomingMeetings from './screens/UpcomingMeetings'; // <-- Import the new screen
import { Box, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

console.log("[DEBUG] App.jsx :: Module loaded.");

// Base Screen (Welcome screen)
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


function App() {
  console.log("[DEBUG] App.App :: Component rendering started.");
  useEffect(() => {
    console.log("[INFO] App.App :: Component mounted.");
    return () => {
      console.log("[INFO] App.App :: Component will unmount.");
    };
  }, []);

  console.log("[DEBUG] App.App :: Rendering Layout and Routes.");
  return (
    <Layout>
      <Routes>
        {console.log("[DEBUG] App.App :: Setting up Route for /")}
        <Route path="/" element={<BaseScreen />} />
        {console.log("[DEBUG] App.App :: Setting up Route for /create-meeting")}
        <Route path="/create-meeting" element={<CreateMeeting />} />
        {console.log("[DEBUG] App.App :: Setting up Route for /upcoming-meetings")}
        <Route path="/upcoming-meetings" element={<UpcomingMeetings />} /> {/* <-- Add route for UpcomingMeetings */}
        {console.log("[DEBUG] App.App :: Setting up Route for /leaderboard")}
        <Route path="/leaderboard" element={<Leaderboard />} />
        {console.log("[DEBUG] App.App :: Setting up Route for /upload-chat")}
        <Route path="/upload-chat" element={<UploadChat />} />
        {console.log("[DEBUG] App.App :: Setting up catch-all (*) Route for 404")}
        <Route path="*" element={<NotFoundScreen />} />
        {console.log("[DEBUG] App.App :: Finished setting up Routes.")}
      </Routes>
    </Layout>
  );
}

export default App;
