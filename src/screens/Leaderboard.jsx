// src/screens/Leaderboard.jsx
import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, TextField, InputAdornment, IconButton, Button, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// Define columns matching the target UI
const columns = [
    {
        field: 'points', // Changed field name
        headerName: 'Points',
        width: 100,
        type: 'number', // Good practice to define type
        headerAlign: 'left',
        align: 'left',
    },
    {
        field: 'student', // Changed field name
        headerName: 'Student',
        width: 250, // Increased width
        renderCell: (params) => ( // Example: Could add avatar later
            <Typography variant="body2" sx={{ fontWeight: 500 }}>{params.value}</Typography>
        )
    },
    {
        field: 'pollScore', // Changed field name
        headerName: 'Poll Score',
        width: 130,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'timeAttended', // Changed field name
        headerName: 'Time Attended',
        width: 150,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'questionsAsked', // Changed field name
        headerName: '#Questions Asked',
        width: 160,
        type: 'number',
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'actions',
        headerName: '',
        width: 60,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderCell: (params) => (
            <IconButton size="small" onClick={() => console.log('Actions for', params.row.student)}>
                <MoreVertIcon fontSize="small" />
            </IconButton>
        ),
        headerAlign: 'center',
        align: 'center',
    }
];

// Sample data matching the new structure and target UI
const rows = [
    { id: 1, points: 1013, student: 'Mihir Ashish Thakur', pollScore: '5/5', timeAttended: '1:03:30', questionsAsked: 2 },
    { id: 2, points: 998, student: 'Yeshwanth Karra', pollScore: '5/5', timeAttended: '1:02:13', questionsAsked: 3 },
    { id: 3, points: 995, student: 'Himansh Mudigonda', pollScore: '5/5', timeAttended: '0:59:53', questionsAsked: 2 },
    { id: 4, points: 977, student: 'Tanmay Parulekar', pollScore: '5/5', timeAttended: '0:54:34', questionsAsked: 1 },
    { id: 5, points: 974, student: 'Swapneel Paranjpe', pollScore: '4.5/5', timeAttended: '1:01:32', questionsAsked: 1 },
    { id: 6, points: 956, student: 'Riddhi Amale', pollScore: '4/5', timeAttended: '1:02:15', questionsAsked: 0 },
    { id: 7, points: 944, student: 'Maanav Bhavsar', pollScore: '4.5/5', timeAttended: '0:58:52', questionsAsked: 0 },
    { id: 8, points: 922, student: 'Sarthak Garg', pollScore: '4/5', timeAttended: '1:01:03', questionsAsked: 0 },
    { id: 9, points: 901, student: 'Praneeth Palle', pollScore: '3.5/5', timeAttended: '1:01:55', questionsAsked: 0 },
    { id: 10, points: 850, student: 'Shreyas Reddy', pollScore: '2/5', timeAttended: '0:50:23', questionsAsked: 1 },

];

export default function Leaderboard() {
    const [searchText, setSearchText] = useState('');
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

    // Basic filtering logic (can be expanded)
    const filteredRows = rows.filter((row) =>
        row.student.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3} spacing={2}>
                {/* Left side: Title */}
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Spring 2025 : Leaderboard
                </Typography>

                {/* Right side: Search, Filter, View Toggles */}
                <Stack direction="row" spacing={1.5} alignItems="center">
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Search Student..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color="action" />
                                </InputAdornment>
                            ),
                            sx: { borderRadius: '20px', backgroundColor: 'background.paper' } // Rounded search bar
                        }}
                        sx={{ width: 250 }} // Adjust width as needed
                    />
                    <Button
                        variant="outlined"
                        startIcon={<FilterListIcon />}
                        size="medium"
                        sx={{ color: 'text.primary', borderColor: 'grey.300' }}
                    >
                        Filter
                    </Button>
                    <IconButton onClick={() => setViewMode('list')} color={viewMode === 'list' ? 'primary' : 'default'}>
                        <ViewListIcon />
                    </IconButton>
                    <IconButton onClick={() => setViewMode('grid')} color={viewMode === 'grid' ? 'primary' : 'default'}>
                        <ViewModuleIcon />
                    </IconButton>
                </Stack>
            </Stack>

            {/* DataGrid container */}
            <Box sx={{ height: 600, width: '100%' }}> {/* Increased height */}
                <DataGrid
                    rows={filteredRows}
                    columns={columns}
                    pageSize={10} // Show more rows per page
                    rowsPerPageOptions={[10, 20, 50]}
                    disableSelectionOnClick // Don't select row on click
                    density="comfortable" // Slightly more spaced rows
                // Styling is mostly handled by theme overrides now
                // Add specific sx here if needed:
                // sx={{
                //     '& .MuiDataGrid-columnHeaders': { ... },
                //     '& .MuiDataGrid-cell': { ... },
                // }}
                // autoHeight // Use if you don't want a fixed height container
                />
            </Box>
        </Box>
    );
}
