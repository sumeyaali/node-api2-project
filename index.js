const express = require('express');


const port = 4000;


const server = require("./api/server");
server.listen(port, () => {
    console.log(`\n ** API on port: ${port} **`)
})




