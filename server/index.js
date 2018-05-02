//==============MODULES==============//
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')    //  Util. pour les chemins d'accès

const app = express()
const port = 3030

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//==============HEADER==============//
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', request.headers.origin)
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  response.header('Access-Control-Allow-Credentials', 'true')
  response.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE')
  next()
})

//==============ROUTE==============//
app.use('/route-rss', require(path.join(__dirname, './route/route-rss.js')))
app.use('/route-session', require(path.join(__dirname, './route/route-session.js')))
app.use('/route-module', require(path.join(__dirname, './route/route-module.js')))
//============================//
app.listen(port, () => console.log(`server listenning to port ${port}`))