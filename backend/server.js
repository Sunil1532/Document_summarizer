const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const summarizeRoutes = require('./routes/summarizeRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/summarize', summarizeRoutes);

// ✅ Root route to fix "Cannot GET /"
app.get('/', (req, res) => {
  res.send('🚀 API is working!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
