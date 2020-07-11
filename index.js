const http=require('http');
const express=require('express');
const path=require('path');
const bodyparser=require('body-parser');
const morgan=require('morgan');
const { urlencoded } = require('body-parser');

const MongoClient=require('mongodb').MongoClient;
const assert=require('assert');


const url="mongodb://localhost:27017/";
const dbname='resumeFeedback';

 
   
   
const port=3000;
const hostname='localhost';
const app=express();
app.use(morgan('dev'));
app.use(bodyparser.json());
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(__dirname + '/public'));

const server = http.createServer(app);

app.post('/form', function(req, res){
   
    MongoClient.connect(url).then((client) => {

        console.log('Connected correctly to server');
        const db = client.db(dbname);
        db.collection('feedbacks').insertOne(req.body);
        res.redirect("contactus.html");
        
    });
    
});
  

  
app.use((req,res,next) =>{
    
   res.sendFile(path.join(__dirname + '/public/index.html'))
  
  });
  
  
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});