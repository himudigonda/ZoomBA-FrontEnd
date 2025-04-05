// src/components/Logo.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import logoImage from '../assets/zoomba-logo.png';

console.log("[DEBUG] Logo.jsx :: Module loaded.");

const Logo = () => {
    console.log("[DEBUG] Logo.Logo :: Component rendering started.");
    console.log("[DEBUG] Logo.Logo :: Using logo image path:", logoImage);

    console.log("[DEBUG] Logo.Logo :: Component rendering finished.");
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', p: 2, mb: 1 }}>
            {console.log("[DEBUG] Logo.Logo :: Rendering logo image.")}
            <Box
                component="img"
                src={logoImage}
                alt="ZoomBA Application Logo"
                sx={{ height: 40, mr: 1.5 }}
            />
            {console.log("[DEBUG] Logo.Logo :: Rendering logo text.")}
            <Typography variant="h5" noWrap component="div" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                Zoom<span style={{ color: '#212529' }}>BA</span>
            </Typography>
        </Box>
    );
};

export default Logo;
