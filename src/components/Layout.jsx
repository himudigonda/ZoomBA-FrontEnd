// src/components/Layout.jsx
import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Drawer, List, ListItemButton, ListItemText, Box, ListSubheader } from '@mui/material';
import Logo from './Logo';

const drawerWidth = 260;
console.log("[DEBUG] Layout.jsx :: Module loaded, drawerWidth:", drawerWidth);

// Define UPDATED navigation structure (Added Upcoming Meetings)
const navSections = [
    {
        title: 'Meetings',
        items: [
            { text: 'Upcoming Meetings', path: '/upcoming-meetings' }, // <-- Added link
            { text: 'Create New Meeting', path: '/create-meeting' },
            // { text: 'Past Meetings', path: '/past-meetings' }, // Example if added later
        ]
    },
    {
        title: 'Leaderboard',
        items: [{ text: 'Class Leaderboard', path: '/leaderboard' },]
    },
    {
        title: 'Chat Analysis',
        items: [{ text: 'Upload Chat File', path: '/upload-chat' },]
    }
];
console.log("[DEBUG] Layout.jsx :: Defined navSections:", JSON.stringify(navSections));

export default function Layout({ children }) {
    console.log("[DEBUG] Layout.Layout :: Component rendering started.");
    const location = useLocation();
    console.log("[DEBUG] Layout.Layout :: useLocation hook executed. Current location:", location.pathname);

    useEffect(() => {
        console.log("[INFO] Layout.Layout :: Component mounted.");
        return () => {
            console.log("[INFO] Layout.Layout :: Component will unmount.");
        };
    }, []);

    console.log("[DEBUG] Layout.Layout :: Rendering Drawer.");
    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
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
                {console.log("[DEBUG] Layout.Layout :: Rendering Logo component inside Drawer.")}
                <Logo />
                <List sx={{ pt: 0 }}>
                    {console.log("[DEBUG] Layout.Layout :: Mapping navSections.")}
                    {navSections.map((section) => {
                        console.log(`[DEBUG] Layout.Layout :: Processing section: ${section.title}`);
                        return (
                            section.items.length > 0 && (
                                <React.Fragment key={section.title}>
                                    {console.log(`[DEBUG] Layout.Layout :: Rendering ListSubheader for section: ${section.title}`)}
                                    <ListSubheader disableSticky>
                                        {section.title}
                                    </ListSubheader>
                                    {console.log(`[DEBUG] Layout.Layout :: Mapping items for section: ${section.title}`)}
                                    {section.items.map((item) => {
                                        const isSelected = location.pathname === item.path;
                                        console.log(`[DEBUG] Layout.Layout :: Rendering ListItemButton for item: ${item.text}, path: ${item.path}, selected: ${isSelected}`);
                                        return (
                                            <ListItemButton
                                                key={item.text}
                                                component={NavLink}
                                                to={item.path}
                                                selected={isSelected}
                                                onClick={() => console.log(`[DEBUG] Layout.Layout :: Clicked navigation item: ${item.text}`)}
                                            >
                                                <ListItemText primary={item.text} />
                                            </ListItemButton>
                                        )
                                    })}
                                </React.Fragment>
                            )
                        )
                    })}
                    {console.log("[DEBUG] Layout.Layout :: Finished mapping navSections.")}
                </List>
            </Drawer>

            {console.log("[DEBUG] Layout.Layout :: Rendering main content Box.")}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: 'background.default',
                    p: { xs: 2, sm: 3, md: 4 },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    overflowY: 'auto',
                }}
            >
                {console.log("[DEBUG] Layout.Layout :: Rendering inner content wrapper Box.")}
                <Box sx={{
                    width: '100%',
                    maxWidth: '1200px',
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                }}>
                    {console.log("[DEBUG] Layout.Layout :: Rendering children components.")}
                    {children}
                    {console.log("[DEBUG] Layout.Layout :: Finished rendering children components.")}
                </Box>
            </Box>
            {console.log("[DEBUG] Layout.Layout :: Component rendering finished.")}
        </Box>
    );
}
