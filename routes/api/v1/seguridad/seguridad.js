const express = require("express");
const router = express.Router()

router.post('/sigin', async (req, res) => {
  res.status(502).json({msg: 'Not implemented'})
})

router.post('/login', async(req, res){
  res.status(502).json({msg: 'Not implemented'})
})

module.exports = router;