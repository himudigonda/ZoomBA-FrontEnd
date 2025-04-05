// src/screens/Leaderboard.jsx
import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, TextField, InputAdornment, IconButton, Button, Stack, Paper, Tooltip } from '@mui/material'; // Added Tooltip
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// Helper function
const getOrdinal = (n) => { /* ... same as before ... */ const suffixes = ['th', 'st', 'nd', 'rd']; const v = n % 100; return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]); };

// Columns definition
const columns = [
    { field: 'position', headerName: 'Position', width: 80, type: 'number', align: 'center', headerAlign: 'center', renderCell: (params) => (<Typography variant="body2" fontWeight="medium">{getOrdinal(params.value)}</Typography>), },
    { field: 'student', headerName: 'Student', width: 250, renderCell: (params) => (<Typography variant="body2" fontWeight="medium">{params.value}</Typography>) },
    { field: 'points', headerName: 'Points', width: 100, type: 'number', headerAlign: 'left', align: 'left', },
    { field: 'pollScore', headerName: 'Poll Score', width: 130, headerAlign: 'center', align: 'center' },
    { field: 'timeAttended', headerName: 'Time Attended', width: 150, headerAlign: 'center', align: 'center' },
    { field: 'questionsAsked', headerName: '#Questions Asked', width: 160, type: 'number', headerAlign: 'center', align: 'center' },
    {
        field: 'actions', headerName: '', width: 60, sortable: false, filterable: false, disableColumnMenu: true,
        renderCell: (params) => (
            <Tooltip title="More actions" arrow>
                {/* Add aria-label for accessibility */}
                <IconButton aria-label={`Actions for ${params.row.student}`} size="small" onClick={() => console.log('Actions for', params.row.student)}>
                    <MoreVertIcon fontSize="small" />
                </IconButton>
            </Tooltip>
        ),
        headerAlign: 'center', align: 'center',
    }
];

// Sample data
const rows = [ /* ... same as before ... */
    { id: 1, position: 1, points: 1013, student: 'Mihir Ashish Thakur', pollScore: '5/5', timeAttended: '1:03:30', questionsAsked: 2 }, { id: 2, position: 2, points: 998, student: 'Yeshwanth Karra', pollScore: '5/5', timeAttended: '1:02:13', questionsAsked: 3 }, { id: 3, position: 3, points: 995, student: 'Himansh Mudigonda', pollScore: '5/5', timeAttended: '0:59:53', questionsAsked: 2 }, { id: 4, position: 4, points: 977, student: 'Tanmay Parulekar', pollScore: '5/5', timeAttended: '0:54:34', questionsAsked: 1 }, { id: 5, position: 5, points: 974, student: 'Swapneel Paranjpe', pollScore: '4.5/5', timeAttended: '1:01:32', questionsAsked: 1 }, { id: 6, position: 6, points: 956, student: 'Riddhi Amale', pollScore: '4/5', timeAttended: '1:02:15', questionsAsked: 0 }, { id: 7, position: 7, points: 944, student: 'Maanav Bhavsar', pollScore: '4.5/5', timeAttended: '0:58:52', questionsAsked: 0 }, { id: 8, position: 8, points: 922, student: 'Sarthak Garg', pollScore: '4/5', timeAttended: '1:01:03', questionsAsked: 0 }, { id: 9, position: 9, points: 901, student: 'Praneeth Palle', pollScore: '3.5/5', timeAttended: '1:01:55', questionsAsked: 0 }, { id: 10, position: 10, points: 850, student: 'Shreyas Reddy', pollScore: '2/5', timeAttended: '0:50:23', questionsAsked: 1 }, { id: 11, position: 11, points: 840, student: 'Student Eleven', pollScore: '3/5', timeAttended: '0:45:00', questionsAsked: 0 }, { id: 12, position: 12, points: 830, student: 'Student Twelve', pollScore: '4/5', timeAttended: '1:10:00', questionsAsked: 1 },
];

export default function Leaderboard() {
    const [searchText, setSearchText] = useState('');

    const filteredRows = rows.filter((row) =>
        row.student.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
            {/* Header Section */}
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                mb={3}
                spacing={2}
                sx={{ flexShrink: 0 }}
            >
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    Spring 2025 : Leaderboard
                </Typography>
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ width: { xs: '100%', sm: 'auto' } }}>
                    <TextField
                        placeholder="Search Student..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start"><SearchIcon color="action" /></InputAdornment>),
                        }}
                        sx={{ flexGrow: 1, minWidth: '200px' }}
                    />
                    <Tooltip title="Filter leaderboard" arrow>
                        <Button variant="outlined" startIcon={<FilterListIcon />} >
                            Filter
                        </Button>
                    </Tooltip>
                </Stack>
            </Stack>

            {/* DataGrid Container */}
            <Paper
                // Use elevation for subtle shadow instead of outline
                elevation={1}
                sx={{
                    flexGrow: 1,
                    width: '100%',
                    overflow: 'hidden',
                    display: 'flex',
                    borderRadius: '12px' // Use a specific radius consistent with theme? theme.shape.borderRadius * 1.5
                }}
            >
                <DataGrid
                    rows={filteredRows}
                    columns={columns}
                    autoPageSize
                    disableSelectionOnClick
                    density="comfortable"
                    sx={{
                        border: 'none', // No border on grid itself when inside Paper
                        height: '100%',
                        width: '100%',
                        // Theme overrides handle cell/header styling
                    }}
                />
            </Paper>
        </Box>
    );
}
