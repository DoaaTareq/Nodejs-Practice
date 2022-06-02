const express = require("express");
const router = express.Router();

router.get('/',async (req, res) => {
  try{
     res.render('home');
  }
  catch (error)
  {
     res.status(500).send({message: error.message});  
  }
})

module.exports = router;
