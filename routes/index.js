var express = require('express');
var router = express.Router();
const mongoose  = require("mongoose");
const multer = require('multer');

const {Registration_data,Login_Data,customer_Sell_Data,Registration_data_Get,Milk_Data,
    Registration_data_Update,_Product_data_}=require("../Controller/UserController");

    
// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  var upload = multer({ storage: storage })


router.post('/Registration',Registration_data);
router.get('/Registration/:email',Registration_data_Get);
router.put('/Registration/Update/:id',Registration_data_Update);
router.post('/Login',Login_Data);
router.post('/customer-Selling',customer_Sell_Data);
router.post('/Milk_Data',Milk_Data);
router.post('/Product_Add',upload.single('product_image'),_Product_data_);
module.exports = router;
