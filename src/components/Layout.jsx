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
                    {menuItems.map((text, index) => (
                        <ListItem button key={index}>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {children}
            </Box>
        </Box>
    );
}
