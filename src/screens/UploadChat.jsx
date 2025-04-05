// src/screens/UploadChat.jsx
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Box, Paper, Typography, IconButton, Button, Stack, Input, SvgIcon, Tooltip } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; // More visual icon for dropzone
import { alpha } from '@mui/material/styles'; // For translucent background

console.log("[DEBUG] UploadChat.jsx :: Module loaded.");

export default function UploadChat() {
    console.log("[DEBUG] UploadChat.UploadChat :: Component rendering started.");
    const [isDragActive, setIsDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const inputRef = useRef(null); // Ref for the hidden file input

    useEffect(() => {
        console.log("[INFO] UploadChat.UploadChat :: Component mounted.");
        return () => {
            console.log("[INFO] UploadChat.UploadChat :: Component will unmount.");
        };
    }, []);

    useEffect(() => {
        console.log(`[DEBUG] UploadChat.UploadChat :: State updated - isDragActive: ${isDragActive}, selectedFile: ${selectedFile?.name ?? 'null'}`);
    }, [isDragActive, selectedFile]); // Log state changes

    const handleDragEnter = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("[DEBUG] UploadChat.handleDragEnter :: Drag entered drop zone.");
        setIsDragActive(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        // Check if the leave target is outside the component boundary
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
        // console.log("[DEBUG] UploadChat.handleDragOver :: Dragging over drop zone."); // Can be noisy
        if (!isDragActive) setIsDragActive(true); // Ensure active state if missed enter
    }, [isDragActive]); // Added dependency

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("[DEBUG] UploadChat.handleDrop :: File dropped.");
        setIsDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            if (e.dataTransfer.files.length > 1) {
                console.warn("[WARN] UploadChat.handleDrop :: Multiple files dropped, selecting only the first.");
                // Optionally show a user message here
            }
            const file = e.dataTransfer.files[0];
            console.log(`[INFO] UploadChat.handleDrop :: File selected via drop: ${file.name}, Type: ${file.type}, Size: ${file.size}`);
            // Basic validation (optional, can be more specific)
            if (file.type !== 'text/plain' && !file.name.endsWith('.txt')) {
                console.warn(`[WARN] UploadChat.handleDrop :: Dropped file type (${file.type}) or name is not plain text/txt. Allowing for now.`);
                // alert("Please upload a .txt file."); // Stricter validation
                // return;
            }
            setSelectedFile(file);
            e.dataTransfer.clearData(); // Clean up
        } else {
            console.log("[DEBUG] UploadChat.handleDrop :: No files found in drop event.");
        }
    }, []);

    const handleFileChange = (e) => {
        e.preventDefault();
        console.log("[DEBUG] UploadChat.handleFileChange :: File input changed.");
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            console.log(`[INFO] UploadChat.handleFileChange :: File selected via input: ${file.name}, Type: ${file.type}, Size: ${file.size}`);
            // Basic validation (optional)
            if (file.type !== 'text/plain' && !file.name.endsWith('.txt')) {
                console.warn(`[WARN] UploadChat.handleFileChange :: Selected file type (${file.type}) or name is not plain text/txt. Allowing for now.`);
            }
            setSelectedFile(file);
            // Reset input value to allow selecting the same file again if removed
            if (inputRef.current) inputRef.current.value = '';
        } else {
            console.log("[DEBUG] UploadChat.handleFileChange :: No files selected in input.");
        }
    };

    const handleRemoveFile = () => {
        console.log("[DEBUG] UploadChat.handleRemoveFile :: Remove file button clicked.");
        setSelectedFile(null);
        if (inputRef.current) inputRef.current.value = ''; // Reset input
        console.log("[INFO] UploadChat.handleRemoveFile :: Selected file removed.");
    };

    // Placeholder for actual upload logic
    const handleUpload = async () => {
        if (!selectedFile) {
            console.warn("[WARN] UploadChat.handleUpload :: Upload clicked but no file selected.");
            return;
        }
        console.log(`[INFO] UploadChat.handleUpload :: Initiating upload for file: ${selectedFile.name}`);
        // --- Backend Integration Start ---
        // const formData = new FormData();
        // formData.append('chatFile', selectedFile);
        // console.log("[DEBUG] UploadChat.handleUpload :: FormData created.");
        // try {
        //     console.log("[DEBUG] UploadChat.handleUpload :: Sending request to backend...");
        //     // const response = await fetch('/api/upload-chat', { // Replace with your actual endpoint
        //     //     method: 'POST',
        //     //     body: formData,
        //     // });
        //     // console.log("[DEBUG] UploadChat.handleUpload :: Received response from backend.");
        //     // if (!response.ok) {
        //     //     throw new Error(`Upload failed with status: ${response.status}`);
        //     // }
        //     // const result = await response.json(); // Or response.text() depending on backend
        //     // console.log("[INFO] UploadChat.handleUpload :: Upload successful. Backend response:", result);
        //     // Handle success UI (e.g., show success message, clear file)
        //     alert(`Placeholder: Upload successful for ${selectedFile.name}!`); // Replace with actual UI update
        //     setSelectedFile(null);
        // } catch (error) {
        //     console.error("[ERROR] UploadChat.handleUpload :: Upload failed:", error);
        //     // Handle error UI (e.g., show error message)
        //     alert(`Placeholder: Upload failed for ${selectedFile.name}. Error: ${error.message}`); // Replace with actual UI update
        // }
        alert(`Placeholder: Upload action triggered for ${selectedFile.name}. Implement backend call.`);
        console.log("[DEBUG] UploadChat.handleUpload :: Placeholder upload action completed.");
        // --- Backend Integration End ---
    };

    // Trigger hidden file input click
    const onButtonClick = () => {
        console.log("[DEBUG] UploadChat.onButtonClick :: Drop zone clicked, triggering file input.");
        if (inputRef.current) {
            inputRef.current.click();
        } else {
            console.error("[ERROR] UploadChat.onButtonClick :: Input ref not available.");
        }
    };

    console.log("[DEBUG] UploadChat.UploadChat :: Rendering component structure.");
    return (
        <Box sx={{ width: '100%', p: { xs: 2, md: 3 } }}>
            {console.log("[DEBUG] UploadChat.UploadChat :: Rendering title.")}
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                Upload Chat Transcript
            </Typography>

            {console.log("[DEBUG] UploadChat.UploadChat :: Rendering drop zone Paper.")}
            <Paper
                onClick={!selectedFile ? onButtonClick : undefined} // Only allow click to select if no file is present
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                elevation={0} // Use border instead of shadow for dropzone look
                sx={{
                    border: (theme) => `2px dashed ${isDragActive ? theme.palette.primary.main : theme.palette.grey[400]}`,
                    borderRadius: '12px',
                    p: { xs: 3, sm: 4, md: 6 },
                    textAlign: 'center',
                    cursor: !selectedFile ? 'pointer' : 'default', // Change cursor based on state
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
                    minHeight: '250px', // Ensure a decent clickable/droppable area
                }}
            >
                {/* Hidden File Input */}
                <input
                    ref={inputRef}
                    type="file"
                    accept=".txt,text/plain" // Accept only .txt files
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    aria-hidden="true" // Hide from accessibility tree as it's triggered otherwise
                />

                {selectedFile ? (
                    // File Selected State
                    <>
                        {console.log(`[DEBUG] UploadChat.UploadChat :: Rendering selected file state: ${selectedFile.name}`)}
                        <InsertDriveFileIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                        <Typography variant="h6" sx={{ mb: 1, wordBreak: 'break-all' }}>
                            {selectedFile.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            ({(selectedFile.size / 1024).toFixed(2)} KB)
                        </Typography>
                        <Stack direction="row" spacing={1.5} alignItems="center">
                            <Button
                                variant="contained"
                                onClick={handleUpload}
                                startIcon={<UploadFileIcon />}
                            >
                                Upload File
                            </Button>
                            <Tooltip title="Remove selected file" arrow>
                                <IconButton onClick={handleRemoveFile} size="small" aria-label="Remove selected file">
                                    <CloseIcon />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    </>
                ) : (
                    // Idle / Drag Active State
                    <>
                        {console.log("[DEBUG] UploadChat.UploadChat :: Rendering idle/drag state.")}
                        <CloudUploadIcon sx={{ fontSize: 70, color: isDragActive ? 'primary.main' : 'grey.500', mb: 2, transition: 'color 0.2s ease-in-out' }} />
                        <Typography variant="h6" sx={{ mb: 1, color: isDragActive ? 'primary.main' : 'text.primary' }}>
                            {isDragActive ? "Drop the file here!" : "Drag & drop chat file here"}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            or click to select file (.txt format)
                        </Typography>
                    </>
                )}
            </Paper>
            {console.log("[DEBUG] UploadChat.UploadChat :: Component rendering finished.")}
        </Box>
    );
}
