// src/screens/CreatePoll.jsx
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, IconButton, Paper, Stack, RadioGroup, FormControlLabel, Radio, Divider } from '@mui/material';
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
        <Paper
            variant="outlined"
            sx={{
                p: 3,
                mb: 3,
                borderRadius: 3, // Match theme or set specific (e.g., 12px)
                position: 'relative',
            }}
        >
            <IconButton
                aria-label="Remove poll"
                onClick={() => removePoll(pollIndex)}
                size="small"
                sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    color: 'grey.500',
                    // Hover handled by theme override for MuiIconButton
                    // '&:hover': { color: 'error.main', backgroundColor: (theme) => theme.palette.action.hover }
                }}
            >
                <CloseIcon fontSize="small" />
            </IconButton>

            <Stack spacing={2.5}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pr: '30px' }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>Poll {pollIndex + 1}</Typography>
                </Box>

                <TextField
                    label="Poll Question"
                    fullWidth
                    value={poll.question}
                    onChange={handleQuestionChange}
                // Use defaults from theme
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
                                // Use theme styles for Radio
                                control={<Radio
                                    size="small"
                                    icon={<RadioButtonUncheckedIcon fontSize="inherit" />} // Use inherit to match surrounding font size
                                    checkedIcon={<CheckCircleOutlineIcon fontSize="inherit" />}
                                />}
                                label={
                                    // TextField for option text
                                    <TextField
                                        placeholder={`Option ${optionIndex + 1}`}
                                        value={option.text}
                                        onChange={(e) => handleOptionChange(optionIndex, e.target.value)}
                                        fullWidth
                                    // Use defaults from theme (size=small, variant=outlined)
                                    // Optional: Make it look less prominent if desired
                                    // variant="standard" // Example: Less visual weight
                                    // sx={{ '& .MuiInput-underline:before': { borderBottom: '1px solid transparent' }, '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottom: '1px solid grey.400'} }} // If standard
                                    />
                                }
                                sx={{ flexGrow: 1, mr: 0 }}
                                labelPlacement="end"
                            />
                            {poll.options.length > 1 && (
                                <IconButton
                                    size="small"
                                    onClick={() => removeOption(optionIndex)}
                                    color="error" // Keep error color indication
                                    sx={{
                                        ml: 1,
                                        // Optional: override hover if theme isn't specific enough for error
                                        // '&:hover': { backgroundColor: (theme) => alpha(theme.palette.error.main, 0.08) }
                                    }}
                                >
                                    <RemoveCircleOutlineIcon fontSize="inherit" />
                                </IconButton>
                            )}
                        </Box>
                    ))}
                </RadioGroup>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                    <Button
                        variant="text"
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={addOption}
                    // Use defaults from theme
                    >
                        Add Option
                    </Button>
                    <Button
                        variant="contained"
                        endIcon={<ArrowForwardIcon />}
                        disabled={!poll.question || poll.options.length < 2 || poll.options.some(o => !o.text) || getCorrectOptionIndex() === null}
                    // Use defaults from theme
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

    const updatePoll = (index, updatedPollData) => { const newPolls = [...polls]; newPolls[index] = updatedPollData; setPolls(newPolls); };
    const addPoll = () => { setPolls([...polls, { id: Date.now() + polls.length, question: '', options: [{ text: '', isCorrect: false }, { text: '', isCorrect: false }], correctOptionIndex: null }]); };
    const removePoll = (indexToRemove) => { setPolls(prevPolls => prevPolls.filter((_, index) => index !== indexToRemove)); };

    return (
        <Box sx={{ width: '100%' }}>
            {polls.map((poll, index) => (
                <PollCard
                    key={poll.id}
                    poll={poll}
                    pollIndex={index}
                    updatePoll={updatePoll}
                    removePoll={removePoll}
                />
                // {index < polls.length - 1 && <Divider sx={{ my: 3 }} />} // Divider if desired
            ))}

            <Button
                variant="outlined"
                startIcon={<AddCircleOutlineIcon />}
                onClick={addPoll}
                fullWidth
                sx={{
                    mt: 1,
                    mb: 3,
                    py: 1.5,
                    // Use theme styles
                }}
            >
                Add New Poll
            </Button>
        </Box>
    );
}
