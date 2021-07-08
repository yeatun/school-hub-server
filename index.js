const express = require('express');

const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();


// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ggzrw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const uri= `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ggzrw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
const app = express();

app.use(express.json());
app.use(cors());


const port =process.env.PORT ||  5000;





app.get('/', (req, res) => {
    res.send("hello from db it's working ")
})




const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("schoolHub").collection("student");
  const StudentCollection = client.db("schoolHub").collection("StudentList");
  const SubjectCollection = client.db("schoolHub").collection("SubjectList");

app.get('/newPost', (req, res) => {
    collection.find()
    .toArray((err, items) => {
        res.send(items)
    })
})
app.get('/newSub', (req, res) => {
  SubjectCollection.find()
  .toArray((err, items) => {
      res.send(items)
  })
})
app.get('/newService', (req, res) => {

  
    collection.find()
    .toArray((err, items) => {
        res.send(items)
    })
})



// app.post('/addReview', (req, res) => {
//     const newEvent = req.body;
//     console.log('adding new event: ', newEvent)
//     collection.insertOne(newEvent)
//     .then(result => {
//         console.log('inserted count', result.insertedCount);
//         res.send(result.insertedCount > 0)
//     })
// })
app.post('/addStudent',(req, res) =>{
  const newProduct =req.body;
  console.log('added new product', newProduct)
  StudentCollection.insertOne(newProduct)
  .then(result =>{
    console.log('insertedCount',result.insertedCount);
    res.send(result.insertedCount > 0)
  })
})
app.post('/addPost', (req, res) => {
  const addPost = req.body;
  console.log('adding new event: ', addPost);
  collection.insertOne(addPost)
  .then(result => {
      console.log('inserted count', result.insertedCount);
      res.send(result.insertedCount > 0)
  })
})
app.post('/addSubject',(req, res) =>{
  const newProduct =req.body;
  console.log('added new product', newProduct)
  SubjectCollection.insertOne(newProduct)
  .then(result =>{
    console.log('insertedCount',result.insertedCount);
    res.send(result.insertedCount > 0)
  })
})

// app.get('/products',(req,res)=>{
//   StudentCollection.find()
//   .toArray((err,items) =>{
//     res.send(items)
//     console.log('from data base',items);
//   })
// })



app.delete('/deleteProduct/:id', (req, res) => {
  const id = ObjectId(req.params.id);
  collection.findOneAndDelete({_id: id})
  .then(product => res.send(product.value))
})

app.get('/student', (req, res) => {
    const queryProfile = req.query.id;
    StudentCollection.find({student: queryProfile})
    .toArray((err, documents) => {
      res.send(documents)
      console.log(documents)
      console.log(err);
    })
  })
  
// client.close();
});




app.listen(process.env.PORT || port)