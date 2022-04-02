const userModel = require('../models/user.model') //importation du usermodel

class userDao {
    //recherche user par email
 async findUserByEmail (email){
     try {
        const result = await userModel.findOne({email: email}).exec();
        return ({
            success : true ,
            data : result
        })
     } catch (error) {
         console.log("error : ",error)
         return ({
            success : false ,
            data : null
        })
         
     }

 }
 //recherche user par numero de telephone
 async findUserByPhoneNumber (phoneNumber){
    try {
       const result = await userModel.findOne({phoneNumber : phoneNumber}).exec();
       return ({
           success : true ,
           data : result
       })
    } catch (error) {
        console.log("error : ",error)
        return ({
           success : false ,
           data : null
       })
        
    }
}}

module.exports = new userDao()