import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import CreateMeeting from './screens/CreateMeeting';
import Leaderboard from './screens/Leaderboard';
import CreatePoll from './screens/CreatePoll';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<h1>Welcome to ZoomBA</h1>} />
        <Route path="/create-meeting" element={<CreateMeeting />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/create-poll" element={<CreatePoll />} />
      </Routes>
    </Layout>
  );
}

export default App;
