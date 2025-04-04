// src/components/Layout.jsx
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom'; // Use NavLink for active styling
import { Drawer, List, ListItemButton, ListItemText, Box, ListSubheader, Divider } from '@mui/material';
import Logo from './Logo'; // Import the Logo component

const drawerWidth = 260; // Increase width slightly

// Define navigation structure
const navSections = [
    {
        title: 'Meetings',
        items: [
            { text: 'Create New Meeting', path: '/create-meeting' },
            { text: 'Join New Meeting', path: '/join-meeting' }, // Add placeholder paths
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
            { text: 'Create Quiz', path: '/create-quiz' }, // Add placeholder path
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
                <Logo /> {/* Add the logo */}
                {/* <Divider sx={{ mb: 1 }}/> Optionally add a divider */}

                <List sx={{ pt: 0 }}> {/* Remove padding top */}
                    {navSections.map((section) => (
                        <React.Fragment key={section.title}>
                            <ListSubheader sx={{ bgcolor: 'transparent', fontWeight: 'bold', color: 'text.secondary', pt: 2, pb: 1 }}>
                                {section.title}
                            </ListSubheader>
                            {section.items.map((item) => (
                                <ListItemButton
                                    key={item.text}
                                    component={NavLink}
                                    to={item.path}
                                    selected={location.pathname === item.path} // Explicitly set selected based on path
                                // sx prop styling is handled globally in theme.js now
                                >
                                    {/* Removed Icons */}
                                    <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: 500 }} />
                                </ListItemButton>
                            ))}
                        </React.Fragment>
                    ))}
                </List>
            </Drawer>

            {/* Main Content Area */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: 'background.default', // Use theme default background
                    p: 4, // Adjust padding as needed
                    minHeight: '100vh'
                }}
            >
                {children}
            </Box>
        </Box>
    );
}
