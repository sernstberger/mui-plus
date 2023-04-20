// import faker from '@faker-js/faker';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import listings from '../public/data/listings';

interface AspectRatioProps {
  ratio: number;
  children: React.ReactNode;
}

const AspectRatio: React.FC<AspectRatioProps> = ({ ratio, children }) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        paddingBottom: `${(1 / ratio) * 100}%`,
      }}
    >
      <div
        style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}
      >
        {children}
      </div>
    </div>
  );
};

// export default AspectRatio;

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
            <CardHeader
              title={listing.title}
              subheader={`$${listing.price} per night`}
            />

            <AspectRatio ratio={16 / 9}>
              <Image
                src={listing.image}
                alt={listing.title}
                fill
                sizes="(max-width: 640px) 50vw, 640px"
              // priority
              />
            </AspectRatio>

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

export default function Index() {


  return (
    <div className="wrapper">
      <div className="container">
        <ListingGrid listings={listings} />
      </div>
    </div>
  );
}
