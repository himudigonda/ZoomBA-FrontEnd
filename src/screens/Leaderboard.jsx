// src/screens/Leaderboard.jsx
import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, TextField, InputAdornment, IconButton, Button, Stack, Paper } from '@mui/material'; // Added Paper
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// Helper function (no changes)
const getOrdinal = (n) => {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
};

// Columns definition (no changes)
const columns = [
    { field: 'position', headerName: 'Position', width: 80, type: 'number', align: 'center', headerAlign: 'center', renderCell: (params) => (<Typography variant="body2" fontWeight="medium">{getOrdinal(params.value)}</Typography>), },
    { field: 'student', headerName: 'Student', width: 250, renderCell: (params) => (<Typography variant="body2" fontWeight="medium">{params.value}</Typography>) },
    { field: 'points', headerName: 'Points', width: 100, type: 'number', headerAlign: 'left', align: 'left', },
    { field: 'pollScore', headerName: 'Poll Score', width: 130, headerAlign: 'center', align: 'center' },
    { field: 'timeAttended', headerName: 'Time Attended', width: 150, headerAlign: 'center', align: 'center' },
    { field: 'questionsAsked', headerName: '#Questions Asked', width: 160, type: 'number', headerAlign: 'center', align: 'center' },
    { field: 'actions', headerName: '', width: 60, sortable: false, filterable: false, disableColumnMenu: true, renderCell: (params) => (<IconButton size="small" onClick={() => console.log('Actions for', params.row.student)}><MoreVertIcon fontSize="small" /></IconButton>), headerAlign: 'center', align: 'center', }
];

// Sample data (no changes)
const rows = [
    { id: 1, position: 1, points: 1013, student: 'Mihir Ashish Thakur', pollScore: '5/5', timeAttended: '1:03:30', questionsAsked: 2 },
    { id: 2, position: 2, points: 998, student: 'Yeshwanth Karra', pollScore: '5/5', timeAttended: '1:02:13', questionsAsked: 3 },
    { id: 3, position: 3, points: 995, student: 'Himansh Mudigonda', pollScore: '5/5', timeAttended: '0:59:53', questionsAsked: 2 },
    { id: 4, position: 4, points: 977, student: 'Tanmay Parulekar', pollScore: '5/5', timeAttended: '0:54:34', questionsAsked: 1 },
    { id: 5, position: 5, points: 974, student: 'Swapneel Paranjpe', pollScore: '4.5/5', timeAttended: '1:01:32', questionsAsked: 1 },
    { id: 6, position: 6, points: 956, student: 'Riddhi Amale', pollScore: '4/5', timeAttended: '1:02:15', questionsAsked: 0 },
    { id: 7, position: 7, points: 944, student: 'Maanav Bhavsar', pollScore: '4.5/5', timeAttended: '0:58:52', questionsAsked: 0 },
    { id: 8, position: 8, points: 922, student: 'Sarthak Garg', pollScore: '4/5', timeAttended: '1:01:03', questionsAsked: 0 },
    { id: 9, position: 9, points: 901, student: 'Praneeth Palle', pollScore: '3.5/5', timeAttended: '1:01:55', questionsAsked: 0 },
    { id: 10, position: 10, points: 850, student: 'Shreyas Reddy', pollScore: '2/5', timeAttended: '0:50:23', questionsAsked: 1 },
    { id: 11, position: 11, points: 840, student: 'Student Eleven', pollScore: '3/5', timeAttended: '0:45:00', questionsAsked: 0 },
    { id: 12, position: 12, points: 830, student: 'Student Twelve', pollScore: '4/5', timeAttended: '1:10:00', questionsAsked: 1 },
];

export default function Leaderboard() {
    const [searchText, setSearchText] = useState('');
    // const [viewMode, setViewMode] = useState('list'); // Removed if not using toggles

    const filteredRows = rows.filter((row) =>
        row.student.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        // Ensure this Box takes full height from Layout's inner wrapper
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
            {/* Header Section */}
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                mb={3} // Keep margin bottom to separate from grid
                spacing={2}
                sx={{ flexShrink: 0 }}
            >
                <Typography variant="h5" sx={{ fontWeight: 700 /* Use theme weight */ }}>
                    Spring 2025 : Leaderboard
                </Typography>
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ width: { xs: '100%', sm: 'auto' } }}>
                    <TextField
                        // variant="outlined" // Default from theme
                        // size="small" // Default from theme
                        placeholder="Search Student..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start"><SearchIcon color="action" /></InputAdornment>),
                            // Use theme overrides for styling, add specific sx if needed
                            // sx: { borderRadius: '20px', backgroundColor: 'background.paper' }
                        }}
                        sx={{ flexGrow: 1, minWidth: '200px' }}
                    />
                    <Button
                        variant="outlined"
                        startIcon={<FilterListIcon />}
                        // size="medium" // Use default button size or theme override
                        sx={{
                            // Use theme styles, override if necessary
                            // color: 'text.primary',
                            // borderColor: 'grey.300',
                            // bgcolor: 'background.paper'
                        }}
                    >
                        Filter
                    </Button>
                    {/* View toggles removed for simplicity unless needed */}
                </Stack>
            </Stack>

            {/* DataGrid Container - Use Paper for consistent card styling */}
            <Paper
                variant="outlined" // Use outlined variant for a defined border based on theme divider color
                sx={{
                    flexGrow: 1, // Make Paper grow to fill space
                    width: '100%',
                    overflow: 'hidden', // Hide overflow on the Paper, DataGrid handles scrolling
                    display: 'flex', // Needed for DataGrid height: 100% to work correctly
                    borderRadius: '12px' // Apply border radius here
                }}
            >
                <DataGrid
                    rows={filteredRows}
                    columns={columns}
                    autoPageSize // Let grid calculate rows based on height
                    disableSelectionOnClick
                    density="comfortable"
                    // Use theme overrides for styling (borders, headers etc.)
                    // Add specific DataGrid sx if theme isn't covering something
                    sx={{
                        border: 'none', // Remove internal border, rely on Paper's border
                        height: '100%', // Fill the Paper container
                        width: '100%',
                        '& .MuiDataGrid-columnHeaders': {
                            // Optional: Add slight background if needed, theme might handle it
                            // backgroundColor: (theme) => theme.palette.grey[100],
                            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                        },
                        '& .MuiDataGrid-cell': {
                            borderBottom: (theme) => `1px solid ${theme.palette.divider}`, // Ensure cell borders match theme
                        },
                        '& .MuiDataGrid-footerContainer': {
                            borderTop: (theme) => `1px solid ${theme.palette.divider}`, // Ensure footer border matches theme
                        },
                        '& .MuiDataGrid-virtualScroller': {
                            // Ensure scrollbar styling (if customized in theme) applies
                        }
                    }}
                />
            </Paper> {/* Close Paper */}
        </Box>
    );
}
