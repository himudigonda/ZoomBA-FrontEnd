// src/components/Layout.jsx
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Drawer, List, ListItemButton, ListItemText, Box, ListSubheader } from '@mui/material';
import Logo from './Logo'; // Import the Logo component

const drawerWidth = 260;

// Define UPDATED navigation structure
const navSections = [
    {
        title: 'Meetings',
        items: [
            { text: 'Create New Meeting', path: '/create-meeting' },
            // Removed 'Join New Meeting'
            // Removed 'Past Meetings'
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
            // Removed 'Create Quiz'
        ]
    }
];

export default function Layout({ children }) {
    const location = useLocation();

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' /* Ensure layout takes full viewport height */ }}>
            <Drawer
                variant="permanent"
                anchor="left"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        borderRight: 'none',
                        backgroundColor: 'background.paper'
                    },
                }}
            >
                <Logo />
                <List sx={{ pt: 0 }}>
                    {navSections.map((section) => (
                        // Only render section if it has items after filtering
                        section.items.length > 0 && (
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
                                        <ListItemText primary={item.text} />
                                    </ListItemButton>
                                ))}
                            </React.Fragment>
                        )
                    ))}
                </List>
            </Drawer>

            {/* Main Content Area - Still centered with max-width but allows vertical growth */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: 'background.default',
                    p: { xs: 2, sm: 3, md: 4 }, // Responsive padding
                    display: 'flex',
                    flexDirection: 'column', // Stack children vertically
                    alignItems: 'center', // Center children horizontally
                    overflowY: 'auto', // Allow scrolling on the main content area if needed
                }}
            >
                {/* Inner wrapper controls max width and allows children to take height */}
                <Box sx={{
                    width: '100%',
                    maxWidth: '1200px',
                    display: 'flex', // Use flexbox here too
                    flexDirection: 'column', // Stack content
                    flexGrow: 1, // Allow this box to grow vertically
                }}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
}
