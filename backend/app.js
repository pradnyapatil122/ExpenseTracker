const express = require('express');
const cors = require('cors');
const {db} = require('./db/db'); 
const{readdirSync}= require('fs')
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
readdirSync('./routes').map((route) => {
    if (route.endsWith('.js')) {
        app.use('/api/v1', require('./routes/' + route));
    }
});
// Start the server
const server = () => {
    db();
    app.listen(PORT, () => {
        console.log('Server is listening on port', PORT);
    });
};
server();
