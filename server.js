const express = require('express') ;
const connectDB= require ('./config/db')
const multer = require('multer')
const ejs = require('ejs')
const path = require('path')

//Contect db
connectDB()
// Middlewate

const app = express()
app.use(express.json({ extended:false }))
app.set('view engine' , 'ejs')
app.get('/',(req,res)=>res.send('Api Running'))
app.use(express.static('./public'))
//Define Routes 
app.use('/api/users',require('./routes/api/user'))
app.use('/api/auth',require('./routes/api/auth'))
app.use('/api/profile',require('./routes/api/profile'))
app.use('/api/post',require('./routes/api/posts'))
if (process.env.NODE_ENV === 'production') {

    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
  
      res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  
    });
  
  }
  
  
const PORT = process.env.PORT || 5000;
app.listen(PORT , ()=>console.log('Server started on port',PORT))