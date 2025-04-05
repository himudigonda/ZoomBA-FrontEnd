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
        action: { // Define action colors for hover states etc.
            hover: alpha(GREY[500], 0.08), // Light grey background on hover for icon buttons etc.
            selected: alpha(PRIMARY_COLOR, 0.08),
            disabledBackground: alpha(GREY[500], 0.1),
            disabled: alpha(GREY[500], 0.3),
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
    components: {
        // --- Base and Transitions ---
        MuiButtonBase: {
            defaultProps: {
                disableRipple: false,
            },
            styleOverrides: {
                root: ({ theme }) => ({
                    transition: theme.transitions.create(['background-color', 'color', 'border-color', 'box-shadow'], {
                        duration: theme.transitions.duration.short,
                    }),
                }),
            }
        },
        MuiIconButton: { // Add hover effect for IconButtons
            styleOverrides: {
                root: ({ theme }) => ({
                    transition: theme.transitions.create(['background-color', 'color']),
                    '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                    },
                }),
                // Example: specific color hover if needed
                // colorPrimary: ({ theme }) => ({
                //     '&:hover': {
                //         backgroundColor: alpha(theme.palette.primary.main, 0.08),
                //     },
                // }),
                // colorError: ({ theme }) => ({
                //      '&:hover': {
                //          backgroundColor: alpha(theme.palette.error.main, 0.08),
                //      },
                //  }),
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
                        },
                        '&:hover fieldset': {
                            borderColor: theme.palette.grey[400],
                        },
                        '&.Mui-focused': {
                            '& fieldset': {
                                borderColor: theme.palette.primary.main,
                                // Subtle glow on focus
                                boxShadow: `0 0 0 1px ${theme.palette.primary.main}`,
                            },
                        },
                        '&.Mui-disabled': {
                            backgroundColor: theme.palette.grey[100],
                            '& fieldset': {
                                borderColor: theme.palette.grey[200],
                            }
                        },
                    },
                    '& .MuiInputLabel-root': {
                        fontWeight: 500,
                        color: theme.palette.text.secondary,
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
                elevation: 0, // Default to no elevation, rely on border or explicit elevation prop
            },
            styleOverrides: {
                root: ({ theme }) => ({
                    backgroundColor: theme.palette.background.paper,
                }),
                outlined: ({ theme }) => ({
                    border: `1px solid ${theme.palette.divider}`,
                }),
                // Keep elevation styles for cases where elevation prop is used
                elevation1: { boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }, // Slightly softer shadow
                elevation2: { boxShadow: '0 2px 5px rgba(0,0,0,0.1)' },
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
                root: ({ theme }) => ({ // Style the root container if needed (usually handled by Paper wrapper)
                    // border: 'none', // Ensure no double borders if wrapped in Paper
                    // backgroundColor: theme.palette.background.paper,
                }),
                columnHeaders: ({ theme }) => ({ // Style column headers container
                    backgroundColor: theme.palette.grey[100], // Slightly off-white background
                    borderBottom: `1px solid ${theme.palette.divider}`,
                }),
                columnHeader: ({ theme }) => ({ // Style individual column header cell
                    '&:focus, &:focus-within': {
                        outline: 'none', // Remove focus outline on header cells
                    },
                    // Ensure text style is applied correctly
                    '& .MuiDataGrid-columnHeaderTitleContainer': {
                        padding: '0 8px', // Adjust padding if needed
                    }
                }),
                columnHeaderTitle: ({ theme }) => ({ // Style the text within the header
                    fontWeight: 600,
                    fontSize: '0.875rem', // Slightly larger/bolder than body2
                    color: theme.palette.text.primary, // Use primary text color for headers
                }),
                cell: ({ theme }) => ({ // Style data cells
                    padding: '0 8px', // Adjust padding if needed
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    '&:focus, &:focus-within': {
                        outline: 'none', // Remove default focus outline on cells
                        // Optional: add subtle background on focus/selection if needed
                        // backgroundColor: alpha(theme.palette.primary.main, 0.05),
                    },
                }),
                footerContainer: ({ theme }) => ({ // Style footer area
                    borderTop: `1px solid ${theme.palette.divider}`,
                    minHeight: '52px', // Ensure consistent height
                }),
                // Add other DataGrid element styles as needed (e.g., icons)
                sortIcon: ({ theme }) => ({
                    color: theme.palette.text.secondary,
                }),
                menuIcon: ({ theme }) => ({
                    color: theme.palette.text.secondary,
                }),
            }
        },
        // --- Radio Button & Form Control Label ---
        MuiRadio: {
            styleOverrides: {
                root: ({ theme }) => ({ // Style the base radio element
                    padding: '6px', // Adjust padding around the radio icon
                    '&.Mui-checked': { // Style when checked
                        // color: theme.palette.primary.main, // Color already applies from theme
                    }
                }),
            }
        },
        MuiFormControlLabel: {
            styleOverrides: {
                label: ({ theme }) => ({ // Style the label part of the FormControlLabel
                    // Ensure label typography matches body text or intended style
                    // fontSize: theme.typography.body2.fontSize,
                    // color: theme.palette.text.primary,
                    // If the label is a TextField (like in CreatePoll), its own styles will apply primarily
                }),
            }
        },
        // --- Scrollbars (Optional, uncomment if desired) ---
        // MuiCssBaseline: {
        //     styleOverrides: { ... scrollbar styles from Phase 1 ... }
        // },
    }
});

export default theme;
