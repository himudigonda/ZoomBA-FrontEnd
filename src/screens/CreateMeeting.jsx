import { Box, TextField, Button, MenuItem, Typography } from '@mui/material';

export default function CreateMeeting() {
    return (
        <Box sx={{ maxWidth: 500 }}>
            <Typography variant="h4" gutterBottom>
                Create New Meeting
            </Typography>

            <TextField
                label="Meeting Name"
                fullWidth
                margin="normal"
            />

            <TextField
                label="Date"
                type="date"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
            />

            <TextField
                label="Start Time"
                type="time"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
            />

            <TextField
                label="Duration"
                select
                fullWidth
                margin="normal"
                defaultValue={30}
            >
                {[15, 30, 45, 60].map((option) => (
                    <MenuItem key={option} value={option}>
                        {option} Minutes
                    </MenuItem>
                ))}
            </TextField>

            <Button
                variant="contained"
                size="large"
                sx={{ mt: 2 }}
            >
                Schedule Meeting
            </Button>
        </Box>
    );
}
