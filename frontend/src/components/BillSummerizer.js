import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { API_URL } from '../config';

const BillSummerizer = ({ backendUrl }) => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [summary, setSummary] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(API_URL+'/summary/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setUploadStatus('Generated successfully.');
        const data = await response.json();
        setResponseData(data);
        // console.log(data.summary)
        setSummary(data.summary);
      } else {
        setUploadStatus('Error uploading file.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('Error uploading file.');
    }
  };


// function formatTextForPrinting(text) {
//   return text.replace(/\n/g, "\n");
// }

const handleCopy = () => {
    navigator.clipboard.writeText(summary);
  };

  
  
  const downloadAsPDF = () => {
    const doc = new jsPDF();
  
    // Set the width of the text area in the PDF document
    const maxWidth = 180; // Adjust as needed
  
    // Split the summary text into an array of lines with proper line breaks
    const lines = doc.splitTextToSize(summary, maxWidth);
  
    // Add the lines to the PDF document
    doc.text(lines, 10, 10);
  
    // Save the PDF
    doc.save('summary.pdf');
  };
  
  

  return (
    <div className='BillSummerizer'>
      <h3>Bill Summarizer</h3>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Generate</button>
      {uploadStatus && <p>{uploadStatus}</p>}
      {responseData && (
        <div>
          <h3>Summary</h3>
          <textarea
    rows={13} // Adjust the number of rows as needed
    cols={80} // Adjust the number of columns as needed
    value={summary}
    onClick={(e) => e.target.select()}
    onChange={(e) => setSummary(e.target.value)} // Optionally handle onChange event
    style={{ resize: "none", fontFamily: "monospace" }}
  /><br/>
    <button className='subtle-button' onClick={handleCopy}>Copy</button>
    <button onClick={downloadAsPDF}>Download as PDF</button>
        </div>
      )}
    </div>
  );
};

export default BillSummerizer;
