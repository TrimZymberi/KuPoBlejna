const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 6001;

//middleware
app.use(cors());
app.use(express.json());

// florentsahiti06
// 208SWqrWgoacR6kp

// mongodb config
// / 24:38 ///// 
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://florentsahiti06:208SWqrWgoacR6kp@demo-kupoblejna-cluster.apwwcp8.mongodb.net/?retryWrites=true&w=majority&appName=demo-kupoblejna-cluster";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello Developers!')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})