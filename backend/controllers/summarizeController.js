const axios = require('axios');
const fs = require('fs');
const pdfParse = require('pdf-parse');


exports.summarizeText = async (req, res) => {
  try {
    const { text } = req.body;

    const response = await axios.post('http://localhost:5001/summarize', { text });
    res.json({ summary: response.data.summary });
  } catch (error) {
    console.error('Text summarization failed:', error.message);
    res.status(500).json({ error: 'Text summarization failed' });
  }
};


exports.summarizeFile = async (req, res) => {
  try {
    const filePath = req.file.path;

    const fileBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(fileBuffer);

    fs.unlinkSync(filePath); 
    const response = await axios.post('http://localhost:5001/summarize', {
      text: data.text,
    });

    res.json({ summary: response.data.summary });
  } catch (error) {
    console.error('File summarization failed:', error.message);
    res.status(500).json({ error: 'File summarization failed' });
  }
};
