var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var url = "mongodb://localhost:27017/";
const client = new MongoClient(url)

var app = express()
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

async function getMessages() {
  try {
    await client.connect()
    // throw "myError"
    const db = client.db("chat")
    const messages = db.collection("messages")
    const cursor = messages.find({})

    if ((await cursor.count()) == 0) {
      console.log("No documents found")
    }
    var list = []
    await cursor.forEach(doc => {
      list.push({
        id: doc._id,
        name: doc.name,
        message: doc.message
      })
    });
    return list
    
  }
  catch (err) {
    console.log(err)
  }
  finally {
    await client.close()
  }

}
async function postMessage(name, message) {
  try {
    await client.connect()
    var chat = client.db("chat")
    var messages = chat.collection("messages")
    doc = {
      name: name,
      message: message
    }
    var result = await messages.insertOne(doc)
    // console.log(result)
    return (result)
  }
  catch (err) {
    console.log(err)
  }
  finally {
    await client.close()
  }
}
async function editMessage(o_id, updatedMessage) {
  try {
    await client.connect()
    var chat = client.db('chat')
    var messages = chat.collection("messages")
    var query = {
      _id: o_id
    }
    var updateDoc = {
      $set: {
        message: updatedMessage
      }
    }

    var result = await messages.updateOne(query, updateDoc)
    return result

  } catch (error) {
    console.log(error)
  } finally {
    await client.close()
  }
}
async function deleteMessage(o_id) {
  try {
    await client.connect()
    var messages = client.db("chat").collection("messages")
    var query = {
      _id: o_id
    }
    var result = await messages.deleteOne(query)
    return result
  } catch (error) {
    console.log(error)
  }
  finally {
    await client.close()
  }
}
/* GET home page. */
router.get('/', function (req, res, next) {

  res.render('index', { title: 'Express' });
});
router.get('/getMessages', async (req, res, next) => {
  var messages = await getMessages()
  res.json(messages)
})
router.post('/postMessage', async (req, res, next) => {
  var name = req.body.name
  var message = req.body.message
  console.log(name, message)
  try {
    var result = await postMessage(name, message)
    if(result){
      console.log("message posted to db")
    }
    else{
      console.log("message not posted db")
    }
    //send message to front end that the state of the db changed
    var io = req.io;
    io.sockets.emit("db changed");
    res.json(result)
  } catch (error) {
    console.log(error)
  }
})
router.put('/updateMessage', async (req, res, next) => {
  var id = req.body.id
  var updatedMessage = req.body.message
  var o_id = new ObjectId(id)
  console.log(o_id, updatedMessage)
  var result = await editMessage(o_id, updatedMessage)
  var io = req.io;
  io.sockets.emit("db changed");
  res.json(result)
})
router.delete('/deleteMessage', async (req, res, next) => {
  var id = req.body.id
  console.log(id)
  var o_id = new ObjectId(id)
  var result = await deleteMessage(o_id)
  var io = req.io;
  io.sockets.emit("db changed");
  res.json(result)
})

module.exports = router;
