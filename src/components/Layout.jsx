import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import PollIcon from '@mui/icons-material/Poll';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, Box } from '@mui/material';

const menuItems = [
    'Create New Meeting',
    'Join New Meeting',
    'Past Meetings',
    'Class Leaderboard',
    'Create Poll',
    'Create Quiz'
];

export default function Layout({ children }) {
    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer
                variant="permanent"
                anchor="left"
                sx={{ width: 240, '& .MuiDrawer-paper': { width: 240 } }}
            >
                <List>
                    <ListItem button component={Link} to="/create-meeting">
                        <MeetingRoomIcon sx={{ mr: 1 }} />
                        <ListItemText primary="Create New Meeting" />
                    </ListItem>
                    <ListItem button component={Link} to="/leaderboard">
                        <EmojiEventsIcon sx={{ mr: 1 }} />
                        <ListItemText primary="Class Leaderboard" />
                    </ListItem>
                    <ListItem button component={Link} to="/create-poll">
                        <PollIcon sx={{ mr: 1 }} />
                        <ListItemText primary="Create Poll" />
                    </ListItem>
                </List>


            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
                {children}
            </Box>

        </Box>
    );
}
