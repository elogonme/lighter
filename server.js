// Dependencies
const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config(); // 
const { createProxyMiddleware } = require('http-proxy-middleware');
const API_SERVICE_URL = "https://api.lifx.com/v1/";

// Set up Express App
const app = express();
const PORT = process.env.PORT || 3000;
// folder on server for static files
app.use(express.static('public'));
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
// Add API KEY to all requests to API. API_KEY should be configured during deployment
app.use((req, res, next) => {
    req.headers.authorization = `Bearer ${process.env.API_KEY}`;
    next();
  });

// Default route that sends the user first home page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

// Proxy endpoints - to forward all requests to LFX API endpoint after adding API_KEY
app.use('/', createProxyMiddleware({
  target: API_SERVICE_URL,
  changeOrigin: true
})
);

// Starts the server to begin listening
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
});
