import React, { useState, useEffect } from 'react';
import { FormLabel,
          Button,
          Typography,
          Box,
          ListItem,
          IconButton,
          Grid,
        
        } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import { Remove } from '@mui/icons-material';
import DataInput from './DataInput';
import { useNavigate } from "react-router-dom";

const UploadFile = () => {
  const [files, setFiles] = useState([]);
  const [uploadedFileNames, setUploadedFileNames] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);

  const handleDrop = (e) => {
    e.preventDefault();
    const newFiles = e.dataTransfer.files;
    handleChange(newFiles);
  };

  const handleChange = (newFiles) => {
    // Store the uploaded files
    setFiles([...files, ...newFiles]);

    // Extract and store the names of the uploaded files
    const fileNames = Array.from(newFiles).map((file) => file.name);
    setUploadedFileNames([...uploadedFileNames, ...fileNames]);

    // Load image previews for image files (modify this logic for other file types)
    const imageFiles = Array.from(newFiles).filter((file) =>
      file.type.startsWith('image/')
    );
    const imagePreviews = imageFiles.map((file) => URL.createObjectURL(file));
    setFilePreviews([...filePreviews, ...imagePreviews]);
  };

  const handleRemoveFile = (indexToRemove) => {
    const updatedFiles = files.filter((file, index) => index !== indexToRemove);
    const updatedFileNames = uploadedFileNames.filter((name, index) => index !== indexToRemove);
    const updatedFilePreviews = filePreviews.filter((preview, index) => index !== indexToRemove);
    setFiles(updatedFiles);
    setUploadedFileNames(updatedFileNames);
    setFilePreviews(updatedFilePreviews);
  };
  // upload data to backend
  const UploadData = new FormData();
  files.forEach((file) => {
    UploadData.append("file", file);
  });
  const navgate = useNavigate();
  
  const handleSubmission = () => {
    // if upload data is empty
    if (files.length === 0) {
      alert("Please upload a file");
      return;
    }
    // if upload data is not empty
    else {
      const formData = new FormData();
  
      // Add each file to the FormData object
      files.forEach((file) => {
        formData.append("file", file);
      });
  
      // Send a POST request to your Flask server
      fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('access_token')}`, // Include token here
    },
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          navgate("/result");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  
  // const handleSubmission = () => {
  //   // if upload data is empty
  //   if (files.length === 0) {
  //     alert("Please upload a file");
  //     return;
  //   }
  //   // if upload data is not empty
  //   else {
  //     fetch("http://127.0.0.1:5000/upload", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //     body: UploadData,
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       navgate("/result");
  //     }
  //     )
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  //   }
    

  // };

  useEffect(() => {
    // Clean up the URL objects when the component is unmounted or when filePreviews changes
    return () => {
      filePreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [filePreviews]);

  const handleFileClick = (e, index) => {
    e.stopPropagation(); // Stop the file preview from being removed
    
  };

const showUploadedFiles = () => (
  <div className="mt-2">
    <Typography 
      variant="h6" 
      marginBottom={"4px"}
      margin={"0 0 4px 10px"}
      sx={{fontWeight:"bold"}}
    >
      Uploaded Files:
    </Typography>
    <ul>
      {uploadedFileNames.map((name, index) => (
        <Box display={"flex"} key={index}> {/* Add key prop here */}
          <ListItem className="flex-col" key={index}> {/* Add key prop here */}
            <div className='flex'>
              <a
                href={filePreviews[index]}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleFileClick(e, index)}
              >
                <Typography variant="h6" marginBottom={"4px"} marginRight={"8px"} >
                  {name.substring(0, 20)}
                </Typography>
              </a>
              <div>
                <IconButton aria-label="delete" size="small" sx={{color:"#22d3ee"}}>
                  <RemoveIcon onClick={() => handleRemoveFile(index)}  />
                </IconButton>
              </div>
            </div>
            
          </ListItem>
        </Box>
      ))}
    </ul>
  </div>
);




  const showUploadSection = () => (
    <div
      className="flex items-center justify-center bg-teal-50 rounded-lg mt-1"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 rounded-lg cursor-pointer bg-teal-50 hover:bg-[#000000]"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6 updrop">
          <svg
            className="w-10 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={(e) => handleChange(e.target.files)}
          required
        />
      </label>
    </div>
  );

  return (
    <div className="flex flex-col ">
      <FormLabel className="items-center upload rounded-lg mt-4 mb-4 shadow">
        <div className=" flex justify-center">
          <Typography
          varient="h2"
          sx={{
            width:"190px",
            margin:"auto",
            marginTop:"15px",
            fontSize:"15px",
            textAlign:"center",
            color:"#ffffff",
            backgroundColor:"#22d3ee",
            borderRadius:"15px",
            padding:"8px 10px",
      
            }}>
              Upload Patient Video
          </Typography >
        </div>
        <Grid onClick={handleFileClick} >
          {uploadedFileNames.length > 0 ? showUploadedFiles() : showUploadSection()}
        </Grid>
        
      </FormLabel>
      
      {/* <DataInput /> */}
      {/* make div center */}
      <div className="flex justify-center">
      <button
            id="upload_data"
            type='submit'
            htmlFor = "dropzone-file"
            className="btn  hover:bg-blue-200 focus:ring-blue-800"
            onClick={handleSubmission}
          >
            Upload
          </button>
      </div>
    </div>
  );
};

export default UploadFile;
