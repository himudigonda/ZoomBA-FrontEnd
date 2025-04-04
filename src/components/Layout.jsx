// src/components/Layout.jsx
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom'; // Use NavLink for active styling
import { Drawer, List, ListItemButton, ListItemText, Box, ListSubheader, Divider } from '@mui/material';
import Logo from './Logo'; // Import the Logo component

const drawerWidth = 260; // Keep drawer width

// Define navigation structure (no changes here)
const navSections = [
    {
        title: 'Meetings',
        items: [
            { text: 'Create New Meeting', path: '/create-meeting' },
            { text: 'Join New Meeting', path: '/join-meeting' },
            { text: 'Past Meetings', path: '/past-meetings' },
        ]
    },
    {
        title: 'Leaderboard',
        items: [
            { text: 'Class Leaderboard', path: '/leaderboard' },
        ]
    },
    {
        title: 'Polls and Quizzes',
        items: [
            { text: 'Create Poll', path: '/create-poll' },
            { text: 'Create Quiz', path: '/create-quiz' },
        ]
    }
];

export default function Layout({ children }) {
    const location = useLocation(); // Get current path

    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer
                variant="permanent"
                anchor="left"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        borderRight: 'none', // Ensure no border from drawer itself
                        backgroundColor: 'background.paper' // Use theme background
                    },
                }}
            >
                <Logo />
                <List sx={{ pt: 0 }}>
                    {navSections.map((section) => (
                        <React.Fragment key={section.title}>
                            <ListSubheader sx={{ bgcolor: 'transparent', fontWeight: 'bold', color: 'text.secondary', pt: 2, pb: 1, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                                {section.title}
                            </ListSubheader>
                            {section.items.map((item) => (
                                <ListItemButton
                                    key={item.text}
                                    component={NavLink}
                                    to={item.path}
                                    selected={location.pathname === item.path}
                                >
                                    {/* Use primaryTypographyProps from theme */}
                                    <ListItemText primary={item.text} />
                                </ListItemButton>
                            ))}
                        </React.Fragment>
                    ))}
                </List>
            </Drawer>

            {/* Main Content Area - Updated for centering and max-width */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: 'background.default', // Use theme default background
                    p: 4, // Keep padding or adjust (e.g., p: { xs: 2, sm: 3, md: 4 })
                    minHeight: '100vh',
                    display: 'flex', // Use flex to help center content potentially
                    flexDirection: 'column', // Stack content vertically
                    alignItems: 'center', // Center content horizontally
                }}
            >
                {/* Add a wrapper Box to control the content's max width and centering */}
                <Box sx={{
                    width: '100%', maxWidth: '1200px', // Set a max-width for content readability
                    flexGrow: 1
                }}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
}
