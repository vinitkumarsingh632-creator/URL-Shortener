import mongoose from 'mongoose'
mongoose.connection.on('connected',()=>{
    console.log('DB Connected')
})
mongoose.connection.on('disconnected',()=>{
    console.log('DB Disconnected')
})
mongoose.connection.on('error',(err)=>{
    console.log(err)
})
await mongoose.connect(process.env.DB)

const URLSchema = mongoose.Schema(
    {
        longURL:{
            type:String,
            required:true,
            unique:true
        },
        shortURL:{
            type:String,
            required:true,
            unique:true
        }
    }
)
export const collection = mongoose.model('data',URLSchema)