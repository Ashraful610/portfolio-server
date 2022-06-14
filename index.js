const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000 ;
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// middleware
app.use(express.json())
app.use(cors())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.adiia.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run () {
    try{
        await client.connect()
        const projectsCollection = client.db('portfolio-server').collection('projects')
        
        app.get('/projects' , async (req, res) => {

            const query = {}
            const cursor = projectsCollection.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })
        app.get('/projects/:id',async (req, res) => {
            const id = req.params.id
            const query = {_id:ObjectId(id)}
            const result = await projectsCollection.findOne(query)
             res.send(result)
        })
    }
    finally{

    }
}
run().catch(console.dir)



// async function run(){
//     try{
//         // const toolsCollection =  client.db('assignment-12-server').collection('tools')
//         // const reviewsCollection =  client.db('assignment-12-server').collection('reviews')
//         // const summarysCollection =  client.db('assignment-12-server').collection('summarys')
//         // const userCollection =  client.db('assignment-12-server').collection('users')
//         // const buyCollection = client.db('assignment-12-server').collection('buyTools')

//         // post buy tools
//         app.post('/buyTools',  async(req,res) => {
//             const tool = req.body
//             const result = await buyCollection.insertOne(tool)
//             res.send(result)
//         })

//         // get buy tools
//         app.get('/buyTools', async(req,res) => {
//             const query = {}
//             const cursor = buyCollection.find(query) 
//             const result = await cursor.toArray()
//             res.send(result)
//         })

//         // post  user
//         app.put('/user/:email', async (req, res) => {
//             const email = req.params.email
//             const filter = {email: email}
//             const user = req.body
//             const options = {upsert: true}
//             const updateDoc = {
//               $set:user
//             }
//             const result = await userCollection.updateOne(filter , updateDoc , options)
//             const token = jwt.sign({email:email}, process.env.ACCESS_TOKEN, {expiresIn:'1h'})
//             res.send({result ,token})
//           })
        

//         // get all users
//         app.get('/users' , async(req,res) => {
//            const query = {}
//            const cursor =  userCollection.find(query)
//            const users = await cursor.toArray()
//            res.send(users)
//         })

//         // update user profile
//         app.put('/user/:email', async (req, res) => {
//             const email = req.params.email
//             const filter = {email: email}
//             const userInfo = req.body
//             const options = {upsert: true}
//             const updateDoc = {
//               $set:userInfo,
//             }
//             const result = await userCollection.updateOne(filter , updateDoc , options)
//             const token = jwt.sign({email:email}, process.env.ACCESS_TOKEN_SECRET , {expiresIn:'1h'})
//             res.send({result , token})
//           })

//           // find on user data
//           app.get('/user/:email', async(req,res) => {
//             const email = req.params.email
//             const query ={email:email}
//             const result = await userCollection.findOne(query)
//             res.send(result)
//         })


//         // get all tools
//         app.get('/tools', async(req,res)=> {
//             // const email = req.params.email
//             const query = {}
//             const cursor =  toolsCollection.find(query)
//             const tools = await cursor.toArray()
//             res.send(tools)
//         })

//         // get all reviews
//         app.get('/reviews', async(req,res)=> {
//             const query = {}
//             const cursor = reviewsCollection.find(query)
//             const reviews = await cursor.toArray()
//             res.send(reviews)
//         })

//         // post a new review
//         app.post('/review', async(req,res)=> {
//             const review = req.body
//             const result = await reviewsCollection.insertOne(review)
//             res.send(result)
//         })

//         // get all summary
//         app.get('/summarys', async(req,res)=> {
//             const query = {}
//             const cursor = summarysCollection.find(query)
//             const summarys = await cursor.toArray()
//             res.send(summarys)
//         })

//         // get tool
//         app.get('/tools/:id' , async(req,res) =>{
//             const id = req.params.id
//             const query = {_id:ObjectId(id)}
//             const tool = await toolsCollection.findOne(query)
//             res.send(tool)
//         })

//         // update available quantity 
//         app.put('/availableQuantity/:id', async (req, res) => {
//             const id = req.params.id
//             const filter = {_id:ObjectId(id)}
//             const newQuantity = req.body
//             const options = {upsert: true}
//             const updateDoc = {
//               $set:newQuantity
//             }
//             const result = await toolsCollection.updateOne(filter , updateDoc , options)
//             res.send(result)
//           })

//     }
//     finally{

//     }
// }
// run().catch(console.dir)


app.get('/', (req, res) => {
    res.send(' my portfolio website working')
  })
  
  app.listen(port, () => {
    console.log(`portfolio listening on port ${port}`)
  })