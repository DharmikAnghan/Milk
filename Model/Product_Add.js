const mongoose  = require("mongoose");
const product_Data = new mongoose.Schema({
    
    product_name:{type:String},
    product_price:{type:String},
    product_image:{type:String}
});

const product_Add_ = mongoose.model('Product', product_Data);
module.exports=product_Add_;