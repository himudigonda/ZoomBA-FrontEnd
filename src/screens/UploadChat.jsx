// src/screens/UploadChat.jsx
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Box, Paper, Typography, IconButton, Button, Stack, Input, List, ListItem, ListItemText, CircularProgress, Alert, Tooltip } from '@mui/material'; // Added Tooltip import
import UploadFileIcon from '@mui/icons-material/UploadFile';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { alpha } from '@mui/material/styles';

console.log("[DEBUG] UploadChat.jsx :: Module loaded.");

/**
 * Parses the content of a chat text file.
 * Expects format:
 * HH:MM:SS From Sender Name to Everyone:
 * \tMessage content
 * @param {string} fileContent The raw text content of the file.
 * @returns {Array<object>|null} Array of message objects {id, timestamp, sender, message} or null on error.
 */
const parseChatFile = (fileContent) => {
    console.log("[DEBUG] UploadChat.parseChatFile :: Starting parsing.");
    if (!fileContent || typeof fileContent !== 'string') {
        console.error("[ERROR] UploadChat.parseChatFile :: Invalid fileContent provided.");
        return null;
    }

    const lines = fileContent.split('\n');
    const messages = [];
    const timestampSenderRegex = /^(\d{2}:\d{2}:\d{2}) From (.*?) to Everyone:$/;
    let currentId = 0;

    console.log(`[DEBUG] UploadChat.parseChatFile :: Processing ${lines.length} lines.`);

    for (let i = 0; i < lines.length; i++) {
        const headerMatch = lines[i].match(timestampSenderRegex);

        if (headerMatch) {
            // Found a potential message header, check the next line for the message
            if (i + 1 < lines.length && lines[i + 1].startsWith('\t')) {
                const timestamp = headerMatch[1];
                const sender = headerMatch[2].trim();
                const message = lines[i + 1].trim(); // Remove leading tab and any trailing whitespace

                if (sender && message) { // Ensure sender and message are not empty
                    messages.push({
                        id: currentId++,
                        timestamp,
                        sender,
                        message,
                    });
                    // console.log(`[DEBUG] UploadChat.parseChatFile :: Parsed message ID ${currentId-1}:`, { timestamp, sender, message }); // Can be noisy
                    i++; // Increment i to skip the message line in the next iteration
                } else {
                    console.warn(`[WARN] UploadChat.parseChatFile :: Skipping entry at line ${i + 1} due to empty sender or message.`);
                    i++; // Still skip the message line
                }
            } else {
                console.warn(`[WARN] UploadChat.parseChatFile :: Header found at line ${i + 1}, but next line is missing or doesn't start with a tab.`);
            }
        } else if (lines[i].trim() !== '') {
            // Line doesn't match header format and isn't empty - potentially part of a multi-line message (not handled by current simple parser) or garbage
            console.log(`[DEBUG] UploadChat.parseChatFile :: Skipping non-matching/non-empty line ${i + 1}: "${lines[i]}"`);
        }
    }

    console.log(`[INFO] UploadChat.parseChatFile :: Parsing finished. Found ${messages.length} messages.`);
    return messages;
};


