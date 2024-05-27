const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const routes = require('./routes');
const sql = require('mssql');
require('dotenv').config();
const livereload = require('livereload');
const connectLivereload = require('connect-livereload');

// Setup LiveReload server
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, '../public'));
liveReloadServer.watch(path.join(__dirname, '../views'));

// Setup LiveReload middleware
const app = express();
app.use(connectLivereload());

// Set up Handlebars
app.engine('hbs', hbs.engine({ extname: 'hbs', defaultLayout: 'main', layoutsDir: path.join(__dirname, '../views/layouts') }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/', routes);

// Database configuration
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true, // Use this if you're on Windows Azure
  },
};

// Connect to the database
sql.connect(dbConfig, (err) => {
  if (err) {
    console.log('Database connection failed: ', err);
  } else {
    console.log('Connected to the database');
  }
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});