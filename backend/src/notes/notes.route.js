const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/', async (req, res) => {
  const { subject } = req.query;
  if (!subject) return res.status(400).json({ error: 'Subject is required' });

  try {
    // Replace this URL with an actual external API that serves PDF/book content
    const response = await fetch(`https://external-api.com/books?subject=${subject}`);
    const data = await response.json();

    // Return only necessary info
    const filteredNotes = data.map((item) => ({
      title: item.title,
      pdfUrl: item.pdfUrl
    }));

    res.json(filteredNotes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

module.exports = router;
