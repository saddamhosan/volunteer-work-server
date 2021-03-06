const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { request } = require('express');
const app=express()
const port=process.env.PORT||5000

//middleware
app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xoizd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
    try {
        await client.connect();
        const eventCollection = client.db("volunteer-work").collection("events");
   app.get('/events',async(req,res)=>{
    const query={}
    const cursor=eventCollection.find(query)
    const result=await cursor.toArray()
    res.send(result);
   }) 

   app.post('/events',async(req,res)=>{
       const event=req.body
       console.log(event);
       const result=await eventCollection.insertOne(event)
       res.send(result)
   })

   app.delete('/event/:id',async(req,res)=>{
     const id=req.params.id
     const query={_id:ObjectId(id)}
     const result=await eventCollection.deleteOne(query)
     res.send(result)

   })
   
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/',(req,res)=>{
    res.send('welcome to volunteer work')
})

app.listen(port,()=>{
    console.log('listening to port',port);
})