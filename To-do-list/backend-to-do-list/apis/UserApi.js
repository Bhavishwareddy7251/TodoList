const exp = require('express')
const userModel = require('../models/UserModel')
const getTaskModel=require('../models/TasksModel')

const userApi = exp.Router()
userApi.use(exp.json())

userApi.get('/users',async(req,res)=>{
    try{
        const users = await userModel.find()
        res.send({message:"Got user data",payload:users})
    }catch(err){
        res.send({message:"Got Error ",error:err})
    }
})

// register user
userApi.post('/register',async(req,res)=>{
    try{
        const data = req.body
        const dataTosave = new userModel(data)
        await dataTosave.save()
        res.send({message:"data stored",payload:dataTosave})
    }catch(err){
        res.send({message:"Error",error:err})
    }
})

// delete user
userApi.delete('/delete/:name',async(req,res)=>{
    const name = req.params.name
    try{
        const result = await userModel.deleteOne({name:name})
        res.send({message:"Deleted User",payload:result})
    }catch(err){
        res.send({message:"Cannot Delete User: ",error:err.message})
    }

})

// user login
userApi.post('/login', async (req, res) => {
    const userCredObj = req.body;

    let userInDb = await userModel.findOne({ email: userCredObj.email });
    console.log(userInDb)
    if (userInDb === null) {
        res.send({ message: "You haven't Registered yet" });
    } else {
        let isPasswordValid = (userCredObj.password === userInDb.password);
        if (isPasswordValid) {
            res.send({ message: "Logging in.." ,payload:userInDb,found:true});
            let collectionnameId=userInDb._id.toString()
            let tasksModel = getTaskModel(collectionnameId)
            // update today -> pending
            const today = new Date().toISOString().split('T')[0];
            await tasksModel.updateMany(
                { status: "today", date: { $lt: today } },
                { $set: { status: "pending" } } 
            );

        } else {
            res.send({ message: "Invalid Password.", payload: userInDb.toObject(),found:false });
        }
    }
});


module.exports = userApi