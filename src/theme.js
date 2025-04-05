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
    100: '#f8f9fa',
    200: '#e9ecef',
    300: '#dee2e6',
    400: '#ced4da',
    500: '#adb5bd',
    600: '#6c757d',
    700: '#495057',
    800: '#343a40',
    900: '#212529',
};

// Define a subtle box shadow for elevation 1
const shadow1 = '0px 2px 4px -1px rgba(0,0,0,0.06), 0px 4px 5px 0px rgba(0,0,0,0.04), 0px 1px 10px 0px rgba(0,0,0,0.03)';

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
        divider: GREY[200],
        error: {
            main: '#dc3545',
        },
        action: {
            hover: alpha(GREY[500], 0.08),
            selected: alpha(PRIMARY_COLOR, 0.08),
            disabledBackground: alpha(GREY[500], 0.1),
            disabled: alpha(GREY[500], 0.3),
            focus: alpha(PRIMARY_COLOR, 0.12), // Added for focus rings maybe
        }
    },
    typography: {
        fontFamily: '"Red Hat Display", sans-serif',
        htmlFontSize: 16,
        h4: { fontWeight: 700, fontSize: '1.75rem', lineHeight: 1.3 },
        h5: { fontWeight: 700, fontSize: '1.5rem', lineHeight: 1.3 },
        h6: { fontWeight: 600, fontSize: '1.25rem', lineHeight: 1.4 },
        subtitle1: { fontWeight: 500, fontSize: '1rem', lineHeight: 1.5 },
        subtitle2: { fontWeight: 500, fontSize: '0.875rem', lineHeight: 1.5 },
        body1: { fontWeight: 400, fontSize: '1rem', lineHeight: 1.6 },
        body2: { fontWeight: 400, fontSize: '0.875rem', lineHeight: 1.6 },
        button: {
            fontWeight: 600,
            fontSize: '0.9rem',
            textTransform: 'none',
        },
        caption: { fontWeight: 400, fontSize: '0.75rem', lineHeight: 1.5 },
        overline: { fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' },
    },
    shape: {
        borderRadius: 8,
    },
    // Define shadows for consistent use
    shadows: [
        'none', // 0
        shadow1, // 1 (our default subtle shadow)
        '0px 3px 5px -1px rgba(0,0,0,0.07), 0px 5px 8px 0px rgba(0,0,0,0.05), 0px 1px 14px 0px rgba(0,0,0,0.04)', // 2
        '0px 3px 6px -2px rgba(0,0,0,0.08), 0px 6px 10px 0px rgba(0,0,0,0.06), 0px 1px 18px 0px rgba(0,0,0,0.05)', // 3
        // ... add more if needed, copying MUI defaults or creating custom ones
        ...Array(21).fill(shadow1) // Fill remaining with default or customize
    ],
    components: {
        // --- Base and Transitions ---
        MuiButtonBase: {
            defaultProps: {
                disableRipple: false,
            },
            styleOverrides: {
                root: ({ theme }) => ({
                    transition: theme.transitions.create(['background-color', 'color', 'border-color', 'box-shadow', 'opacity'], { // Added opacity
                        duration: theme.transitions.duration.short,
                    }),
                }),
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: ({ theme }) => ({
                    transition: theme.transitions.create(['background-color', 'color']),
                    '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                    },
                }),
            }
        },
        // --- Button ---
        MuiButton: {
            defaultProps: {
                disableElevation: true,
            },
            styleOverrides: {
                root: ({ ownerState, theme }) => ({
                    borderRadius: theme.shape.borderRadius,
                    padding: '8px 22px',
                    ...(ownerState.variant === 'contained' && ownerState.color === 'primary' && {
                        '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.85),
                            boxShadow: 'none',
                        },
                    }),
                    ...(ownerState.variant === 'outlined' && {
                        borderWidth: '1px',
                        '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.08),
                        },
                    }),
                    ...(ownerState.variant === 'text' && {
                        '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.08),
                        },
                    }),
                    // Ensure disabled state has appropriate styles
                    '&.Mui-disabled': {
                        // Opacity is often handled by default, but can customize
                        // opacity: 0.5,
                        // Pointer events none is default
                    }
                }),
            },
        },
        // --- TextField ---
        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
                size: 'small',
            },
            styleOverrides: {
                root: ({ theme }) => ({
                    '& .MuiOutlinedInput-root': {
                        borderRadius: theme.shape.borderRadius,
                        backgroundColor: theme.palette.background.paper,
                        transition: theme.transitions.create(['border-color', 'box-shadow']),
                        '& fieldset': {
                            borderColor: theme.palette.grey[300],
                            borderWidth: '1px',
                            transition: theme.transitions.create(['border-color']), // Transition border color smoothly
                        },
                        '&:hover fieldset': {
                            borderColor: theme.palette.grey[400],
                        },
                        '&.Mui-focused': {
                            '& fieldset': {
                                borderColor: theme.palette.primary.main,
                                // Use box-shadow for focus ring instead of thicker border
                                // borderWidth: '1px', // Keep border width consistent
                                boxShadow: `0 0 0 1px ${theme.palette.primary.main}`,
                            },
                        },
                        '&.Mui-disabled': {
                            backgroundColor: theme.palette.grey[100],
                            opacity: 0.7, // Slightly dim disabled fields
                            '& fieldset': {
                                borderColor: theme.palette.grey[200],
                            }
                        },
                    },
                    '& .MuiInputLabel-root': {
                        fontWeight: 500,
                        color: theme.palette.text.secondary,
                        transition: theme.transitions.create(['color']), // Smooth label color transition
                        '&.Mui-focused': {
                            color: theme.palette.primary.main,
                        },
                        '&.Mui-disabled': {
                            color: theme.palette.grey[500],
                        }
                    },
                }),
            }
        },
        // --- List ---
        MuiListItemButton: {
            styleOverrides: {
                root: ({ theme }) => ({
                    borderRadius: theme.shape.borderRadius,
                    margin: '4px 12px',
                    padding: '8px 16px',
                    transition: theme.transitions.create(['background-color', 'color']),
                    '&:hover': {
                        backgroundColor: theme.palette.grey[100],
                        color: theme.palette.text.primary,
                    },
                    '&.Mui-selected': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                        '& .MuiListItemText-primary': {
                            fontWeight: 600,
                        },
                        '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.15),
                        },
                    },
                    '& .MuiListItemText-primary': {
                        fontWeight: 500,
                    },
                    // Focus visible style for keyboard navigation
                    '&.Mui-focusVisible': {
                        boxShadow: `inset 0 0 0 2px ${theme.palette.primary.main}`,
                        backgroundColor: theme.palette.action.hover, // Optional background
                    }
                }),
            }
        },
        MuiListSubheader: {
            styleOverrides: {
                root: ({ theme }) => ({
                    backgroundColor: 'transparent',
                    fontWeight: 700,
                    color: theme.palette.text.secondary,
                    textTransform: 'uppercase',
                    fontSize: '0.75rem',
                    lineHeight: 1.6,
                    padding: '16px 16px 8px 28px',
                    position: 'relative',
                }),
            }
        },
        // --- Paper & Divider ---
        MuiPaper: {
            defaultProps: {
                elevation: 0, // Use border by default
            },
            styleOverrides: {
                root: ({ theme }) => ({
                    backgroundColor: theme.palette.background.paper,
                    // Add transition for shadow changes if elevation is toggled
                    transition: theme.transitions.create(['box-shadow']),
                }),
                outlined: ({ theme }) => ({
                    border: `1px solid ${theme.palette.divider}`,
                }),
                // Use theme.shadows array for consistency
                elevation1: ({ theme }) => ({ boxShadow: theme.shadows[1] }),
                elevation2: ({ theme }) => ({ boxShadow: theme.shadows[2] }),
                // ... add more if needed
            }
        },
        MuiDivider: {
            styleOverrides: {
                root: ({ theme }) => ({
                    borderColor: theme.palette.divider,
                }),
            }
        },
        // --- DataGrid ---
        MuiDataGrid: {
            styleOverrides: {
                root: ({ theme }) => ({
                    // Base styles handled by Paper wrapper now
                }),
                columnHeaders: ({ theme }) => ({
                    backgroundColor: theme.palette.grey[100],
                    borderBottom: `1px solid ${theme.palette.divider}`,
                }),
                columnHeader: ({ theme }) => ({
                    '&:focus, &:focus-within': { outline: 'none' },
                    '& .MuiDataGrid-columnHeaderTitleContainer': { padding: '0 8px' }
                }),
                columnHeaderTitle: ({ theme }) => ({
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    color: theme.palette.text.primary,
                }),
                cell: ({ theme }) => ({
                    padding: '0 8px', // Keep cell padding consistent
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    '&:focus, &:focus-within': {
                        outline: 'none',
                        // Minimal focus indication on cell if needed
                        // backgroundColor: theme.palette.action.focus,
                    },
                }),
                footerContainer: ({ theme }) => ({
                    borderTop: `1px solid ${theme.palette.divider}`,
                    minHeight: '52px',
                }),
                sortIcon: ({ theme }) => ({ color: theme.palette.text.secondary }),
                menuIcon: ({ theme }) => ({ color: theme.palette.text.secondary }),
                // Style pagination elements if needed
                // MuiTablePagination: { ... }
            }
        },
        // --- Radio Button & Form Control Label ---
        MuiRadio: {
            styleOverrides: {
                root: ({ theme }) => ({
                    padding: '6px',
                    '&.Mui-focusVisible': { // Ensure focus visible style is clear
                        // Default usually okay, but can customize
                        // boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.3)}`,
                    }
                }),
            }
        },
        MuiFormControlLabel: {
            styleOverrides: {
                label: ({ theme }) => ({
                    // Usually inherits typography, adjust if needed
                }),
            }
        },
        // --- Tooltip ---
        MuiTooltip: {
            styleOverrides: {
                tooltip: ({ theme }) => ({ // Style the tooltip itself
                    backgroundColor: alpha(theme.palette.grey[800], 0.95), // Dark background
                    fontSize: '0.75rem',
                    padding: '4px 8px',
                    borderRadius: theme.shape.borderRadius / 2, // Slightly smaller radius
                }),
                arrow: ({ theme }) => ({ // Style the arrow
                    color: alpha(theme.palette.grey[800], 0.95),
                }),
            }
        },
    }
});

export default theme;
