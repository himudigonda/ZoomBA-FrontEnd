// src/theme.js
import { createTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles'; // Import alpha for translucent colors

// Define base colors
const PRIMARY_COLOR = '#0E71EB'; // Zoom blue
const SECONDARY_COLOR = '#FFB800'; // Example secondary
const TEXT_PRIMARY = '#212529'; // Dark grey for main text
const TEXT_SECONDARY = '#6c757d'; // Medium grey for secondary text
const BACKGROUND_DEFAULT = '#f8f9fa'; // Light grey page background
const BACKGROUND_PAPER = '#ffffff'; // White for cards, drawers, etc.
const GREY = {
    100: '#f8f9fa', // Often same as background default
    200: '#e9ecef', // Light borders, dividers
    300: '#dee2e6', // Borders
    400: '#ced4da', // Input borders on hover
    500: '#adb5bd', // Medium grey elements/text
    600: '#6c757d', // Often same as text secondary
    700: '#495057', // Darker grey text/elements
    800: '#343a40', // Very dark grey
    900: '#212529', // Often same as text primary
};

const theme = createTheme({
    palette: {
        primary: {
            main: PRIMARY_COLOR,
        },
        secondary: {
            main: SECONDARY_COLOR,
        },
        background: {
            default: BACKGROUND_DEFAULT,
            paper: BACKGROUND_PAPER,
        },
        text: {
            primary: TEXT_PRIMARY,
            secondary: TEXT_SECONDARY,
        },
        grey: GREY,
        divider: GREY[200], // Use a light grey for dividers
        error: {
            main: '#dc3545', // Standard error red
        },
        // Optional: Define success, warning, info if needed
        // success: { main: '#28a745' },
        // warning: { main: '#ffc107' },
        // info: { main: '#17a2b8' },
    },
    typography: {
        fontFamily: '"Red Hat Display", sans-serif',
        htmlFontSize: 16, // Base font size
        h4: { fontWeight: 700, fontSize: '1.75rem' /* Example size */, lineHeight: 1.3 },
        h5: { fontWeight: 700, fontSize: '1.5rem', lineHeight: 1.3 },
        h6: { fontWeight: 600, fontSize: '1.25rem', lineHeight: 1.4 },
        subtitle1: { fontWeight: 500, fontSize: '1rem', lineHeight: 1.5 },
        subtitle2: { fontWeight: 500, fontSize: '0.875rem', lineHeight: 1.5 },
        body1: { fontWeight: 400, fontSize: '1rem', lineHeight: 1.6 }, // Standard body text
        body2: { fontWeight: 400, fontSize: '0.875rem', lineHeight: 1.6 }, // Smaller body text
        button: {
            fontWeight: 600,
            fontSize: '0.9rem', // Slightly smaller than body1
            textTransform: 'none', // Default override
        },
        caption: { fontWeight: 400, fontSize: '0.75rem', lineHeight: 1.5 },
        overline: { fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' },
    },
    shape: {
        borderRadius: 8, // Default border radius for most components
    },
    components: {
        // Add smooth transitions to relevant components
        MuiButtonBase: {
            defaultProps: {
                disableRipple: false, // Keep ripple unless specifically needed otherwise
            },
            styleOverrides: {
                root: ({ theme }) => ({
                    transition: theme.transitions.create(['background-color', 'color', 'border-color', 'box-shadow'], {
                        duration: theme.transitions.duration.short,
                    }),
                }),
            }
        },
        MuiButton: {
            defaultProps: {
                disableElevation: true, // Flatter look for contained buttons
            },
            styleOverrides: {
                root: ({ ownerState, theme }) => ({
                    borderRadius: theme.shape.borderRadius, // Use theme's border radius
                    padding: '8px 22px', // Default padding
                    // Hover effect for contained primary
                    ...(ownerState.variant === 'contained' && ownerState.color === 'primary' && {
                        '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.85), // Slightly darker/less opaque
                            boxShadow: 'none', // Keep flat on hover
                        },
                    }),
                    // Hover effect for outlined
                    ...(ownerState.variant === 'outlined' && {
                        borderWidth: '1px', // Ensure border width is consistent
                        '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.08), // Light primary background wash
                        },
                    }),
                    // Hover effect for text
                    ...(ownerState.variant === 'text' && {
                        '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.08), // Light primary background wash
                        },
                    }),
                }),
                // Adjust padding for different sizes if needed (optional, MUI defaults might be fine)
                // sizeSmall: { padding: '4px 10px' },
                // sizeLarge: { padding: '10px 24px' },
            },
        },
        MuiTextField: {
            defaultProps: {
                variant: 'outlined', // Default to outlined variant
                size: 'small', // Default to smaller size for tighter UI
            },
            styleOverrides: {
                root: ({ theme }) => ({
                    '& .MuiOutlinedInput-root': {
                        borderRadius: theme.shape.borderRadius,
                        backgroundColor: theme.palette.background.paper, // Use paper background (often white)
                        transition: theme.transitions.create(['border-color', 'box-shadow']), // Add transition
                        '& fieldset': {
                            borderColor: theme.palette.grey[300], // Default subtle border
                            borderWidth: '1px',
                        },
                        '&:hover fieldset': {
                            borderColor: theme.palette.grey[400], // Slightly darker border on hover
                        },
                        '&.Mui-focused': {
                            '& fieldset': {
                                borderColor: theme.palette.primary.main, // Primary color border when focused
                                // Optional: add subtle glow/shadow on focus
                                // boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`,
                            },
                            // Ensure background doesn't change drastically on focus unless intended
                            // backgroundColor: theme.palette.background.paper,
                        },
                        // Style for disabled state
                        '&.Mui-disabled': {
                            backgroundColor: theme.palette.grey[100],
                            '& fieldset': {
                                borderColor: theme.palette.grey[200],
                            }
                        },
                        // Remove background color from input itself if set by browser autofill etc.
                        // '& input:-webkit-autofill': {
                        //     WebkitBoxShadow: `0 0 0 100px ${theme.palette.background.paper} inset`,
                        //     borderRadius: theme.shape.borderRadius, // Ensure radius is kept on autofill
                        // },
                    },
                    // Input Label styles
                    '& .MuiInputLabel-root': {
                        fontWeight: 500,
                        color: theme.palette.text.secondary,
                        '&.Mui-focused': {
                            color: theme.palette.primary.main, // Match focused border color
                        },
                        '&.Mui-disabled': {
                            color: theme.palette.grey[500],
                        }
                    },
                    // Adjustments for 'small' size if needed (MUI defaults usually okay)
                    // '& .MuiInputBase-sizeSmall': { fontSize: '0.875rem' },
                    // '& .MuiInputLabel-sizeSmall': { fontSize: '0.875rem' },
                }),
            }
        },
        MuiListItemButton: {
            styleOverrides: {
                root: ({ theme }) => ({
                    borderRadius: theme.shape.borderRadius,
                    margin: '4px 12px',
                    padding: '8px 16px',
                    transition: theme.transitions.create(['background-color', 'color']),
                    '&:hover': {
                        backgroundColor: theme.palette.grey[100], // Subtle grey hover
                        color: theme.palette.text.primary,
                    },
                    '&.Mui-selected': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.1), // Light primary background wash
                        color: theme.palette.primary.main, // Primary text color
                        '& .MuiListItemText-primary': {
                            fontWeight: 600, // Bold text for selected item
                        },
                        '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.15), // Slightly darker wash on hover when selected
                        },
                    },
                    '& .MuiListItemText-primary': {
                        fontWeight: 500, // Default weight for non-selected items
                    },
                }),
            }
        },
        MuiListSubheader: {
            styleOverrides: {
                root: ({ theme }) => ({
                    backgroundColor: 'transparent', // Ensure transparent background
                    fontWeight: 700,
                    color: theme.palette.text.secondary,
                    textTransform: 'uppercase',
                    fontSize: '0.75rem',
                    lineHeight: 1.6,
                    padding: '16px 16px 8px 28px', // Adjust padding L/R to align with items+margin
                    position: 'relative', // Keep relative positioning if needed by MUI
                }),
            }
        },
        MuiPaper: { // Default Paper styles
            styleOverrides: {
                root: {
                    backgroundColor: BACKGROUND_PAPER,
                },
                outlined: ({ theme }) => ({ // Style for variant="outlined"
                    border: `1px solid ${theme.palette.divider}`,
                }),
                elevation0: ({ theme }) => ({ // Style for elevation={0} (used in CreateMeeting card)
                    border: `1px solid ${theme.palette.divider}`, // Add border if no shadow
                }),
                elevation1: { // Default shadow if elevation is used
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)', // Softer shadow
                },
                // Add more elevation styles if needed
            }
        },
        MuiDivider: {
            styleOverrides: {
                root: ({ theme }) => ({
                    borderColor: theme.palette.divider, // Use theme divider color
                }),
            }
        },
        // Optional: Customize scrollbars for a more integrated look
        // MuiCssBaseline: {
        //     styleOverrides: {
        //         body: {
        //             scrollbarColor: `${GREY[400]} ${GREY[200]}`,
        //             '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
        //                 backgroundColor: GREY[100],
        //                 width: '8px',
        //                 height: '8px',
        //             },
        //             '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
        //                 borderRadius: 8,
        //                 backgroundColor: GREY[400],
        //                 minHeight: 24,
        //                 border: `2px solid ${GREY[100]}`,
        //             },
        //             '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
        //                 backgroundColor: GREY[500],
        //             },
        //             '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
        //                 backgroundColor: GREY[500],
        //             },
        //             '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
        //                 backgroundColor: GREY[500],
        //             },
        //             '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
        //                 backgroundColor: GREY[100],
        //             },
        //         },
        //     },
        // },
    }
});

export default theme;
