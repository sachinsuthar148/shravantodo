const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/authRoutes');
const todos = require('./routes/todoRoutes');
// const keys = require('./config/auth');
const keys = require('./config/keys');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

mongoose
  .connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/auth', users);
app.use('/api/todos', todos);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
