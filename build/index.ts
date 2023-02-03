import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/api/ping', (req, res) => {
  res.send('pong');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
