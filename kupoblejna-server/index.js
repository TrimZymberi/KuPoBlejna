const express = require('express')
const app = express();
const cors = require('cors');
const port = process.env.PORT || 6001
const mongoose = require('mongoose');
require('dotenv').config()

//midleware

app.use(cors());
app.use(express.json());

//mongodb configuration using mongoose



mongoose
    .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@demo-kupoblejna-client.ebrug93.mongodb.net/
    demo-kupoblejna-client?retryWrites=true&w=majority`
    )
    .then(
        console.log("MongoDB Connected Succsesfully")
    )
    .catch(
        (error) => console.log("Error connecting to MongoDB", error)
    );

    //import routes here
const menuRoutes = require('./api/routes/menuRoutes');
const cartRoutes = require('./api/routes/cartRoutes');
app.use('/menu', menuRoutes)
app.use('/carts', cartRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})