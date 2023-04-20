// import faker from '@faker-js/faker';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from '@mui/material';
import Image from 'next/image';
// import listings from '../public/data/listings';
import { GetStaticProps } from 'next';
import { Listing, getListings } from '../lib/api';

interface HomeProps {
  listings: Listing[];
}

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

function Index({ listings }: HomeProps) {
  return (
    <div className="wrapper">
      <div className="container">
        <Grid container spacing={2}>
          {listings && listings.map((listing) => (
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
      </div>
    </div>
  );
}

export default Index;





export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const listings = await getListings();
  return { props: { listings } };
};