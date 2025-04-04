// src/components/Logo.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import logoImage from '../assets/zoomba-logo.png'; // Adjust path/name as needed

const Logo = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', p: 2, mb: 1 }}>
        <Box component="img" src={logoImage} alt="ZoomBA Logo" sx={{ height: 40, mr: 1.5 }} />
        <Typography variant="h5" noWrap component="div" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Zoom<span style={{ color: '#212529' }}>BA</span>
        </Typography>
    </Box>
);

export default Logo;
