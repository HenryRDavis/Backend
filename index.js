require('dotenv').config() // to allow the deployment server to access the env comands

const server = require('./api/server')


const port = process.env.PORT || 5000

server.listen(port, ()=>{
    console.log(`server is listenning on port: ${port}`)
})