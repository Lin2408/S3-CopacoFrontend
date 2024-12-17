import React, {useState} from 'react';
import axios from 'axios';
import {Box, Button, CircularProgress, Input} from "@mui/material";
import {callExternalApi} from "../Apis/external-api.service.js";
import {useAuth0} from "@auth0/auth0-react";

function FileImport() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const {getAccessTokenSilently } = useAuth0();
    const [loading, setLoading] = useState(false);

    // Handle file selection
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    // Handle file upload

    const handleFileUpload = async () => {
        if (!file) {
            setMessage("Please select a file first!");
            return;
        }
        setLoading(true);
        try {
            const fileContent = await file.text();
            const jsonData = JSON.parse(fileContent);
            console.log(jsonData);

            // Transform the JSON structure
            const uniqueIds = new Set();
            const transformedData = {
                items: jsonData
                    .filter(item => item['icecat-name'] && item['icecat-manufacturerName']) // Filter out items without name or manufacturer
                    .filter(item => {
                        if (uniqueIds.has(item.icecatId)) {
                            return false;
                        } else {
                            uniqueIds.add(item.icecatId);
                            return true;
                        }
                    })
                    .map(item => ({
                        icecatId: item.icecatId,
                        name: item['icecat-name'],
                        manufacturer: item['icecat-manufacturerName'],
                        descriptions: item.descriptions,
                        images: Array.isArray(item['icecat-images']) ? item['icecat-images'].map(url => (url)) : [],
                        price: item.sbp,
                        categories: item['icecat-categories'],
                        specifications: item['icecat-specifications']
                    }))
            };
            console.log(transformedData);

            const options = {
                config: {
                    method: 'post',
                    url: 'http://localhost:6060/import',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${ await getAccessTokenSilently()}`,
                    },
                    data: JSON.stringify(transformedData)
                }
            };

            const response = await callExternalApi(options);

            if (response.error) {
                setMessage(response.error.message);
            } else {
                setMessage("Data imported successfully!");
            }

        } catch (error) {
            setMessage("An error occurred while uploading the file.");
            console.error(error);
        } finally { setLoading(false);}
    };

    return (
        <>
            <Box>
                <Box >
                    <Input sx={{mr: 4}} type="file" accept=".json" onChange={handleFileChange}/>
                    <button disabled={loading} onClick={handleFileUpload}>{loading ? <CircularProgress size={20} sx={{color: 'white', m: 'auto'}}/> : 'Upload'}</button>


                </Box>

                {message && <p>{message}</p>}
            </Box>

        </>
    );

}

export default FileImport;