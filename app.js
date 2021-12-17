const express=require("express")
var bodyParser=require('body-parser')
var cors=require('cors');
var app=express()
app.use(bodyParser.json())
app.use(cors())
const port=1100
var question=require('./attemptedquestion')
app.get('/', (req, res) => {
    res.send('Hello World!')
  });

  app.use("/submited",question);

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });
 

