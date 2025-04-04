// src/screens/CreatePoll.jsx
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, IconButton, Paper, Stack, RadioGroup, FormControlLabel, Radio, Divider } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close'; // Import Close icon for removing the poll

// Component for a single Poll Card
function PollCard({ poll, pollIndex, updatePoll, removePoll }) { // Added removePoll prop
    const handleQuestionChange = (event) => {
        updatePoll(pollIndex, { ...poll, question: event.target.value });
    };

    const handleOptionChange = (optionIndex, value) => {
        const newOptions = [...poll.options];
        newOptions[optionIndex] = { ...newOptions[optionIndex], text: value };
        updatePoll(pollIndex, { ...poll, options: newOptions });
    };

    const handleCorrectChange = (event) => {
        const correctIndex = parseInt(event.target.value, 10);
         const newOptions = poll.options.map((opt, idx) => ({
             ...opt,
             isCorrect: idx === correctIndex
         }));
        updatePoll(pollIndex, { ...poll, options: newOptions, correctOptionIndex: correctIndex });
    };

    const addOption = () => {
        const newOptions = [...poll.options, { text: '', isCorrect: false }];
        updatePoll(pollIndex, { ...poll, options: newOptions });
    };

    const removeOption = (optionIndex) => {
        const newOptions = poll.options.filter((_, i) => i !== optionIndex);
         let newCorrectIndex = poll.correctOptionIndex;
         if (optionIndex === poll.correctOptionIndex) {
             newCorrectIndex = null;
         } else if (poll.correctOptionIndex !== null && optionIndex < poll.correctOptionIndex) {
             newCorrectIndex = poll.correctOptionIndex - 1;
         }
        updatePoll(pollIndex, { ...poll, options: newOptions, correctOptionIndex: newCorrectIndex });
    };

    const getCorrectOptionIndex = () => {
        const index = poll.options.findIndex(opt => opt.isCorrect);
        return index === -1 ? null : index;
    }

    return (
        <Paper elevation={0} sx={{ p: 3, mb: 3, border: '1px solid', borderColor: 'grey.200', borderRadius: 2, position: 'relative' }}>
             {/* Add Remove Poll Button */}
             <IconButton
                aria-label="Remove poll"
                onClick={() => removePoll(pollIndex)}
                size="small"
                sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    color: 'grey.500', // Use a neutral color
                     '&:hover': {
                         color: 'error.main' // Turn red on hover
                     }
                }}
            >
                <CloseIcon fontSize="small" />
            </IconButton>

            <Stack spacing={2}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pr: '30px' /* Add padding to prevent overlap with close icon */ }}>
                     <Typography variant="h6" sx={{ fontWeight: 600 }}>Poll {pollIndex + 1}</Typography>
                     {/* Removed the optional remove poll button from here */}
                </Box>

                <TextField
                    label="Poll Question"
                    fullWidth
                    variant="outlined"
                    value={poll.question}
                    onChange={handleQuestionChange}
                    size="small"
                    sx={{ backgroundColor: 'background.paper' }}
                />

                <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.secondary', pt: 1 }}>Options:</Typography>
                <RadioGroup
                    aria-label={`poll-${pollIndex}-correct-option`}
                    name={`poll-${pollIndex}-radios`}
                    value={getCorrectOptionIndex() !== null ? getCorrectOptionIndex().toString() : ''}
                    onChange={handleCorrectChange}
                >
                    {poll.options.map((option, optionIndex) => (
                        <Box key={optionIndex} sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
                            <FormControlLabel
                                value={optionIndex.toString()}
                                control={<Radio size="small" icon={<RadioButtonUncheckedIcon fontSize="small"/>} checkedIcon={<CheckCircleOutlineIcon fontSize="small"/>} />}
                                label={
                                    <TextField
                                        placeholder={`Option ${optionIndex + 1}`}
                                        value={option.text}
                                        onChange={(e) => handleOptionChange(optionIndex, e.target.value)}
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        sx={{ backgroundColor: 'background.paper' }}
                                    />
                                }
                                sx={{ flexGrow: 1, mr: 0 /* Remove default margin */ }}
                                labelPlacement="end"
                            />
                             {poll.options.length > 1 && (
                                 <IconButton size="small" onClick={() => removeOption(optionIndex)} color="error" sx={{ ml: 1 }}>
                                     <RemoveCircleOutlineIcon fontSize="inherit"/>
                                 </IconButton>
                             )}
                        </Box>
                    ))}
                </RadioGroup>


                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                     <Button
                         variant="text"
                         size="small"
                         startIcon={<AddCircleOutlineIcon />}
                         onClick={addOption}
                     >
                         Add Option
                     </Button>
                     <Button
                        variant="contained"
                        size="small"
                        endIcon={<ArrowForwardIcon />}
                        // onClick={handleSubmit} // Define submit logic per poll
                        disabled={!poll.question || poll.options.length < 2 || poll.options.some(o => !o.text) || getCorrectOptionIndex() === null} // Require at least 2 options
                    >
                        Publish Poll
                    </Button>
                </Box>
            </Stack>
        </Paper>
    );
}


// Main Component
export default function CreatePoll() {
    const [polls, setPolls] = useState([
        { id: Date.now(), question: '', options: [{ text: '', isCorrect: false }, { text: '', isCorrect: false }], correctOptionIndex: null }
    ]);

    const updatePoll = (index, updatedPollData) => {
        const newPolls = [...polls];
        newPolls[index] = updatedPollData;
        setPolls(newPolls);
    };

    const addPoll = () => {
        setPolls([
            ...polls,
            { id: Date.now() + polls.length, question: '', options: [{ text: '', isCorrect: false }, { text: '', isCorrect: false }], correctOptionIndex: null } // Ensure unique ID on add
        ]);
    };

    // Function to remove a poll by its index
    const removePoll = (indexToRemove) => {
        setPolls(prevPolls => prevPolls.filter((_, index) => index !== indexToRemove));
    };

    const handleOverallSubmit = () => {
        console.log('Submitting all polls:', polls);
        // Logic to submit/save all defined polls
    };

    return (
        // Removed maxWidth here, letting the parent Box in Layout control it
        <Box>
            {polls.map((poll, index) => (
                <PollCard
                    key={poll.id} // Use a stable key
                    poll={poll}
                    pollIndex={index}
                    updatePoll={updatePoll}
                    removePoll={removePoll} // Pass the remove function
                />
            ))}

            {/* Only show add button if there are polls, or always show? Let's always show */}
            <Button
                variant="outlined"
                startIcon={<AddCircleOutlineIcon />}
                onClick={addPoll}
                fullWidth // Make button full width
                sx={{ mt: 1, mb: 3, py: 1.5, borderColor: 'grey.300', color: 'text.primary', bgcolor: 'background.paper', '&:hover': { bgcolor: 'grey.100' } }} // Style add button
            >
                Add New Poll
            </Button>

            {/* Optional: Add a button to submit/save all polls at once */}
            {/* <Button variant="contained" size="large" onClick={handleOverallSubmit} sx={{ mt: 2 }}>
                Save All Polls
            </Button> */}
        </Box>
    );
}
