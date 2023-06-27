const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'
let db = null
const jwt = require('jsonwebtoken')

MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client){
    console.log("Connected successfully to db server")

    db = client.db('myproject')

})


function create(name, email, password){
    return new Promise((resolve, reject) => {
        const collection = db.collection('users')
        const doc = {name, email, password, balance: 0}
        collection.insertOne(doc, {w:1}, function(err, result){
            err ? reject(err) : resolve(doc)
        })
    })
}

function all() {
    return new Promise((resolve, reject) => {
        const customers = db
        .collection('users')
        .find({})
        .toArray(function(err, docs) {
            err ? reject(err) : resolve(docs)
        })
    })
}

function checkLogin(email, password) {
    return new Promise((resolve, reject) => {
      const userInfo = db.collection('users');
      const loginDetails = { email, password };
      userInfo.findOne(loginDetails, (error, user) => {
        if (error) {
          reject(error);
        } else if (user) {
          const { name: userName, balance: userBalance, email: userEmail, password: userPassword } = user;
          const token = jwt.sign({ email: user.email }, 'secretKey', { expiresIn: '1h' });
          resolve({token, userName, userBalance, userEmail, userPassword});
        } else {
          reject(new Error('Login failed'));
        }
      });
    });
  }
// async function findByEmailAndPassword(email, password) {
//     const client = new MongoClient(url);
  
//     try {
//       // Connect to the MongoDB server
//       await client.connect();
  
//       // Get the reference to the database
//       const db = client.db(dbName);
  
//       // Query to find a document with the provided email and password
//       const query = { email, password };
  
//       // Find the document that matches the query
//       const user = await db.collection('users').findOne(query);
  
//       return user;
//     } catch (error) {
//       console.error(error);
//       throw error;
//     } finally {
//       // Close the connection
//       await client.close();
//     }
//   }

// function makeDeposit(email, deposit){
//     // return new Promise((resolve, reject) => {
//     //     const customers = db
//     //     .collection('users')
//     //     .find({})
//     //     .toArray(function(err, docs) {
//     //         err ? reject(err) : resolve(docs)
//     //     })
//     // })
//     return new Promise((resolve, reject)=>{
//         const collection = db.collection('users')
//         const doc = {email, deposit}
//         collection.update({balance: balance + deposit})
//     })
// }

function makeDeposit(email, deposit) {
  return new Promise((resolve, reject) => {
    const collection = db.collection('users');
    collection.updateOne(
      { email: email },
      { $inc: { balance: deposit } },
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}
module.exports = {create, all, checkLogin, makeDeposit}
