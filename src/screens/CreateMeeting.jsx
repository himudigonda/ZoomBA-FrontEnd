// src/screens/CreateMeeting.jsx
import { Box, TextField, Button, MenuItem, Typography, Stack } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; // Import arrow icon

export default function CreateMeeting() {
    return (
        <Box sx={{ maxWidth: 600, p: 3, backgroundColor: 'background.paper', borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            {/* Title is handled by Layout/Route structure, or add Typography here if needed */}
            {/* <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
                 Create New Meeting // Optional title within the card
             </Typography> */}

            <Stack spacing={2.5}> {/* Use Stack for easy spacing */}
                <TextField
                    label="Meeting Name"
                    fullWidth
                    variant="outlined" // Use outlined variant (styled in theme)
                    // InputLabelProps={{ shrink: true }} // Only needed for type date/time usually
                    placeholder="e.g., Weekly Sync" // Add placeholder
                />

                <TextField
                    label="Scheduled Date" // Changed label
                    type="date"
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                />

                <TextField
                    label="Start Time"
                    type="time"
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                />

                <TextField
                    label="Duration"
                    select
                    fullWidth
                    variant="outlined"
                    defaultValue={30}
                    InputLabelProps={{ shrink: true }} // Keep shrink for select
                >
                    {[15, 30, 45, 60, 75, 90].map((option) => ( // Added more options
                        <MenuItem key={option} value={option}>
                            {option} Minutes
                        </MenuItem>
                    ))}
                </TextField>

                <Box sx={{ pt: 1 }}> {/* Add padding top before button */}
                    <Button
                        variant="contained"
                        size="large"
                        endIcon={<ArrowForwardIcon />} // Add end icon
                        sx={{ /* Styling handled by theme, add specific overrides here if needed */ }}
                    >
                        Schedule Meeting
                    </Button>
                </Box>
            </Stack>
        </Box>
    );
}
