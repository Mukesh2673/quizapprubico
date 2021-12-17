const mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/quizsystem';
mongoose.connect(mongoDB,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>console.log("connection Success Full"))
.catch((err)=>console.log(err));

