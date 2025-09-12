const express = require('express');
const mongoose = require('mongoose');
require('./BOTtelegram/joke.js');


const app = express();
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