export default function UploadChat() {
    console.log("[DEBUG] UploadChat.UploadChat :: Component rendering started.");
    const [isDragActive, setIsDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [parsedMessages, setParsedMessages] = useState([]); // State for parsed chat
    const [isParsing, setIsParsing] = useState(false); // State for parsing activity
    const [parsingError, setParsingError] = useState(null); // State for parsing errors
    const inputRef = useRef(null);

    useEffect(() => {
        console.log("[INFO] UploadChat.UploadChat :: Component mounted.");
        return () => {
            console.log("[INFO] UploadChat.UploadChat :: Component will unmount.");
        };
    }, []);

    useEffect(() => {
        console.log(`[DEBUG] UploadChat.UploadChat :: State updated - isDragActive: ${isDragActive}, selectedFile: ${selectedFile?.name ?? 'null'}, parsedMessages: ${parsedMessages.length}, isParsing: ${isParsing}, parsingError: ${parsingError}`);
    }, [isDragActive, selectedFile, parsedMessages, isParsing, parsingError]); // Log state changes

    // Effect to read and parse the file when selectedFile changes
    useEffect(() => {
        if (selectedFile) {
            console.log(`[INFO] UploadChat.useEffect[selectedFile] :: File selected (${selectedFile.name}), attempting to read and parse.`);
            setIsParsing(true);
            setParsingError(null);
            setParsedMessages([]); // Clear previous messages
            const reader = new FileReader();

            reader.onload = (event) => {
                console.log("[DEBUG] UploadChat.useEffect[selectedFile].reader.onload :: File reading successful.");
                try {
                    const content = event.target.result;
                    const messages = parseChatFile(content);
                    if (messages === null) {
                        throw new Error("Parsing function returned null.");
                    }
                    setParsedMessages(messages);
                    console.log("[INFO] UploadChat.useEffect[selectedFile].reader.onload :: Parsing complete, messages set in state.");
                } catch (error) {
                    console.error("[ERROR] UploadChat.useEffect[selectedFile].reader.onload :: Error during parsing:", error);
                    setParsingError("Failed to parse the file. Ensure it follows the expected format.");
                    setParsedMessages([]);
                } finally {
                    setIsParsing(false);
                    console.log("[DEBUG] UploadChat.useEffect[selectedFile].reader.onload :: Parsing state set to false.");
                }
            };

            reader.onerror = (error) => {
                console.error("[ERROR] UploadChat.useEffect[selectedFile].reader.onerror :: Error reading file:", error);
                setParsingError("Failed to read the file.");
                setParsedMessages([]);
                setIsParsing(false);
                console.log("[DEBUG] UploadChat.useEffect[selectedFile].reader.onerror :: Parsing state set to false.");
            };

            console.log("[DEBUG] UploadChat.useEffect[selectedFile] :: Calling reader.readAsText().");
            reader.readAsText(selectedFile); // Read the file as text

        } else {
            // Clear messages if file is removed
            console.log("[DEBUG] UploadChat.useEffect[selectedFile] :: No file selected, clearing parsed messages and errors.");
            setParsedMessages([]);
            setIsParsing(false);
            setParsingError(null);
        }
    }, [selectedFile]); // Re-run only when selectedFile changes


    // --- Drag and Drop Handlers ---
    const handleDragEnter = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("[DEBUG] UploadChat.handleDragEnter :: Drag entered drop zone.");
        setIsDragActive(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.currentTarget.contains(e.relatedTarget)) {
            console.log("[DEBUG] UploadChat.handleDragLeave :: Drag left to a child element, staying active.");
            return;
        }
        console.log("[DEBUG] UploadChat.handleDragLeave :: Drag left drop zone boundary.");
        setIsDragActive(false);
    }, []);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isDragActive) setIsDragActive(true);
    }, [isDragActive]);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("[DEBUG] UploadChat.handleDrop :: File dropped.");
        setIsDragActive(false);
        setParsedMessages([]); // Clear previous preview on new drop
        setParsingError(null);
        setIsParsing(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            if (e.dataTransfer.files.length > 1) {
                console.warn("[WARN] UploadChat.handleDrop :: Multiple files dropped, selecting only the first.");
            }
            const file = e.dataTransfer.files[0];
            console.log(`[INFO] UploadChat.handleDrop :: File selected via drop: ${file.name}, Type: ${file.type}, Size: ${file.size}`);
            if (file.type !== 'text/plain' && !file.name.endsWith('.txt')) {
                console.warn(`[WARN] UploadChat.handleDrop :: Dropped file type (${file.type}) or name is not plain text/txt. Proceeding anyway.`);
            }
            setSelectedFile(file); // Triggers the useEffect for parsing
            e.dataTransfer.clearData();
        } else {
            console.log("[DEBUG] UploadChat.handleDrop :: No files found in drop event.");
        }
    }, []);

    // --- File Input and Removal Handlers ---
    const handleFileChange = (e) => {
        e.preventDefault();
        console.log("[DEBUG] UploadChat.handleFileChange :: File input changed.");
        setParsedMessages([]); // Clear previous preview on new selection
        setParsingError(null);
        setIsParsing(false);

        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            console.log(`[INFO] UploadChat.handleFileChange :: File selected via input: ${file.name}, Type: ${file.type}, Size: ${file.size}`);
            if (file.type !== 'text/plain' && !file.name.endsWith('.txt')) {
                console.warn(`[WARN] UploadChat.handleFileChange :: Selected file type (${file.type}) or name is not plain text/txt. Proceeding anyway.`);
            }
            setSelectedFile(file); // Triggers the useEffect for parsing
            if (inputRef.current) inputRef.current.value = '';
        } else {
            console.log("[DEBUG] UploadChat.handleFileChange :: No files selected in input.");
        }
    };

    const handleRemoveFile = () => {
        console.log("[DEBUG] UploadChat.handleRemoveFile :: Remove file button clicked.");
        setSelectedFile(null); // This will trigger the useEffect to clear parsedMessages etc.
        if (inputRef.current) inputRef.current.value = '';
        console.log("[INFO] UploadChat.handleRemoveFile :: Selected file removed, state cleared via useEffect.");
    };

    // --- Upload Action ---
    const handleUpload = async () => {
        if (!selectedFile) {
            console.warn("[WARN] UploadChat.handleUpload :: Upload clicked but no file selected.");
            return;
        }
        if (isParsing) {
            console.warn("[WARN] UploadChat.handleUpload :: Upload clicked while parsing is in progress.");
            return;
        }
        if (parsingError) {
            console.warn("[WARN] UploadChat.handleUpload :: Upload clicked but there was a parsing error.");
            // Maybe allow upload anyway, depending on requirements
        }
        console.log(`[INFO] UploadChat.handleUpload :: Initiating upload for file: ${selectedFile.name}`);
        // --- Backend Integration Placeholder ---
        alert(`Placeholder: Upload action triggered for ${selectedFile.name}. Implement backend call.`);
        console.log("[DEBUG] UploadChat.handleUpload :: Placeholder upload action completed.");
        // Consider clearing the file/preview on successful upload:
        // handleRemoveFile();
        // --- Backend Integration End ---
    };

    // --- Helper to trigger file input ---
    const onButtonClick = () => {
        console.log("[DEBUG] UploadChat.onButtonClick :: Drop zone clicked, triggering file input.");
        if (inputRef.current) {
            inputRef.current.click();
        } else {
            console.error("[ERROR] UploadChat.onButtonClick :: Input ref not available.");
        }
    };


    // --- Render Logic ---
    console.log("[DEBUG] UploadChat.UploadChat :: Rendering component structure.");
    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
            {console.log("[DEBUG] UploadChat.UploadChat :: Rendering title.")}
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Upload Chat Transcript
            </Typography>

            {console.log("[DEBUG] UploadChat.UploadChat :: Rendering drop zone Paper.")}
            {/* --- Drop Zone Area --- */}
            <Paper
                onClick={!selectedFile ? onButtonClick : undefined}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                elevation={0}
                sx={{
                    border: (theme) => `2px dashed ${isDragActive ? theme.palette.primary.main : theme.palette.grey[400]}`,
                    borderRadius: '12px',
                    p: { xs: 3, sm: 4, md: 5 },
                    textAlign: 'center',
                    cursor: !selectedFile ? 'pointer' : 'default',
                    backgroundColor: isDragActive
                        ? (theme) => alpha(theme.palette.primary.main, 0.05)
                        : 'background.paper',
                    transition: (theme) => theme.transitions.create(['border-color', 'background-color'], {
                        duration: theme.transitions.duration.short,
                    }),
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '200px',
                }}
            >
                <input ref={inputRef} type="file" accept=".txt,text/plain" onChange={handleFileChange} style={{ display: 'none' }} aria-hidden="true" />

                {!selectedFile ? (
                    // Idle / Drag Active State
                    <>
                        {console.log("[DEBUG] UploadChat.UploadChat :: Rendering idle/drag state.")}
                        <CloudUploadIcon sx={{ fontSize: 60, color: isDragActive ? 'primary.main' : 'grey.500', mb: 2, transition: 'color 0.2s ease-in-out' }} />
                        <Typography variant="h6" sx={{ mb: 1, color: isDragActive ? 'primary.main' : 'text.primary' }}>
                            {isDragActive ? "Drop the file here!" : "Drag & drop chat file here"}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            or click to select file (.txt format)
                        </Typography>
                    </>
                ) : (
                    // File Info Display (Always show this when file is selected)
                    <>
                        {console.log(`[DEBUG] UploadChat.UploadChat :: Rendering selected file info: ${selectedFile.name}`)}
                        <InsertDriveFileIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                        <Typography variant="h6" sx={{ mb: 0.5, wordBreak: 'break-all', fontSize: '1.1rem' }}>
                            {selectedFile.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            ({(selectedFile.size / 1024).toFixed(2)} KB)
                        </Typography>
                    </>
                )}
            </Paper>

            {/* --- Loading Indicator --- */}
            {isParsing && (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
                    {console.log("[DEBUG] UploadChat.UploadChat :: Rendering parsing indicator.")}
                    <CircularProgress size={24} sx={{ mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">Parsing file...</Typography>
                </Box>
            )}

            {/* --- Parsing Error Display --- */}
            {parsingError && (
                <Alert severity="error" sx={{ mt: -1, mb: 1 }}>
                    {console.log(`[DEBUG] UploadChat.UploadChat :: Rendering parsing error: ${parsingError}`)}
                    {parsingError}
                </Alert>
            )}

            {/* --- Chat Preview Area (Conditionally Rendered) --- */}
            {selectedFile && !isParsing && !parsingError && parsedMessages.length > 0 && (
                <Box>
                    {console.log("[DEBUG] UploadChat.UploadChat :: Rendering Chat Preview section.")}
                    <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600 }}>
                        Chat Preview ({parsedMessages.length} messages)
                    </Typography>
                    <Paper
                        elevation={1}
                        sx={{
                            maxHeight: '400px',
                            overflowY: 'auto',
                            border: (theme) => `1px solid ${theme.palette.divider}`,
                            borderRadius: '8px',
                        }}
                    >
                        <List dense disablePadding>
                            {console.log("[DEBUG] UploadChat.UploadChat :: Mapping parsed messages for preview list.")}
                            {parsedMessages.map((msg, index) => (
                                <ListItem
                                    key={msg.id}
                                    divider={index < parsedMessages.length - 1}
                                    sx={{ alignItems: 'flex-start' }}
                                >
                                    <ListItemText
                                        primary={
                                            <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                                                {msg.message}
                                            </Typography>
                                        }
                                        secondary={
                                            <>
                                                <Typography component="span" variant="caption" sx={{ fontWeight: 'medium', color: 'text.primary', mr: 0.5 }}>
                                                    {msg.sender}
                                                </Typography>
                                                <Typography component="span" variant="caption" color="text.secondary">
                                                    {' - '}{msg.timestamp}
                                                </Typography>
                                            </>
                                        }
                                        sx={{ my: 0.5 }}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Box>
            )}

            {/* --- Action Buttons (Only show if a file is selected) --- */}
            {selectedFile && (
                <Stack direction="row" spacing={1.5} alignItems="center" justifyContent="flex-end" sx={{ mt: 1 }}>
                    {console.log("[DEBUG] UploadChat.UploadChat :: Rendering action buttons (Upload/Remove).")}
                    <Button
                        variant="contained"
                        onClick={handleUpload}
                        startIcon={<UploadFileIcon />}
                        disabled={isParsing || !!parsingError}
                    >
                        Upload File
                    </Button>
                    {/* THIS is where the error was - Tooltip needs to be imported */}
                    <Tooltip title="Remove selected file" arrow>
                        <span>
                            <IconButton onClick={handleRemoveFile} size="medium" aria-label="Remove selected file" >
                                <CloseIcon />
                            </IconButton>
                        </span>
                    </Tooltip>
                </Stack>
            )}

            {console.log("[DEBUG] UploadChat.UploadChat :: Component rendering finished.")}
        </Box>
    );
}
