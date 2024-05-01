const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 6006;
require('dotenv').config()


//middleware
app.use(cors());
app.use(express.json());

// florentsahiti06
// 208SWqrWgoacR6kp

// mongodb config

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@demo-kupoblejna-cluster.apwwcp8.mongodb.net/?retryWrites=true&w=majority&appName=demo-kupoblejna-cluster`;

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
    await client.connect();
    //database & collections
    const menuCollections = client.db("demo-kupoblejna").collection("menus");
    const cartCollections = client.db("demo-kupoblejna").collection("cartItems");

    //all menu items operations
    app.get('/menu', async(req, res) => {
      const result = await menuCollections.find().toArray();
      res.send(result)
    })

    // all carts operations

    //posting cart to db
    app.post('/carts', async(req, res) =>{
      const cartItem = req.body;
      const result = await cartCollections.insertOne(cartItem);
      res.send(result)
    })

    // get carts using email 
    app.get('/carts', async(req, res) => {
      const email = req.query.email;
      const filter = {email: email};
      const result = await cartCollections.find(filter).toArray(); 
      res.send(result);
    })

    //get specific carts
    app.get('/carts/:id', async(req, res) => {
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)}
      const result = await cartCollections.findOne(filter);
      res.send(result)
    })

    // delete product from cart
    app.delete('/carts/:id', async(req, res) =>{
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)}
      const result = await cartCollections.deleteOne(filter);
      res.send(result)
    })

    //update carts quantity
   app.put('/carts/:id', async(req, res) => {
      const id = req.params.id;
      const {quantity} = req.body;
      const filter = {_id: new ObjectId(id)};
      const options = {upsert: true};

  const updateDoc = {
    $set: {
      quantity: parseInt(quantity, 10)
    },
  };

  const result = await cartCollections.updateOne(filter, updateDoc, options);

} );


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
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