// Dependencies
const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const { createProxyMiddleware } = require('http-proxy-middleware');
const API_SERVICE_URL = "https://api.lifx.com/v1/";


// Set up Express App
const app = express();
const PORT = process.env.PORT || 3000;
// folder on server for static files
app.use(express.static('public'));
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    // console.log(`${req.method} Request Received`);
    req.headers.authorization = `Bearer ${process.env.API_KEY}`;
    next();
  });

// Default route that sends the user first home page

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

// Proxy endpoints
app.use('/', createProxyMiddleware({
  target: API_SERVICE_URL,
  changeOrigin: true
})
);

// Default route that sends the user first home page

// Starts the server to begin listening
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
});
