// src/screens/CreateMeeting.jsx
// NO CHANGES FROM PHASE 2 - Relying on Theme Overrides

import { Box, TextField, Button, MenuItem, Typography, Stack, Paper } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function CreateMeeting() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', pt: { xs: 2, md: 4 } }}>
            <Paper
                variant="outlined"
                sx={{
                    p: { xs: 3, md: 4 },
                    width: '100%',
                    maxWidth: '750px',
                    borderRadius: 3, // e.g., 12px
                }}
            >
                <Stack spacing={3}>
                    <Typography variant="h5" sx={{ mb: 1, fontWeight: 700 }}>
                        Create New Meeting
                    </Typography>

                    <TextField
                        label="Meeting Name"
                        fullWidth
                        placeholder="e.g., Project Alpha Kick-off"
                    />

                    <TextField
                        label="Scheduled Date"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                    />

                    <TextField
                        label="Start Time"
                        type="time"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                    />

                    <TextField
                        label="Duration"
                        select
                        fullWidth
                        defaultValue={30}
                        InputLabelProps={{ shrink: true }}
                    >
                        {[15, 30, 45, 60, 75, 90, 120].map((option) => (
                            <MenuItem key={option} value={option}>
                                {option} Minutes
                            </MenuItem>
                        ))}
                    </TextField>

                    <Box sx={{ pt: 2 }}>
                        <Button
                            variant="contained"
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
