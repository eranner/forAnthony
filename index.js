const express = require('express')
const app = express();
const cors = require('cors')
const dal = require('./dal.js')
// const { checkLoggedIn } = require('./auth.js')





app.use(express.static('public'))
app.use(cors())


app.get('/account/create/:name/:email/:password', (req, res)=> {
    dal.create(req.params.name, req.params.email, req.params.password).
            then((user) => {
            console.log(user)
            res.send(user)
        })
})
app.get('/account/login/:email/:password', (req, res) => {
    dal.checkLogin(req.params.email, req.params.password)
      .then((token) => {
        res.send({ token });
      })
      .catch((error) => {
        console.error('Login failed:', error);
        res.status(401).send({ error: 'Login failed' });
      });
  });
  

app.post('/account/deposit/:email/:deposit', (req,res)=>{
    dal.makeDeposit(req.params.email, req.params.deposit)
        .then((doc)=> {
            // console.log(balance)
            res.send({doc})
        }).catch((error) => {
            console.error('Login failed:', error);
            res.status(401).send({ error: 'Deposit failed' });
          });
})
app.post('/account/withdraw/:email/:withdraw', (req,res)=>{
    dal.all()
        .then((docs)=> {
            console.log(docs)
            res.send(docs)
        })
})

app.get('/account/balance/:email/:balance', (req,res)=>{
    dal.all()
        .then((docs)=> {
            console.log(docs)
            res.send(docs)
        })
})
app.get('/account/all', (req,res)=> {
    dal.all()
        .then((docs)=> {
            console.log(docs)
            res.send(docs)
        })

})

app.listen(3000, (req, res)=> {
    console.log('Running on port 3000!')
})