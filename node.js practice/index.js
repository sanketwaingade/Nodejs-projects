const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');


// const textIn = fs.readFileSync('./input.txt','utf-8');
// console.log(textIn);

// const textOut = `this is what we know about the avocado: ${textIn}. \nCreated on ${Date.now()} \nWritten By, \nSanket Waingade.`;
// fs.writeFileSync('./output.txt',textOut);
// console.log('file written');
// fs.readFile('output.txt','utf-8',(err,data)=>{
//     console.log("Output.txt file reading operation.... \n" + data);
// });
// console.log('file End');
//server

var tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
var tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
var tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');

var data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObj = JSON.parse(data);    
http.createServer((req,res)=>{ 
   
   const {query, pathname} = url.parse(req.url,true) ;    
    //console.log('pathname '+ pathname);
    if(pathname == '/' || pathname =='/overview'){
        res.writeHead(200,{'Content-Type':'text/html'});
        const cardsHtml = dataObj.map(el=> replaceTemplate(tempCard,el)).join('');
        let output = tempOverview.replace('{%PRODUCT_CARDS%}',cardsHtml);
        res.end(output);
    } else if(pathname =='/product'){
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct,product)
        res.end(output);
    } else if(pathname =='/api'){      
        res.writeHead(200,{'Content-Type':'application/json'});
        res.end(data);           
      
       // res.end("API");
       // console.log('Api triggered');
    } else{
        // res.writeHead(404,{
        //     'Content-Type':'text/html',
        //     'My-own-header':'hello it my header'
        // });
        res.end('<h1>Page Not Found!</h1>');
    }
    //res.end('Hello from server');
}).listen(8000,()=>{
    console.log('Listening on port 8000');
});