const mongoose  = require("mongoose");
const Sell_Data = new mongoose.Schema({
    
    date:{type:String},
    Month:{type:String},
    year:{type:String},
    day:{type:String},
    Sell_Time:{type:String},
    payment_method: {
        type: String,
        enum: ['cash', 'online'],
        required: true,
    },
    payment_Status: {
        type: String,
        enum: ['Received', 'Panding'],
        required: true,
    },
    customer_id:{type:String},
    user_id:{type:String}
});


const Sell_Data_Schema = mongoose.model('customer', Sell_Data);
module.exports=Sell_Data_Schema;