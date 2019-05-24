const express = require('express');
const router = express.Router();

/* GET home page. */
router.post('/api/booking', (req, res) => {
  console.log(req.body);
  res.render('index', {
    context: {
      thebody: req.body
    }
  });
});

router.get('/', (req, res) => res.render('index'));

module.exports = router;
