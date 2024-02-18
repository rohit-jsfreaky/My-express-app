const { default: axios } = require("axios");
const express = require("express");
const { copyFileSync } = require("fs");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.static(__dirname + '/images'));
app.use(express.static(__dirname + '/js'));

app.get("/",async (req,res)=>{  
    res.sendFile("index.html",{root : path.join(__dirname)})
})


app.get("/api",async (req,res)=>{
    console.log(req._parsedUrl.query);
    let url ="https://newsapi.org/v2/everything?" + req._parsedUrl.query;
    let r = await axios(url);
    let a = r.data
    res.json(a);
})

app.listen(port ,()=>{
    console.log(`app listening on ${port}`);
})