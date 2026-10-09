import express from 'express'
import cors from 'cors'
import {collection} from './db.js'
const app = express()

app.use(express.json())
app.use(cors())
app.get('/ly/:id',async(req,res)=>{
  const data = await collection.findOne({
    shortURL:req.params.id
  })
  if(data){
    res.redirect(data.longURL)
  }
  else{
    res.header('content-type','text/html')
    res.send(`
        <h2>This is a wrong URL</h2>`)
  }
})
app.post('/url',async(req,res)=>{
    const randomCode = Math.random().toString(36).substring(2, 8)
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
     }else{
        data = data.shortURL
     }
     
    res.json({
        shortURL:`https://warm-valley-7118.de.deplexo.com/ly/${data}`
    })
})
app.get('/start',(req,res)=>{
  res.status(200)
  res.send('OK')
})
app.listen(process.env.PORT,()=>{
    console.log('Started')
})