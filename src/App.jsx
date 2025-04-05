// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import CreateMeeting from './screens/CreateMeeting';
import Leaderboard from './screens/Leaderboard';
import { Box, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// Base Screen (Welcome screen)
const BaseScreen = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1 /* Allow BaseScreen to fill space */ }}>
    <AddCircleOutlineIcon sx={{ fontSize: 80, color: 'grey.400', mb: 2 }} />
    <Typography variant="h6" sx={{ color: 'text.secondary' }}>
      Create / Join Meeting to Get Started
    </Typography>
  </Box>
);

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<BaseScreen />} />
        <Route path="/create-meeting" element={<CreateMeeting />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Layout>
  );
}

export default App;
