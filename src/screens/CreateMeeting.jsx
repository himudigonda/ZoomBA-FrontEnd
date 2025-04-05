// src/screens/CreateMeeting.jsx
import { Box, TextField, Button, MenuItem, Typography, Stack, Paper } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// Icons removed for cleaner look, can be added back with InputAdornment if desired

export default function CreateMeeting() {
    return (
        // Outer Box remains for centering within the Layout's max-width container
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', pt: { xs: 2, md: 4 } /* Responsive padding top */ }}>
            <Paper
                variant="outlined" // Use outlined variant for consistent border
                sx={{
                    p: { xs: 3, md: 4 }, // Responsive padding inside the card
                    width: '100%',
                    maxWidth: '750px', // Slightly adjusted max width
                    borderRadius: 3, // Use theme shape or specify (e.g., '12px' for consistency with leaderboard)
                    // Border handled by variant="outlined" based on theme.palette.divider
                    // boxShadow: (theme) => theme.shadows[1], // Optional: Add subtle shadow from theme if not outlined
                }}
            >
                <Stack spacing={3}> {/* Consistent spacing */}
                    <Typography variant="h5" sx={{ mb: 1, fontWeight: 700 /* Use theme weight */ }}>
                        Create New Meeting
                    </Typography>

                    <TextField
                        label="Meeting Name"
                        fullWidth
                        // variant="outlined" // Default from theme
                        placeholder="e.g., Project Alpha Kick-off"
                    // size="small" // Default from theme
                    />

                    <TextField
                        label="Scheduled Date"
                        type="date"
                        fullWidth
                        // variant="outlined" // Default from theme
                        InputLabelProps={{ shrink: true }}
                    // size="small" // Default from theme
                    />

                    <TextField
                        label="Start Time"
                        type="time"
                        fullWidth
                        // variant="outlined" // Default from theme
                        InputLabelProps={{ shrink: true }}
                    // size="small" // Default from theme
                    />

                    <TextField
                        label="Duration"
                        select
                        fullWidth
                        // variant="outlined" // Default from theme
                        defaultValue={30}
                        InputLabelProps={{ shrink: true }}
                    // size="small" // Default from theme
                    >
                        {[15, 30, 45, 60, 75, 90, 120].map((option) => (
                            <MenuItem key={option} value={option}>
                                {option} Minutes
                            </MenuItem>
                        ))}
                    </TextField>

                    <Box sx={{ pt: 2 }}> {/* Keep padding before button */}
                        <Button
                            variant="contained"
                            // size="large" // Use default size or theme override
                            endIcon={<ArrowForwardIcon />}
                        >
                            Schedule Meeting
                        </Button>
                    </Box>
                </Stack>
            </Paper>
        </Box>
    );
}
