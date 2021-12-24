

const mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/quizsystem';
mongoose.connect(mongoDB,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>console.log("connection Success Full"))
.catch((err)=>console.log(err));
const {Userregister}=require("./Model/Userregister");
const {Quizdetails,Quizquestions}=require("./Model/quizdetailsmodel");





exports.insertquiz=async function(userInput,userDetails,req,res){

    const Insertdata=new Quizdetails({
        Username:userDetails.username,
        Answers:userInput
    })
  
   Insertdata.save(function(err){
        if(err){
            res.sendStatus(500); 
           console.log(err);
        
        }
        else{
            res.sendStatus(200);
        }

    });
  

}
//get all data 
exports.userdetails=async function(req,res){
    const alldata= await Quizdetails.find({});
    let a=alldata[0].Answers[0];
    return alldata;
    
},
//get data by id

exports.userAnswerdetails=async function(t,req,res){
    const useranswer=await Quizdetails.findById(Object.values(t));
    res.send(useranswer);
}
//get questions answer quiz details
exports.quizdetails=async function(req,res){
    const quiz=await Quizquestions.find({});
    res.status(200).send(quiz[0]);

}
//register
exports.userregisterdetails=async function (userdata,req,res){
    console.log(userdata.password);
    const salt=await bcrypt.genSalt(10);
    const bpass=await bcrypt.hash(userdata.password,salt);
    const Insertuserdata=new Userregister({
        Username:userdata.username,
        password:bpass,
        Email:userdata.Email,
        Mobile:userdata.Mobile
    })
    Insertuserdata.save(function(err){
        if(err){
            res.sendStatus(500); 
           console.log(err);
        
        }
        else{
            console.log('hi');
            res.sendStatus(200);
        }

    });
}
//login
exports.userLogin=async function(req,res,userlogin){
    let username=userlogin.username;
    let password1=userlogin.password;
    try {
     let user=await Userregister.findOne({Username:username})
    

     if(!user)
        {
            res.status(200).json({
                message: "UserNotFound"
            });
        }
     else{
         return user;
        }   

    }

    
    catch (e) {
        console.error(e);
        res.status(500).json({
          message: "Server Error"
        });
      }
    }