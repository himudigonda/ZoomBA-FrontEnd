// src/screens/Leaderboard.jsx
import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, TextField, InputAdornment, IconButton, Button, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// Define columns matching the target UI (No changes needed here unless data format changed)
const columns = [
    { field: 'points', headerName: 'Points', width: 100, type: 'number', headerAlign: 'left', align: 'left' },
    { field: 'student', headerName: 'Student', width: 250, renderCell: (params) => (<Typography variant="body2" sx={{ fontWeight: 500 }}>{params.value}</Typography>) },
    { field: 'pollScore', headerName: 'Poll Score', width: 130, headerAlign: 'center', align: 'center' },
    { field: 'timeAttended', headerName: 'Time Attended', width: 150, headerAlign: 'center', align: 'center' },
    { field: 'questionsAsked', headerName: '#Questions Asked', width: 160, type: 'number', headerAlign: 'center', align: 'center' },
    {
        field: 'actions', headerName: '', width: 60, sortable: false, filterable: false, disableColumnMenu: true,
        renderCell: (params) => (<IconButton size="small" onClick={() => console.log('Actions for', params.row.student)}><MoreVertIcon fontSize="small" /></IconButton>),
        headerAlign: 'center', align: 'center',
    }
];

// Sample data (No changes needed here)
const rows = [
    { id: 1, points: 1013, student: 'Mihir Ashish Thakur', pollScore: '5/5', timeAttended: '1:03:30', questionsAsked: 2 },
    { id: 2, points: 998, student: 'Yeshwanth Karra', pollScore: '5/5', timeAttended: '1:02:13', questionsAsked: 3 },
    // ... other rows
    { id: 3, points: 995, student: 'Himansh Mudigonda', pollScore: '5/5', timeAttended: '0:59:53', questionsAsked: 2 },
    { id: 4, points: 977, student: 'Tanmay Parulekar', pollScore: '5/5', timeAttended: '0:54:34', questionsAsked: 1 },
    { id: 5, points: 974, student: 'Swapneel Paranjpe', pollScore: '4.5/5', timeAttended: '1:01:32', questionsAsked: 1 },
    { id: 6, points: 956, student: 'Riddhi Amale', pollScore: '4/5', timeAttended: '1:02:15', questionsAsked: 0 },
    { id: 7, points: 944, student: 'Maanav Bhavsar', pollScore: '4.5/5', timeAttended: '0:58:52', questionsAsked: 0 },
    { id: 8, points: 922, student: 'Sarthak Garg', pollScore: '4/5', timeAttended: '1:01:03', questionsAsked: 0 },
    { id: 9, points: 901, student: 'Praneeth Palle', pollScore: '3.5/5', timeAttended: '1:01:55', questionsAsked: 0 },
    { id: 10, points: 850, student: 'Shreyas Reddy', pollScore: '2/5', timeAttended: '0:50:23', questionsAsked: 1 },
    // Add more rows if needed to test scrolling/height
    { id: 11, points: 840, student: 'Student Eleven', pollScore: '3/5', timeAttended: '0:45:00', questionsAsked: 0 },
    { id: 12, points: 830, student: 'Student Twelve', pollScore: '4/5', timeAttended: '1:10:00', questionsAsked: 1 },
];

export default function Leaderboard() {
    const [searchText, setSearchText] = useState('');
    const [viewMode, setViewMode] = useState('list');

    const filteredRows = rows.filter((row) =>
        row.student.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        // Make this main Box a flex container to control its children's layout
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' /* Ensure it takes full space from parent */ }}>
            {/* Header section (Title, Search, Filters) */}
            <Stack
                direction={{ xs: 'column', sm: 'row' }} // Stack vertically on small screens
                justifyContent="space-between"
                alignItems={{ xs: 'flex-start', sm: 'center' }} // Align differently on small screens
                mb={3}
                spacing={2}
                sx={{ flexShrink: 0 /* Prevent header from shrinking */ }}
            >
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Spring 2025 : Leaderboard
                </Typography>
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ width: { xs: '100%', sm: 'auto' } /* Full width on small screens */ }}>
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Search Student..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start"><SearchIcon color="action" /></InputAdornment>),
                            sx: { borderRadius: '20px', backgroundColor: 'background.paper' }
                        }}
                        sx={{ flexGrow: 1, minWidth: '200px' /* Ensure minimum width */ }} // Allow search to grow
                    />
                    <Button
                        variant="outlined"
                        startIcon={<FilterListIcon />}
                        size="medium" // Consistent button size
                        sx={{ color: 'text.primary', borderColor: 'grey.300', bgcolor: 'background.paper' }}
                    >
                        Filter
                    </Button>
                    {/* Keep view toggles or remove if not needed */}
                    {/* <IconButton onClick={() => setViewMode('list')} color={viewMode === 'list' ? 'primary' : 'default'}><ViewListIcon /></IconButton>
                    <IconButton onClick={() => setViewMode('grid')} color={viewMode === 'grid' ? 'primary' : 'default'}><ViewModuleIcon /></IconButton> */}
                </Stack>
            </Stack>

            {/* DataGrid container - Make it grow to fill remaining space */}
            <Box sx={{
                flexGrow: 1, // <<<<< CRITICAL: Make this Box take remaining vertical space
                width: '100%',
                '& .MuiDataGrid-root': { // Target the DataGrid root for border styling
                    border: 'none', // Remove default border from DataGrid itself
                    borderRadius: '12px', // Apply border radius to the grid
                }
            }}>
                <DataGrid
                    rows={filteredRows}
                    columns={columns}
                    // pageSize={10} // You might remove fixed pageSize to let it adapt
                    // rowsPerPageOptions={[10, 20, 50, 100]}
                    autoPageSize // Adjust page size based on container height
                    disableSelectionOnClick
                    density="comfortable"
                    sx={{
                        // Ensure DataGrid fills its container (important with flexGrow parent)
                        height: '100%',
                        width: '100%',
                        // Theme overrides should handle most styling (background, header, cell borders)
                        // Add specific overrides if needed:
                        // backgroundColor: 'background.paper', // Ensure paper background if theme isn't applying
                        // boxShadow: '0 2px 8px rgba(0,0,0,0.05)', // Apply shadow here if needed
                        '& .MuiDataGrid-virtualScroller': { // Ensure content scrolls within the grid
                            overflowY: 'auto !important',
                        }

                    }}
                />
            </Box>
        </Box>
    );
}
