// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#0E71EB', // A Zoom-like blue - adjust as needed
        },
        secondary: {
            main: '#FFB800', // A secondary color, maybe for accents? Adjust.
        },
        background: {
            default: '#f8f9fa', // Light grey background for the page
            paper: '#ffffff',   // White background for elements like Drawer, Cards, Paper
        },
        text: {
            primary: '#212529', // Darker text
            secondary: '#6c757d', // Lighter text
        },
        grey: { // Add grey shades for borders, backgrounds etc.
            100: '#f8f9fa',
            200: '#e9ecef',
            300: '#dee2e6',
            // ... add more if needed
        }
    },
    typography: {
        fontFamily: '"Josefin Sans", sans-serif', // Use Josefin Sans
        h4: {
            fontWeight: 600, // Example: Make H4 bolder
        },
        // Add other typography adjustments if needed
    },
    components: {
        // Global overrides for components
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8, // Slightly rounded buttons
                    textTransform: 'none', // Prevent uppercase text
                    fontWeight: 600,
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8,
                        backgroundColor: '#f1f3f5', // Light grey background for inputs like target
                        '& fieldset': {
                            borderColor: 'transparent', // Hide default border
                        },
                        '&:hover fieldset': {
                            borderColor: '#adb5bd', // Show border on hover
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#0E71EB', // Primary color border when focused
                            borderWidth: '1px',
                        },
                    },
                    '& .MuiInputLabel-root': { // Style label
                        fontWeight: 500,
                    }
                }
            }
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    borderRight: 'none', // Remove the default border
                    backgroundColor: '#ffffff', // Ensure white background
                }
            }
        },
        MuiListItemButton: { // Style for sidebar links
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    margin: '4px 12px', // Add some margin
                    padding: '8px 16px',
                    '&.Mui-selected': {
                        backgroundColor: '#e7f1ff', // Light blue background for selected item
                        color: '#0E71EB', // Primary text color for selected item
                        '&:hover': {
                            backgroundColor: '#d0e4ff', // Slightly darker blue on hover when selected
                        },
                    },
                    '&:hover': {
                        backgroundColor: '#f1f3f5', // Light grey background on hover
                    }
                }
            }
        },
        MuiDataGrid: { // Basic DataGrid styling
            styleOverrides: {
                root: {
                    border: 'none',
                    backgroundColor: '#ffffff',
                    borderRadius: 8,
                },
                columnHeaders: {
                    backgroundColor: '#f8f9fa', // Light grey header
                    fontWeight: 'bold',
                },
                // cell: { // Optional: Add borders if needed
                //     borderBottom: '1px solid #e9ecef',
                // }
            }
        }
    }
});

export default theme;
