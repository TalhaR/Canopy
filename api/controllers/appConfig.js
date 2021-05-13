const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    title: 'Canopy',
    description: 'A paper stock trading app for beginners.',
  });
});


module.exports = router;