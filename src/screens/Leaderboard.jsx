import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Student Name', width: 200 },
    { field: 'participation', headerName: 'Participation (%)', width: 180 },
    { field: 'averageGrade', headerName: 'Avg. Grade', width: 150 },
    { field: 'rank', headerName: 'Rank', width: 100 },
];

const rows = [
    { id: 1, name: 'Alice Sharma', participation: 95, averageGrade: 88, rank: 1 },
    { id: 2, name: 'Brian Wong', participation: 90, averageGrade: 85, rank: 2 },
    { id: 3, name: 'Charlie Singh', participation: 85, averageGrade: 83, rank: 3 },
    { id: 4, name: 'Disha Patel', participation: 82, averageGrade: 80, rank: 4 },
    { id: 5, name: 'Ethan Reddy', participation: 75, averageGrade: 78, rank: 5 },
];

export default function Leaderboard() {
    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Class Leaderboard
            </Typography>

            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </Box>
        </Box>
    );
}
