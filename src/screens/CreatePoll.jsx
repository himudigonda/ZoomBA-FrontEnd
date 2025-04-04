import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';

export default function CreatePoll() {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['']);

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const addOption = () => {
        setOptions([...options, '']);
    };

    const removeOption = (index) => {
        const newOptions = options.filter((_, i) => i !== index);
        setOptions(newOptions);
    };

    const handleSubmit = () => {
        console.log('Poll Submitted:', { question, options });
        // You can connect this to a backend or Zoom API later
    };

    return (
        <Box sx={{ maxWidth: 600 }}>
            <Typography variant="h4" gutterBottom>
                Create New Poll
            </Typography>

            <TextField
                label="Poll Question"
                fullWidth
                margin="normal"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />

            {options.map((option, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 2 }}>
                    <TextField
                        label={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        fullWidth
                    />
                    {options.length > 1 && (
                        <Button variant="outlined" color="error" onClick={() => removeOption(index)}>
                            Remove
                        </Button>
                    )}
                </Box>
            ))}

            <Button variant="text" onClick={addOption} sx={{ mt: 2 }}>
                + Add Option
            </Button>

            <Button variant="contained" sx={{ mt: 3 }} onClick={handleSubmit}>
                Submit Poll
            </Button>
        </Box>
    );
}
