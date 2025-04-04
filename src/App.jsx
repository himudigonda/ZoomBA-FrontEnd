// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import CreateMeeting from './screens/CreateMeeting';
import Leaderboard from './screens/Leaderboard';
import CreatePoll from './screens/CreatePoll';
import { Box, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// Placeholder components (if used - can be removed if not needed elsewhere)
// const Placeholder = ({ title }) => <Typography variant="h4">{title} Coming Soon</Typography>;

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
        {/* Removed '/join-meeting' route */}
        {/* Removed '/past-meetings' route */}
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/create-poll" element={<CreatePoll />} />
        {/* Removed '/create-quiz' route */}
      </Routes>
    </Layout>
  );
}

export default App;
