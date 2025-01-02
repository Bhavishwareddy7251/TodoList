const mongoose = require('mongoose');

// Create user schema
const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true, 
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { "strict": "throw" }
);


const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;