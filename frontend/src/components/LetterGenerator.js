import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { API_URL } from '../config';

const LetterGenerator = ({ backendUrl }) => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [summary, setSummary] = useState('');
  const [state, setState] = React.useState({
    extra: ""
  });

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('extra', state.extra);

    

    try {
      const response = await fetch(API_URL+'/letter/', {
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
      doc.text(summary, 10, 10);
      doc.save('summary.pdf');
    };


  return (
    <div className='BillSummerizer'>
      <h3>Demand Letter Generation</h3>
      <h6 style={{marginBottom:-1}}>*upload summarized bill and additional details below if any.</h6>
      <input type="file" onChange={handleFileChange} />
      <h4 style={{marginBottom:-1}}>Additional Information</h4>
      <input
          type="text"
          placeholder="Additional Information"
          name="extra"
          value={state.extra}
          onChange={handleChange}
        />
      <button onClick={handleUpload}>Generate</button>
      {uploadStatus && <p>{uploadStatus}</p>}
      {responseData && (
        <div>
          <h3>Letter</h3>
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

export default LetterGenerator;
