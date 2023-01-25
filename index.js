const express = require('express');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient

const app = express();

var database
app.use(express.json())


app.get('/', (req, res) => {
    res.send('Server is running');
});
// Start the server

app.get('/stockings', (req, resp) => {
    const index = req.query.index;
    database.collection('stockmarket').find({}).toArray((err, result) => {
        if (err) throw err
        resp.send(result[index])
    })
})

const port = 3000;
app.listen(port, () => {
    MongoClient.connect('mongodb+srv://stockmarket:stockmarket@stockmarket.lmz2wlb.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true }, (error, result) => {
        if (error) throw error
        database = result.db('stockmarket')
        console.log('connect successfull')
    })
});