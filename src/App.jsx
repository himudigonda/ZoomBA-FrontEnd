// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import CreateMeeting from './screens/CreateMeeting';
import Leaderboard from './screens/Leaderboard';
import CreatePoll from './screens/CreatePoll';
import { Box, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // Import icon

// Placeholder components for routes not yet built
const Placeholder = ({ title }) => <Typography variant="h4">{title} Coming Soon</Typography>;
const BaseScreen = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '70vh' }}>
    <AddCircleOutlineIcon sx={{ fontSize: 80, color: 'grey.400', mb: 2 }} />
    <Typography variant="h6" sx={{ color: 'text.secondary' }}>
      Create / Join Meeting to Get Started
    </Typography>
  </Box>
);

function App() {
  return (
    // Assuming Auth routes are handled elsewhere or not needed for this MVP UI part
    <Layout>
      <Routes>
        <Route path="/" element={<BaseScreen />} /> {/* Base screen */}
        <Route path="/create-meeting" element={<CreateMeeting />} />
        <Route path="/join-meeting" element={<Placeholder title="Join Meeting" />} />
        <Route path="/past-meetings" element={<Placeholder title="Past Meetings" />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/create-poll" element={<CreatePoll />} />
        <Route path="/create-quiz" element={<Placeholder title="Create Quiz" />} />
        {/* Add other routes as needed */}
      </Routes>
    </Layout>
  );
}

export default App;
