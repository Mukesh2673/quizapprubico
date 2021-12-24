router.post('/login',async(req,res)=>{
    

    let userlogin=req.body;
     let user=await db.userLogin(req,res,userlogin);
     

        if(user)
        {
            let password=user.password
            let password1=userlogin.password;
           
        
            const isMatch=await bcrypt.compare(password1,password);
            if (!isMatch){
          
                 res.status(400).json({
                  message: "Incorrect Password !"
                });
            }
            const payload={
                user:{
                    id:user.id
                }
            };
            Jwt.sign(
                payload,process.env.SECRET_KEY,
                {
                    expiresIn:36000000
                },
                (err,token)=>{
                    if(err)throw err;
                    res.cookie('authcookie',token,{maxAge:900000,httpOnly:true});//set token in cookies 
                    res.status(200).json({
                        token
                    });
                }
        
            );
            }
    
    
    
    
        })