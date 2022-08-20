const express = require('express');

const app = express();

app.use(express.json({ limit: '10kb' })); // body parser, reading data from body into req.body

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello From the Server 🤩 ',
    app: 'Gal Telcom',
  });
});

app.post('/', (req, res) => {
  console.log(req.body);
  res.json({ test: 'test' });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port} 🚀 `);
});
