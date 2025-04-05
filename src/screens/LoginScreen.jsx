// src/screens/LoginScreen.jsx
import React, { useEffect } from 'react';
import { Box, Button, Typography, Stack, Link } from '@mui/material';
import logoImage from '../assets/zoomba-logo.png'; // Main text logo
import zoomIcon from '../assets/zoom-icon.png'; // The graduation cap icon <-- MAKE SURE THIS PATH IS CORRECT

console.log("[DEBUG] LoginScreen.jsx :: Module loaded.");

export default function LoginScreen() {
    console.log("[DEBUG] LoginScreen.LoginScreen :: Component rendering started.");

    useEffect(() => {
        console.log("[INFO] LoginScreen.LoginScreen :: Component mounted.");
        return () => {
            console.log("[INFO] LoginScreen.LoginScreen :: Component will unmount.");
        };
    }, []);

    const handleLoginClick = () => {
        const redirectUrl = 'https://vital-bluegill-deadly.ngrok-free.app'; // Temporary redirect URL
        console.log(`[INFO] LoginScreen.handleLoginClick :: Login button clicked. Redirecting to: ${redirectUrl}`);
        window.location.href = redirectUrl; // Perform the redirect
    };

    console.log("[DEBUG] LoginScreen.LoginScreen :: Rendering component structure.");
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                bgcolor: 'background.default',
                p: 3,
            }}
        >
            {/* Use a Stack for vertical arrangement, control spacing with margins */}
            <Stack spacing={0} alignItems="center" sx={{ maxWidth: '400px', textAlign: 'center' }}>

                {/* 1. ZoomBA Logo */}
                {console.log("[DEBUG] LoginScreen.LoginScreen :: Rendering ZoomBA Logo.")}
                <Box
                    component="img"
                    src={logoImage}
                    alt="ZoomBA Logo"
                    sx={{
                        height: { xs: 250, sm: 250 }, // Make logo larger
                        width: 'auto', // Maintain aspect ratio
                        mb: 0.5, // Small margin below logo
                    }}
                />

                {/* 2. Tagline */}
                {console.log("[DEBUG] LoginScreen.LoginScreen :: Rendering Tagline.")}
                <Typography variant="body2" color="text.secondary" sx={{ mb: 6 }}> {/* Increased margin below tagline */}
                    Zoom Beyond Attendance
                </Typography>

                {/* 3. Zoom Icon */}
                {console.log("[DEBUG] LoginScreen.LoginScreen :: Rendering Zoom Icon.")}
                {/* <Box
                    component="img"
                    src={zoomIcon} // Use the specific icon
                    alt="Zoom Icon"
                    sx={{
                        height: 80, // Keep size
                        width: 80,
                        borderRadius: '15px', // Keep rounding
                        boxShadow: 3,
                        mb: 3, // Margin below icon
                    }}
                /> */}

                {/* 4. Sign in Text */}
                {console.log("[DEBUG] LoginScreen.LoginScreen :: Rendering Sign in text.")}
                <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary', mb: 3 }}> {/* Margin below text */}
                    Sign in to your Zoom account
                </Typography>

                {/* 5. Sign in Button */}
                {console.log("[DEBUG] LoginScreen.LoginScreen :: Rendering Sign in Button.")}
                <Button
                    variant="contained"
                    onClick={handleLoginClick}
                    sx={{
                        bgcolor: '#000',
                        color: '#fff',
                        '&:hover': {
                            bgcolor: '#333',
                        },
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 500,
                        py: 1.2,
                        px: 4,
                        borderRadius: '8px',
                        width: '100%',
                        mb: 2, // Margin below button
                    }}
                >
                    Sign in with Zoom.com
                </Button>

                {/* 6. Terms and Privacy */}
                {console.log("[DEBUG] LoginScreen.LoginScreen :: Rendering Terms and Privacy text.")}
                <Typography variant="caption" color="text.secondary">
                    By clicking continue, you agree to our{' '}
                    <Link href="#" underline="hover" color="inherit">
                        Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="#" underline="hover" color="inherit">
                        Privacy Policy
                    </Link>
                </Typography>
            </Stack>
            {console.log("[DEBUG] LoginScreen.LoginScreen :: Component rendering finished.")}
        </Box>
    );
}
