const { query } = require('express');
var express = require('express');
var app = express();
// var gogl = require('./googlesearch.js');
var bing = require('./bingsearch.js');
var duck = require('./ducksearch.js');

app.get('/search', async function(req, res){
    let search = req.query.keyword
    let bingg = await bing.run(search)
    let duckk = await duck.run(search)
    let duo = bingg | duckk
    res.send(duo)
    // if(se=bing){
        

    //     res.send(bingg)
    // }else if(se=duckduckgo){
    //     

    //     res.send(duckk)
    // }else{
    //     let both = await bing.run(search) + await duck.run(search)

    //     res.send(both)
    // }
})

app.listen(3000, () => {
    console.log("Server run on 3000")
})