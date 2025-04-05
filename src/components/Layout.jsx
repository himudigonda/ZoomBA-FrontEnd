// src/components/Layout.jsx
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Drawer, List, ListItemButton, ListItemText, Box, ListSubheader } from '@mui/material';
import Logo from './Logo'; // Import the Logo component

const drawerWidth = 260;

const navSections = [
    {
        title: 'Meetings',
        items: [{ text: 'Create New Meeting', path: '/create-meeting' },]
    },
    {
        title: 'Leaderboard',
        items: [{ text: 'Class Leaderboard', path: '/leaderboard' },]
    }
];

export default function Layout({ children }) {
    const location = useLocation();

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}> {/* Verified: Full height */}
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
                        backgroundColor: 'background.paper' // Uses theme color
                    },
                }}
            >
                <Logo />
                <List sx={{ pt: 0 }}>
                    {navSections.map((section) => (
                        // Render section only if it has items (good practice)
                        section.items.length > 0 && (
                            <React.Fragment key={section.title}>
                                {/* ListSubheader styling primarily handled by theme now */}
                                <ListSubheader disableSticky> {/* disableSticky can prevent style issues */}
                                    {section.title}
                                </ListSubheader>
                                {section.items.map((item) => (
                                    // ListItemButton styling primarily handled by theme now
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

            {/* Main Content Area - Verification */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: 'background.default', // Uses theme color
                    p: { xs: 2, sm: 3, md: 4 }, // Consistent padding
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    overflowY: 'auto', // Allows scrolling if content exceeds viewport
                }}
            >
                {/* Inner wrapper - Verification */}
                <Box sx={{
                    width: '100%',
                    maxWidth: '1200px', // Consistent max width
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1, // Allows content to fill vertical space
                }}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
}
