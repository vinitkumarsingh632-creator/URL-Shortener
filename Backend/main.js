import express from 'express'
import cors from 'cors'
import {collection} from './db.js'
const app = express()

app.use(express.json())
app.use(cors())
app.get('/ly',(req,res)=>{
    
})
app.post('/url',async(req,res)=>{
    const randomCode = Math.random().toString(36).substring(2, 8)
    console.log(randomCode)
    let data;
   
      data = await collection.findOne({
        longURL:req.body.fullURL
     })
     if(!data){
        try{
            await collection.create({
            longURL:req.body.fullURL,
            shortURL:randomCode
         })
         data = randomCode
         }
         catch(err){
            console.log(err)
         }
     }
     
   
   
         
   
   console.log(data)
    res.json({
        shortURL:`http://localhost:4000/ly/${data}`
    })
})
app.listen(4000,()=>{
    console.log('Started')
})