// src/screens/CreateMeeting.jsx
import { Box, TextField, Button, MenuItem, Typography, Stack, Paper } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EventIcon from '@mui/icons-material/Event'; // Icon for Date
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // Icon for Time

export default function CreateMeeting() {
    return (
        // Outer Box to center the Paper card within the available space
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', pt: 2 /* Add some padding top */ }}>
            <Paper
                elevation={0} // Use theme's border/shadow for elevation 0
                sx={{
                    p: { xs: 3, md: 4 }, // Responsive padding inside the card
                    width: '100%', // Take full width of parent
                    maxWidth: '800px', // Increase max width for a larger card
                    borderRadius: 3, // More pronounced border radius
                    // border: '1px solid', // Use border from theme or uncomment if needed
                    // borderColor: 'grey.200'
                }}
            >
                <Stack spacing={3.5}> {/* Increase spacing between elements */}
                    <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
                        Create New Meeting
                    </Typography>

                    <TextField
                        label="Meeting Name"
                        fullWidth
                        variant="outlined"
                        placeholder="e.g., Project Alpha Kick-off"
                    />

                    <TextField
                        label="Scheduled Date"
                        type="date"
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                    // Optional: Add icon - requires InputAdornment
                    // InputProps={{
                    //     endAdornment: (
                    //         <InputAdornment position="end">
                    //             <EventIcon color="action"/>
                    //         </InputAdornment>
                    //     ),
                    // }}
                    />

                    <TextField
                        label="Start Time"
                        type="time"
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                    // Optional: Add icon - requires InputAdornment
                    // InputProps={{
                    //     endAdornment: (
                    //         <InputAdornment position="end">
                    //             <AccessTimeIcon color="action"/>
                    //         </InputAdornment>
                    //     ),
                    // }}
                    />

                    <TextField
                        label="Duration"
                        select
                        fullWidth
                        variant="outlined"
                        defaultValue={30}
                        InputLabelProps={{ shrink: true }} // Keep shrink for select
                    // sx={{ '& .MuiSelect-select': { display: 'flex', alignItems: 'center' } }} // Align select text if needed
                    >
                        {[15, 30, 45, 60, 75, 90, 120].map((option) => ( // Added more options
                            <MenuItem key={option} value={option}>
                                {option} Minutes
                            </MenuItem>
                        ))}
                    </TextField>

                    <Box sx={{ pt: 2 }}> {/* Add padding top before button */}
                        <Button
                            variant="contained"
                            size="large"
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
