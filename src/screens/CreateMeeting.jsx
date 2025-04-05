// src/screens/CreateMeeting.jsx
import React, { useEffect } from 'react'; // Added useEffect for mount log
import { Box, TextField, Button, MenuItem, Typography, Stack, Paper } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

console.log("[DEBUG] CreateMeeting.jsx :: Module loaded.");

export default function CreateMeeting() {
    console.log("[DEBUG] CreateMeeting.CreateMeeting :: Component rendering started.");

    useEffect(() => {
        console.log("[INFO] CreateMeeting.CreateMeeting :: Component mounted.");
        return () => {
            console.log("[INFO] CreateMeeting.CreateMeeting :: Component will unmount.");
        };
    }, []);

    const handleScheduleClick = () => {
        // In a real app, you'd gather form data here
        console.log("[DEBUG] CreateMeeting.handleScheduleClick :: Schedule Meeting button clicked.");
        // Add logic to actually schedule the meeting
        alert("Schedule Meeting button clicked (implement logic here)!");
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        console.log(`[DEBUG] CreateMeeting.handleInputChange :: Input changed - Name: ${name}, Value: ${value}`);
        // Add state management here if needed
    };

    console.log("[DEBUG] CreateMeeting.CreateMeeting :: Rendering Paper container.");
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', pt: { xs: 2, md: 4 } }}>
            <Paper
                elevation={1}
                sx={{
                    p: { xs: 3, md: 4 },
                    width: '100%',
                    maxWidth: '750px',
                    borderRadius: '12px',
                    border: 'none',
                }}
            >
                <Stack spacing={3}>
                    {console.log("[DEBUG] CreateMeeting.CreateMeeting :: Rendering title.")}
                    <Typography variant="h5" sx={{ mb: 1, fontWeight: 700 }}>
                        Create New Meeting
                    </Typography>

                    {console.log("[DEBUG] CreateMeeting.CreateMeeting :: Rendering Meeting Name TextField.")}
                    <TextField
                        name="meetingName" // Added name for logging
                        label="Meeting Name"
                        fullWidth
                        placeholder="e.g., Project Alpha Kick-off"
                        onChange={handleInputChange} // Added onChange
                    />

                    {console.log("[DEBUG] CreateMeeting.CreateMeeting :: Rendering Scheduled Date TextField.")}
                    <TextField
                        name="scheduledDate" // Added name for logging
                        label="Scheduled Date"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ 'aria-label': 'Scheduled Meeting Date' }}
                        onChange={handleInputChange} // Added onChange
                    />

                    {console.log("[DEBUG] CreateMeeting.CreateMeeting :: Rendering Start Time TextField.")}
                    <TextField
                        name="startTime" // Added name for logging
                        label="Start Time"
                        type="time"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ 'aria-label': 'Scheduled Meeting Start Time' }}
                        onChange={handleInputChange} // Added onChange
                    />

                    {console.log("[DEBUG] CreateMeeting.CreateMeeting :: Rendering Duration Select.")}
                    <TextField
                        name="duration" // Added name for logging
                        label="Duration"
                        select
                        fullWidth
                        defaultValue={30}
                        InputLabelProps={{ shrink: true }}
                        SelectProps={{ 'aria-label': 'Meeting Duration' }}
                        onChange={handleInputChange} // Added onChange for Select
                    >
                        {[15, 30, 45, 60, 75, 90, 120].map((option) => {
                            console.log(`[DEBUG] CreateMeeting.CreateMeeting :: Rendering Duration MenuItem: ${option}`);
                            return (
                                <MenuItem key={option} value={option}>
                                    {option} Minutes
                                </MenuItem>
                            );
                        })}
                    </TextField>

                    <Box sx={{ pt: 2 }}>
                        {console.log("[DEBUG] CreateMeeting.CreateMeeting :: Rendering Schedule Meeting Button.")}
                        <Button
                            variant="contained"
                            endIcon={<ArrowForwardIcon />}
                            onClick={handleScheduleClick} // Added onClick handler
                        >
                            Schedule Meeting
                        </Button>
                    </Box>
                </Stack>
            </Paper>
            {console.log("[DEBUG] CreateMeeting.CreateMeeting :: Component rendering finished.")}
        </Box>
    );
}
