const express =require('express')
const path = require('path')
const fs= require('fs');
const { dirname } = require('path');
// const { dir } = require('console');
const bodyparser=require('body-parser')
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactdance');
}
const app=express();
const port=80;
// defining the mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    age:String,
    number:String,
    address:String,
    date:String
  });
  const contact = mongoose.model('contact', contactSchema);



// app.use(express.static('static', options))
app.use('/static',express.static('static'))
// to use static files
app.use(express.urlencoded())
// to get the whole body
app.set('view-engine','pug')
app.set('views',path.join(__dirname,'views'))

app.get('/',(req,res)=>{
    // res.sendFile(__dirname+'/index.html')
    // so in this way we can add files

res.status(200).render('home.pug')



})
app.get('/contact',(req,res)=>{
    // res.sendFile(__dirname+'/index.html')
    // so in this way we can add files

res.status(200).render('contact.pug')



})
app.post('/contact',(req,res)=>{
    // res.sendFile(__dirname+'/index.html')
    // so in this way we can add files
    // name=req.body.name
    // age=req.body.age
    // number=req.body.number
    // address=req.body.address
    // date=req.body.date
    // const details=`client name : ${name} address: ${address}  ,number: ${number},DOB : ${date}`
    // fs.writeFileSync("details.txt",details)
var bodydata=new contact(req.body)

bodydata.save().then(()=>{
    res.send("this item is saved in database")
}).catch(()=>{
    res.status(404).send("item is not saved")
})
// res.status(200).render('contact.pug')



})
// app.post('/',(req,res)=>{
//     let b=req.body.name
//     let file=  `the client name is ${b}`
//     fs.writeFileSync('dishu.txt',file)
//     res.sendFile(__dirname+'/index.html')
//     // so in this way we can add files
    
    
//     })
    
app.listen(port,()=>{
    console.log(`this application is running on port ${port} `)
})
