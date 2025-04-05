// src/components/Logo.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import logoImage from '../assets/zoomba-logo.png'; // Ensure path is correct

const Logo = () => (
    // Wrap in a non-interactive element for semantic correctness if it's not a link
    <Box sx={{ display: 'flex', alignItems: 'center', p: 2, mb: 1 }}>
        <Box
            component="img"
            src={logoImage}
            // IMPORTANT: Add meaningful alt text
            alt="ZoomBA Application Logo"
            sx={{ height: 40, mr: 1.5 }}
        />
        {/* Text part of the logo */}
        <Typography variant="h5" noWrap component="div" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Zoom<span style={{ color: '#212529' }}>BA</span>
        </Typography>
    </Box>
);

export default Logo;
