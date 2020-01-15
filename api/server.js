const express = require("express");

const postsRouter = require("../posts/postsRouter");

const server = express();

server.use(express.json())

server.get('/', (req, res) => {
    res.send(`WELCOME`)
})


server.use('/api/posts', postsRouter)

module.exports= server;