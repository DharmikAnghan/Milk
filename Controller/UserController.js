var form=require("../Model/RegisterForm");
var customer_data=require("../Model/Final_Bill_Data");
var Milk_Data_Require=require("../Model/Milk_Data");
var product_Add_Data=require("../Model/Product_Add");
const storage = require('node-persist');


var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {   
    user: 'savanim469@gmail.com',
    pass: 'wxgyhuuamlfqcxye'
  }
});

const Registration_data=async(req,res)=>{
    var d=await form.find({'Mobile_Number':req.body.Mobile_Number});
    var d1=await form.find({'email':req.body.email});
    if(d.length==0)
    {
        if(d1.length==0)
        {
            var a = await form.create(req.body);
            var otp = ("" + Math.random()).substring(2, 8)

            var mailOptions = {
                from: 'savanim469@gmail.com',
                to: req.body.email,
                subject: 'Sending Email using Node.js',
                text: otp
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                    res.status(200).json(
                        a
                   )
                }
              });
            
        }
    }
    else
    {
        if(d.length!=0){
        res.status(200).json({
           status:"Your Number is already register"
        })}
        if(d1.length!=0){
            res.status(200).json({
               status:"Your Email is already register"
            })}
    }
};
const Registration_data_Get=async(req,res)=>{
    //only req.qurey lakhvu
    var id1 = req.query;
    var data= await form.find(id1);
    res.status(200).json(
        data
    )
};

const Registration_data_Update=async(req,res)=>{
    var id = req.params.id;
    var data= await form.findByIdAndUpdate(id,req.body);

    res.status(200).json(
        data
    )
};

const Login_Data=async(req,res)=>
{
    await storage.init( /* options ... */ );
    var id =  await storage.getItem('user_id');
    req.body.user_id=id;
    
    var data = await form.find({"Mobile_Number":req.body.Mobile_Number});


   if(data.length!=0)
   {
        if(data[0].password==req.body.password)
        {
            await storage.init( /* options ... */ );
            await storage.setItem('user_id',data[0].id);

            res.status(200).json(
                "success"
            )
        }
        else
        {
            res.status(200).json(
                "check your email and password"
            )
        }
   }
   else
   {
        res.status(200).json(
            "check your email and password"
        )
   }
};

const customer_Sell_Data=async(req,res)=>{

    await storage.init( /* options ... */ );
    var id =  await storage.getItem('user_id');
    req.body.user_id=id;

    const currentDate = new Date();
    req.body.date=currentDate.getDate();
    req.body.Month=currentDate.getMonth() + 1;
    req.body.year=currentDate.getFullYear();

    const dayOfWeek = currentDate.getDay();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    req.body.day= days[dayOfWeek];

    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const amOrPm = hours >= 12 ? "PM" : "AM";

    const twelveHourFormat = hours % 12 || 12;

    const currentTime = `${twelveHourFormat}:${minutes}: ${amOrPm}`;
    req.body.Sell_Time=currentTime;

    var a=await customer_data.create(req.body);
    res.status(200).json(
        a
    )
};

const Milk_Data=async(req,res)=>{

    await storage.init( /* options ... */ );
    var id =  await storage.getItem('user_id');
    req.body.user_id=id;

    const currentDate = new Date();
    req.body.date=currentDate.getDate();
    req.body.Month=currentDate.getMonth() + 1;
    req.body.year=currentDate.getFullYear();

    var a=await Milk_Data_Require.create(req.body);
    res.status(200).json(
        a
    )
};

const _Product_data_= async(req,res)=>
{
    await storage.init( /* options ... */ );
    var id =  await storage.getItem('user_id');
    req.body.user_id=id;

    var obj = {
        "product_name":req.body.product_name,
        "product_price":req.body.product_price,
        "product_image":req.file.originalname,
        "user_id":req.body.user_id
       }
    var a=await product_Add_Data.create(obj);
    res.status(200).json(
        a
    )
};
module.exports={Registration_data,Login_Data,customer_Sell_Data,Registration_data_Get,Milk_Data,
    Registration_data_Update,_Product_data_}