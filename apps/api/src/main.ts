/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';

const app = express();

app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

app.get('/api/users', (req, res) => {
  // res.send({ message: 'Welcome to api!' });
  res.send([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      favoriteIceCream: 'Chocolate',
    },
    {
      id: 2,
      name: 'John Doe',
      email: 'john.doe@example.com',
      favoriteIceCream: 'Chocolate',
    },
    {
      id: 3,
      name: 'John Doe',
      email: 'john.doe@example.com',
      favoriteIceCream: 'Chocolate',
    },
  ]);
});

app.get('/api/users/:id', (req, res) => {
  res.send({
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    favoriteIceCream: 'Chocolate',
  });
});

app.put('/api/users/:id', (req, res) => {
  console.log(req);
  // res.send({
  //   ...req.params,
  //   // id: 1,
  //   // name: 'John Whoa',
  //   // email: 'john.whoa@example.com',
  //   // favoriteIceCream: 'vanilla',
  // });
  res.send(req.body);
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
