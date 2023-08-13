const mongoose  = require("mongoose");
const Milk_Sell_Data = new mongoose.Schema({
    
    date:{type:String},
    Month:{type:String},
    year:{type:String},
    Morning_Milk:{type:Number},
    Night_Milk:{type:Number},
    user_id:{type:String}
});

const Milk_Data_Schema = mongoose.model('Milk_Sell', Milk_Sell_Data);
module.exports=Milk_Data_Schema;