const mongoose  = require("mongoose");


const Login = new mongoose.Schema({
    Mobile_Number:
    {
        type: String,
        required: true,
        unique: true,
        validate: 
        {
          validator: function (value) 
          { 
            return /^[0-9]{10}$/.test(value);
          },
          message:'Mobile number must be a 10-digit number without spaces or special characters.'
        }
    },
    password:{type:String}
});

const Login_Schema = mongoose.model('Milk1', Login);

module.exports = Login_Schema;