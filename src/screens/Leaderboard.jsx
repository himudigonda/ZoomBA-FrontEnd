// src/screens/Leaderboard.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, TextField, InputAdornment, IconButton, Stack, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';

console.log("[DEBUG] Leaderboard.jsx :: Module loaded.");

// Helper function
const getOrdinal = (n) => {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    const result = n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
    return result;
};

// Sample data (without position)
const initialRows = [
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
    { id: 11, points: 840, student: 'Student Eleven', pollScore: '3/5', timeAttended: '0:45:00', questionsAsked: 0 },
    { id: 12, points: 830, student: 'Student Twelve', pollScore: '4/5', timeAttended: '1:10:00', questionsAsked: 1 },
];
console.log("[DEBUG] Leaderboard.jsx :: Initial rows data:", initialRows.length, "entries");

// Columns definition
const columns = [
    {
        field: 'position', headerName: 'Position', width: 90, type: 'number', align: 'center', headerAlign: 'center',
        renderCell: (params) => {
            // Just display the already calculated position
            return (<Typography variant="body2" fontWeight="medium">{getOrdinal(params.row.position)}</Typography>);
        },
    },
    {
        field: 'student', headerName: 'Student', flex: 1, minWidth: 220,
        renderCell: (params) => (<Typography variant="body2" fontWeight="medium">{params.value}</Typography>)
    },
    { field: 'points', headerName: 'Points', width: 110, type: 'number', headerAlign: 'left', align: 'left' },
    { field: 'pollScore', headerName: 'Poll Score', width: 140, headerAlign: 'center', align: 'center' },
    { field: 'timeAttended', headerName: 'Time Attended', width: 160, headerAlign: 'center', align: 'center' },
    { field: 'questionsAsked', headerName: '# Questions Asked', width: 170, type: 'number', headerAlign: 'center', align: 'center' },
    // Removed Actions Column
];
console.log("[DEBUG] Leaderboard.jsx :: Defined columns:", columns.length, "columns");

export default function Leaderboard() {
    console.log("[DEBUG] Leaderboard.Leaderboard :: Component rendering started.");
    const [searchText, setSearchText] = useState('');
    const [rows, setRows] = useState(initialRows); // Use a state for the rows data
    console.log("[DEBUG] Leaderboard.Leaderboard :: useState(searchText) initialized with:", `"${searchText}"`);

    useEffect(() => {
        console.log("[INFO] Leaderboard.Leaderboard :: Component mounted.");
        return () => {
            console.log("[INFO] Leaderboard.Leaderboard :: Component will unmount.");
        };
    }, []);

    const handleSearchChange = (event) => {
        const newSearchText = event.target.value;
        console.log(`[DEBUG] Leaderboard.handleSearchChange :: Search text changed to: "${newSearchText}"`);
        setSearchText(newSearchText);
    };

    // Function to rank the rows based on points
    const rankRows = (rowArray) => {
        console.log("[DEBUG] Leaderboard.rankRows :: Ranking rows based on points.");
        const sortedRows = [...rowArray].sort((a, b) => b.points - a.points); // Sort descending
        const ranked = sortedRows.map((row, index) => ({ ...row, position: index + 1 })); // Add position
        console.log(`[DEBUG] Leaderboard.rankRows :: Ranking complete. ${ranked.length} rows ranked.`);
        return ranked;
    };

    const rankedRows = useMemo(() => {
        console.log("[DEBUG] Leaderboard.rankedRows :: Calculating rankedRows.");
        const filtered = rows.filter((row) =>
            searchText === '' || row.student.toLowerCase().includes(searchText.toLowerCase())
        );
        console.log(`[DEBUG] Leaderboard.rankedRows :: Filtering complete. ${filtered.length} rows after search.`);
        const result = rankRows(filtered);
        console.log(`[DEBUG] Leaderboard.rankedRows :: Ranking complete. ${result.length} rows ranked.`);
        return result;
    }, [rows, searchText]);

    console.log("[DEBUG] Leaderboard.Leaderboard :: Rendering component structure.");
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
            {console.log("[DEBUG] Leaderboard.Leaderboard :: Rendering Header Stack.")}
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
                    {console.log("[DEBUG] Leaderboard.Leaderboard :: Rendering Search TextField.")}
                    <TextField
                        placeholder="Search Student..."
                        value={searchText}
                        onChange={handleSearchChange}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start"><SearchIcon color="action" /></InputAdornment>),
                        }}
                        sx={{ flexGrow: 1, minWidth: '200px' }}
                    />
                    {/* Removed Filter Button */}
                </Stack>
            </Stack>

            {console.log("[DEBUG] Leaderboard.Leaderboard :: Rendering DataGrid Container Paper.")}
            <Paper
                elevation={1}
                sx={{
                    flexGrow: 1,
                    width: '100%',
                    overflow: 'hidden',
                    display: 'flex',
                    borderRadius: '12px'
                }}
            >
                {console.log(`[DEBUG] Leaderboard.Leaderboard :: Rendering DataGrid with ${rankedRows.length} rows.`)}
                <DataGrid
                    rows={rankedRows} // Use rankedRows
                    columns={columns}
                    autoPageSize
                    disableSelectionOnClick
                    density="comfortable"
                    sx={{
                        border: 'none',
                        height: '100%',
                        width: '100%',
                        '& .MuiDataGrid-columnHeaderTitle': {
                            overflow: 'visible',
                            lineHeight: 'normal',
                            whiteSpace: 'normal',
                        },
                    }}
                    onPageChange={(newPage) => console.log(`[DEBUG] Leaderboard.Leaderboard :: DataGrid page changed to: ${newPage + 1}`)}
                    onSortModelChange={(model) => console.log(`[DEBUG] Leaderboard.Leaderboard :: DataGrid sort model changed:`, model)}
                />
            </Paper>
            {console.log("[DEBUG] Leaderboard.Leaderboard :: Component rendering finished.")}
        </Box>
    );
}
