// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({
    origin: 'https://backendsentiment-production.up.railway.app',
}));
app.use(express.json());

app.post('/api/analyze', async (req, res) => {
  const text = req.body.text;

  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/cmarkea/distilcamembert-base-sentiment',
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Erreur API HuggingFace:', error.response?.data || error.message);
    res.status(500).json({ error: 'Erreur API HuggingFace' });
  }
});

app.get('/', (req, res) => {
    res.send('API backend en ligne');
  });

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Backend en écoute sur le port ${port}`);
});
