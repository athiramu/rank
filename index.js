const express = require ('express')
const bodyParser = require('body-parser')
const connectDb = require('./db')
const playerRoutes = require('./controller/playerController')


const app=express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())



app.use('/players',playerRoutes)
connectDb()
.then(data=>{
    console.log('db connection succeeded');
    app.listen(3000,()=>{
        console.log('Server started at 3000');
        
    })
})
.catch(err => console.log('error in connecting db:',err))