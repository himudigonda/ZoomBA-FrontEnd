// src/screens/CreatePoll.jsx
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, IconButton, Paper, Stack, RadioGroup, FormControlLabel, Radio, Divider } from '@mui/material'; // Keep Divider if needed between cards
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';

// Component for a single Poll Card
function PollCard({ poll, pollIndex, updatePoll, removePoll }) {
    // ... (internal logic of PollCard remains the same)
    const handleQuestionChange = (event) => { updatePoll(pollIndex, { ...poll, question: event.target.value }); };
    const handleOptionChange = (optionIndex, value) => { const newOptions = [...poll.options]; newOptions[optionIndex] = { ...newOptions[optionIndex], text: value }; updatePoll(pollIndex, { ...poll, options: newOptions }); };
    const handleCorrectChange = (event) => { const correctIndex = parseInt(event.target.value, 10); const newOptions = poll.options.map((opt, idx) => ({ ...opt, isCorrect: idx === correctIndex })); updatePoll(pollIndex, { ...poll, options: newOptions, correctOptionIndex: correctIndex }); };
    const addOption = () => { const newOptions = [...poll.options, { text: '', isCorrect: false }]; updatePoll(pollIndex, { ...poll, options: newOptions }); };
    const removeOption = (optionIndex) => { const newOptions = poll.options.filter((_, i) => i !== optionIndex); let newCorrectIndex = poll.correctOptionIndex; if (optionIndex === poll.correctOptionIndex) { newCorrectIndex = null; } else if (poll.correctOptionIndex !== null && optionIndex < poll.correctOptionIndex) { newCorrectIndex = poll.correctOptionIndex - 1; } updatePoll(pollIndex, { ...poll, options: newOptions, correctOptionIndex: newCorrectIndex }); };
    const getCorrectOptionIndex = () => { const index = poll.options.findIndex(opt => opt.isCorrect); return index === -1 ? null : index; }

    return (
        // Use Paper component for consistent card styling
        <Paper
            variant="outlined" // Use outlined variant consistent with other cards
            sx={{
                p: 3,
                mb: 3, // Keep margin bottom between poll cards
                borderRadius: 3, // Consistent radius (e.g., 12px)
                position: 'relative',
                // Border handled by variant="outlined"
                // boxShadow: (theme) => theme.shadows[1], // Optional subtle shadow
            }}
        >
            <IconButton
                aria-label="Remove poll"
                onClick={() => removePoll(pollIndex)}
                size="small"
                sx={{
                    position: 'absolute',
                    top: 12, // Adjust position slightly
                    right: 12,
                    color: 'grey.500',
                    '&:hover': { color: 'error.main', backgroundColor: (theme) => theme.palette.action.hover }
                }}
            >
                <CloseIcon fontSize="small" />
            </IconButton>

            {/* Use Stack for consistent internal spacing */}
            <Stack spacing={2.5}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pr: '30px' }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>Poll {pollIndex + 1}</Typography>
                </Box>

                <TextField
                    label="Poll Question"
                    fullWidth
                    // variant="outlined" // Default from theme
                    value={poll.question}
                    onChange={handleQuestionChange}
                // size="small" // Default from theme
                // sx={{ backgroundColor: 'background.paper' }} // Let theme handle it
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
                                control={<Radio size="small" icon={<RadioButtonUncheckedIcon fontSize="inherit" />} checkedIcon={<CheckCircleOutlineIcon fontSize="inherit" />} />}
                                label={
                                    <TextField
                                        placeholder={`Option ${optionIndex + 1}`}
                                        value={option.text}
                                        onChange={(e) => handleOptionChange(optionIndex, e.target.value)}
                                        fullWidth
                                    // variant="outlined" // Default from theme
                                    // size="small" // Default from theme
                                    // sx={{ backgroundColor: 'background.paper' }} // Theme handles background
                                    />
                                }
                                sx={{ flexGrow: 1, mr: 0 }}
                                labelPlacement="end"
                            />
                            {poll.options.length > 1 && (
                                <IconButton size="small" onClick={() => removeOption(optionIndex)} color="error" sx={{ ml: 1 }}>
                                    <RemoveCircleOutlineIcon fontSize="inherit" />
                                </IconButton>
                            )}
                        </Box>
                    ))}
                </RadioGroup>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                    <Button
                        variant="text" // Use text variant for less emphasis
                        // size="small" // Default from theme override or specify if needed
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={addOption}
                    >
                        Add Option
                    </Button>
                    <Button
                        variant="contained" // Keep contained for primary action per poll
                        // size="small" // Default from theme override or specify if needed
                        endIcon={<ArrowForwardIcon />}
                        disabled={!poll.question || poll.options.length < 2 || poll.options.some(o => !o.text) || getCorrectOptionIndex() === null}
                    >
                        Publish Poll
                    </Button>
                </Box>
            </Stack>
        </Paper> // Close Paper
    );
}


// Main Component
export default function CreatePoll() {
    const [polls, setPolls] = useState([
        { id: Date.now(), question: '', options: [{ text: '', isCorrect: false }, { text: '', isCorrect: false }], correctOptionIndex: null }
    ]);

    const updatePoll = (index, updatedPollData) => { /* ... */ const newPolls = [...polls]; newPolls[index] = updatedPollData; setPolls(newPolls); };
    const addPoll = () => { /* ... */ setPolls([...polls, { id: Date.now() + polls.length, question: '', options: [{ text: '', isCorrect: false }, { text: '', isCorrect: false }], correctOptionIndex: null }]); };
    const removePoll = (indexToRemove) => { /* ... */ setPolls(prevPolls => prevPolls.filter((_, index) => index !== indexToRemove)); };
    // const handleOverallSubmit = () => { console.log('Submitting all polls:', polls); }; // Keep if needed

    return (
        // This Box fills the space provided by Layout's inner wrapper
        <Box sx={{ width: '100%' }}>
            {/* Optional Title for the Page */}
            {/* <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>Create Polls</Typography> */}

            {polls.map((poll, index) => (
                <PollCard
                    key={poll.id}
                    poll={poll}
                    pollIndex={index}
                    updatePoll={updatePoll}
                    removePoll={removePoll}
                />
                // Optional: Add Divider between cards
                // {index < polls.length - 1 && <Divider sx={{ my: 3 }} />}
            ))}

            {/* "Add New Poll" Button - Use outlined style for secondary action */}
            <Button
                variant="outlined" // More appropriate for adding another item
                startIcon={<AddCircleOutlineIcon />}
                onClick={addPoll}
                fullWidth
                sx={{
                    mt: 1, // Adjust margin top if needed
                    mb: 3,
                    py: 1.5, // Give it good vertical padding
                    // Use theme styles for border/color
                    // borderColor: 'grey.300',
                    // color: 'text.primary',
                    // bgcolor: 'background.paper', // Optional background
                    // '&:hover': { bgcolor: 'grey.100' }
                }}
            >
                Add New Poll
            </Button>

            {/* Optional: Add a button to submit/save all polls at once */}
        </Box>
    );
}
