import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#0066cc', // Zoom-like blue
        },
        secondary: {
            main: '#ff4081',
        },
    },
    typography: {
        fontFamily: 'Inter, sans-serif',
    },
});

export default theme;
