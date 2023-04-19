import faker from '@faker-js/faker';
import { Grid, Card, CardHeader, CardMedia, CardContent, Typography } from '@mui/material';

interface Listing {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

interface ListingGridProps {
  listings: Listing[];
}

function ListingGrid({ listings }: ListingGridProps) {
  return (
    <Grid container spacing={2}>
      {listings.map((listing) => (
        <Grid item key={listing.id} xs={12} md={6} lg={4}>
          <Card>
            <CardHeader title={listing.title} subheader={`$${listing.price} per night`} />
            <CardMedia component="img" height="194" image={listing.image} alt={listing.title} />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {listing.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

// export default ListingGrid;


function generateListings(num: number): Listing[] {
  const listings = Array.from({ length: num }, (_, index) => {
    const listing: Listing = {
      id: index + 1,
      title: faker.commerce.productName(),
      price: faker.datatype.number({ min: 50, max: 500 }),
      image: faker.image.imageUrl(640, 480, 'city'),
      description: faker.lorem.paragraph(),
    };

    return listing;
  });

  return listings;
}




export default function Index() {
  const listings = [
    {
      id: 1,
      title: 'Modern apartment in the city center',
      price: 120,
      image: '/img/listing1.jpg',
      description: 'This beautiful apartment is located in the heart of the city and features modern amenities and breathtaking views.',
    },
    {
      id: 2,
      title: 'Luxury villa with private pool',
      price: 350,
      image: '/img/listing2.jpg',
      description: 'Escape to this stunning villa and enjoy your own private oasis with a pool, spa, and lush gardens.',
    },
    // add more listings here
  ];

  return (
    <div className="wrapper">
      <div className="container">
        <ListingGrid listings={listings} />
      </div>
    </div>
  );
}
