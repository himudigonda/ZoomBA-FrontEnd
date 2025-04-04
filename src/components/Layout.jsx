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
                        <ListItemText primary="Create New Meeting" />
                    </ListItem>
                    <ListItem button component={Link} to="/leaderboard">
                        <ListItemText primary="Class Leaderboard" />
                    </ListItem>
                    <ListItem button component={Link} to="/create-poll">
                        <ListItemText primary="Create Poll" />
                    </ListItem>
                </List>

            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {children}
            </Box>
        </Box>
    );
}
