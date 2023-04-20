/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);

app.get('/api/listings', (req, res) => {
  res.send([
    {
      id: 1,
      title: 'Modern apartment in the city center',
      price: 120,
      image: 'https://source.unsplash.com/soXSKYRBmmM',
      description:
        'This beautiful apartment is located in the heart of the city and features modern amenities and breathtaking views.',
    },
    {
      id: 2,
      title: 'Luxury villa with private pool',
      price: 350,
      image: 'https://source.unsplash.com/l5srEWW2MMc',
      description:
        'Escape to this stunning villa and enjoy your own private oasis with a pool, spa, and lush gardens.',
    },
    {
      id: 3,
      title: 'Cozy cabin in the woods',
      price: 80,
      image: 'https://source.unsplash.com/MM7nD2FjI3U',
      description:
        'Get away from it all and enjoy the peace and quiet of nature in this charming cabin.',
    },
  ]);
});

// function generateListings(num: number): Listing[] {
//   const listings = Array.from({ length: num }, (_, index) => {
//     const listing: Listing = {
//       id: index + 1,
//       title: faker.commerce.productName(),
//       price: faker.datatype.number({ min: 50, max: 500 }),
//       image: faker.image.imageUrl(640, 480, 'city'),
//       description: faker.lorem.paragraph(),
//     };

//     return listing;
//   });

//   return listings;
// }
