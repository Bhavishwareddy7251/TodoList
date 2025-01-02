const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({

    // task: new mongoose.Schema({
        id:{type:String,required:true},
        name:{type:String,required:true,unique:true},
        status:{type:String,required:true},
        date:{type:String,required:true}
    // })
},{ "strict": "throw"})


const getTaskModel = (userId) =>{
    // console.log(userId)
    return mongoose.model(`user_${userId}_task`,taskSchema)
}

module.exports = getTaskModel