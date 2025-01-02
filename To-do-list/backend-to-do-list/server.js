const exp = require('express')
const app = exp()

const cors = require('cors')
app.use(cors())

const mongoose = require('mongoose')
const UserApi = require('./apis/UserApi')
const TaskApi = require('./apis/TaskApi')
app.use('/user-api',UserApi)
app.use('/task-api',TaskApi)

async function mongoConnect(){
    mongoose.connect('mongodb://localhost:27017/to-do-list')
    app.listen(3001,()=>{console.log("Port is running on 3001")})
    console.log("Connected to db..")
}
mongoConnect()