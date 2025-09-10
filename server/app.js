
const express = require('express');
const mongoose = require('mongoose');


const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://admin:creator12341234@cluster0.4gzdple.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('DB connected'))

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.get('/jokes', (req, res) => {
  res.send('all jokes');
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});