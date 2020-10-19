const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const userRouter = require('../users/user_router')
const postRouter = require('../instructors/instructor_router')
const server = express()



server.use(helmet())
server.use(express.json())
server.use(cors())

 

// to test that the server is up and running
server.get('/', (req, res) => {
    res.status(200).send(`<h1> Server is Up and Running </h1>`)
})

server.use('/api/users', userRouter)
server.use('/api/instructors', postRouter)

module.exports = server