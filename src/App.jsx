// src/App.jsx
import React, { useEffect } from 'react'; // Added useEffect
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import CreateMeeting from './screens/CreateMeeting';
import Leaderboard from './screens/Leaderboard';
import { Box, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

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
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
      <AddCircleOutlineIcon sx={{ fontSize: 80, color: 'grey.400', mb: 2 }} />
      <Typography variant="h6" sx={{ color: 'text.secondary' }}>
        Create / Join Meeting to Get Started
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
        {console.log("[DEBUG] App.App :: Setting up Route for /leaderboard")}
        <Route path="/leaderboard" element={<Leaderboard />} />
        {/* Catch-all or specific 404 route could be added here */}
        <Route path="*" element={<Typography>404 - Page Not Found</Typography>} />
        {console.log("[DEBUG] App.App :: Finished setting up Routes.")}
      </Routes>
    </Layout>
  );
  console.log("[DEBUG] App.App :: Component rendering finished."); // Note: This line might not execute predictably due to the return statement above. Log before return.
}

export default App;
