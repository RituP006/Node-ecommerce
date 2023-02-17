const express = require('express');
const path = require('path');

const rootDir = require('../utils/path');
const router = express.Router();


router.get('/add-product',(req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','admin.html'));
});

router.post('/product',(req,res,next)=>{
    console.log(req.body);
    res.send("<H1> Hello From NodeJS </h1>");
});

module.exports = router;