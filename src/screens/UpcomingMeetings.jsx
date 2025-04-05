// src/screens/UpcomingMeetings.jsx
import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, List, ListItem, ListItemText, ListItemIcon, Divider, IconButton, Tooltip, CircularProgress } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // Keep if potentially needed later
import VideocamIcon from '@mui/icons-material/Videocam';

console.log("[DEBUG] UpcomingMeetings.jsx :: Module loaded.");

// --- Placeholder Data ---
const placeholderMeetings = [
    { id: 'm1', name: 'Project Phoenix - Standup', date: '2024-05-10', time: '09:00 AM', duration: '30 mins' },
    { id: 'm2', name: 'Client Demo - Phase 1', date: '2024-05-10', time: '02:00 PM', duration: '1 hour' },
    { id: 'm3', name: 'Team Brainstorming Session', date: '2024-05-13', time: '11:00 AM', duration: '1.5 hours' },
    { id: 'm4', name: 'Marketing Strategy Review', date: '2024-05-15', time: '04:00 PM', duration: '45 mins' },
    { id: 'm5', name: 'All-Hands Meeting', date: '2024-05-17', time: '10:00 AM', duration: '1 hour' },
];
console.log("[DEBUG] UpcomingMeetings.jsx :: Placeholder meeting data defined:", placeholderMeetings.length, "meetings");


export default function UpcomingMeetings() {
    console.log("[DEBUG] UpcomingMeetings.UpcomingMeetings :: Component rendering started.");
    const [meetings, setMeetings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log("[INFO] UpcomingMeetings.UpcomingMeetings :: Component mounted.");
        console.log("[DEBUG] UpcomingMeetings.UpcomingMeetings.useEffect :: Simulating API call to fetch meetings.");
        const timer = setTimeout(() => {
            console.log("[DEBUG] UpcomingMeetings.UpcomingMeetings.useEffect :: Simulated fetch complete. Setting meetings data.");
            setMeetings(placeholderMeetings);
            setIsLoading(false);
        }, 750);

        return () => {
            console.log("[INFO] UpcomingMeetings.UpcomingMeetings :: Component will unmount.");
            clearTimeout(timer);
            console.log("[DEBUG] UpcomingMeetings.UpcomingMeetings.useEffect :: Cleanup: Cleared simulation timer.");
        };
    }, []);

    const handleJoinMeeting = (meetingId, meetingName) => {
        console.log(`[INFO] UpcomingMeetings.handleJoinMeeting :: Join button clicked for meeting: ${meetingName} (ID: ${meetingId})`);
        alert(`Placeholder: Joining meeting "${meetingName}"...`);
    };

    console.log("[DEBUG] UpcomingMeetings.UpcomingMeetings :: Rendering component structure.");
    // Placed log just before return for correct execution indication
    console.log("[DEBUG] UpcomingMeetings.UpcomingMeetings :: Component rendering finished. Returning JSX.");
    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
            {console.log("[DEBUG] UpcomingMeetings.UpcomingMeetings :: Rendering title.")}
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Upcoming Meetings
            </Typography>

            {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 5 }}>
                    {console.log("[DEBUG] UpcomingMeetings.UpcomingMeetings :: Rendering loading indicator.")}
                    <CircularProgress />
                </Box>
            ) : meetings.length === 0 ? (
                <Paper elevation={1} sx={{ p: 3, textAlign: 'center', border: (theme) => `1px solid ${theme.palette.divider}` }}>
                    {console.log("[DEBUG] UpcomingMeetings.UpcomingMeetings :: Rendering 'No Meetings' message.")}
                    <EventIcon sx={{ fontSize: 50, color: 'grey.400', mb: 1 }} />
                    <Typography variant="h6" color="text.secondary">No upcoming meetings scheduled.</Typography>
                </Paper>
            ) : (
                <Paper elevation={1} sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }}>
                    {console.log(`[DEBUG] UpcomingMeetings.UpcomingMeetings :: Rendering meetings list with ${meetings.length} items.`)}
                    <List disablePadding>
                        {meetings.map((meeting, index) => {
                            console.log(`[DEBUG] UpcomingMeetings.UpcomingMeetings :: Rendering ListItem for meeting: ${meeting.name} (ID: ${meeting.id})`);
                            return (
                                <React.Fragment key={meeting.id}>
                                    <ListItem
                                        sx={{ py: 1.5 }}
                                        secondaryAction={ // Modified secondaryAction
                                            <Tooltip title="Join Meeting" arrow>
                                                <IconButton
                                                    edge="end"
                                                    aria-label={`Join meeting ${meeting.name}`}
                                                    onClick={() => handleJoinMeeting(meeting.id, meeting.name)}
                                                    size="small"
                                                    color="primary"
                                                >
                                                    <VideocamIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        }
                                    >
                                        <ListItemIcon sx={{ minWidth: 40 }}>
                                            {console.log(`[DEBUG] UpcomingMeetings.UpcomingMeetings :: Rendering icon for meeting: ${meeting.id}`)}
                                            <EventIcon color="action" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={
                                                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                    {meeting.name}
                                                </Typography>
                                            }
                                            secondary={
                                                <Typography variant="body2" color="text.secondary">
                                                    {meeting.date} at {meeting.time} ({meeting.duration})
                                                </Typography>
                                            }
                                        />
                                    </ListItem>
                                    {index < meetings.length - 1 && <Divider component="li" variant="inset" />}
                                    {console.log(`[DEBUG] UpcomingMeetings.UpcomingMeetings :: Finished rendering ListItem for meeting: ${meeting.id}`)}
                                </React.Fragment>
                            );
                        })}
                    </List>
                </Paper>
            )}
        </Box>
    );
}
