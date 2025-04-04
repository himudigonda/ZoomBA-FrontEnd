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
            400: '#ced4da', // Added for icon/border use
            // ... add more if needed
        },
        error: { // Ensure error color is defined for remove buttons
            main: '#dc3545',
        }
    },
    typography: {
        fontFamily: '"Red Hat Display", sans-serif', // Use Red Hat Display
        h4: {
            fontWeight: 700, // Example: Make H4 bolder
        },
        h5: {
            fontWeight: 700,
        },
        h6: {
            fontWeight: 600,
        },
        button: { // Ensure buttons also use the font weight if needed
            fontWeight: 600,
        }
        // Add other typography adjustments if needed
    },
    components: {
        // Global overrides for components
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8, // Slightly rounded buttons
                    textTransform: 'none', // Prevent uppercase text
                    fontWeight: 600, // Ensure consistent button font weight
                    paddingTop: '8px', // Adjust padding for visual balance
                    paddingBottom: '8px',
                },
                sizeSmall: { // Specific padding for small buttons
                    padding: '4px 10px',
                },
                sizeLarge: { // Specific padding for large buttons
                    padding: '10px 22px',
                }
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
                        '& .MuiListItemText-primary': { // Make selected text bold
                            fontWeight: 600,
                        },
                        '&:hover': {
                            backgroundColor: '#d0e4ff', // Slightly darker blue on hover when selected
                        },
                    },
                    '&:hover': {
                        backgroundColor: '#f1f3f5', // Light grey background on hover
                    },
                    '& .MuiListItemText-primary': { // Default text weight
                        fontWeight: 500,
                    },
                }
            }
        },
        MuiDataGrid: { // Basic DataGrid styling
            styleOverrides: {
                root: {
                    border: 'none',
                    backgroundColor: '#ffffff',
                    borderRadius: 12, // Slightly more rounded corners for the grid container
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)', // Add subtle shadow
                },
                columnHeaders: {
                    backgroundColor: '#f8f9fa', // Light grey header
                    fontWeight: 'bold', // Handled by typography settings now
                    borderBottom: '1px solid #dee2e6', // Add separator line
                },
                columnHeaderTitle: {
                    fontWeight: 600, // Ensure header titles are bold
                    color: '#495057' // Slightly darker header text
                },
                cell: { // Add subtle bottom border to cells for separation
                    borderBottom: '1px solid #e9ecef',
                },
                footerContainer: { // Style footer
                    borderTop: '1px solid #dee2e6',
                }
                // Remove focus outline if desired
                // '& .MuiDataGrid-cell:focus': {
                //     outline: 'none',
                // },
                // '& .MuiDataGrid-cell:focus-within': {
                //     outline: 'none',
                // },
            }
        },
        MuiPaper: { // Default Paper styles (used by PollCard)
            styleOverrides: {
                root: {
                    backgroundColor: '#ffffff',
                },
                elevation0: { // Styles for Paper with elevation={0}
                    border: '1px solid #e9ecef', // Add subtle border
                    boxShadow: 'none', // Ensure no shadow if elevation is 0
                }
            }
        },
        MuiIconButton: { // Style IconButtons
            styleOverrides: {
                sizeSmall: { // Ensure small icon buttons are compact
                    padding: '4px'
                }
            }
        }
    }
});

export default theme;
