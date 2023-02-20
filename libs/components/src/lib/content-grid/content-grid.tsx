import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Grid,
  Typography,
  Pagination,
} from '@mui/material';

export interface ContentGridItemProps {
  description?: React.ReactNode;
  image?: string;
  title: React.ReactNode;
}

export interface ContentGridProps {
  items: ContentGridItemProps[];
  pageSize?: number;
  //       rowsPerPageOptions={[5]}
}

export function ContentGrid({ items }: ContentGridProps) {
  return (
    <div>
      <Grid container spacing={2}>
        {items.map((item) => {
          return (
            <Grid item xs={3}>
              <Card>
                <CardActionArea>
                  {item.image && (
                    <CardMedia
                      component="img"
                      height="140"
                      image={item.image}
                      alt="green iguana"
                    />
                  )}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.title}
                    </Typography>
                    {item.description && (
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                    )}
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Pagination count={10} />
    </div>
  );
}

export default ContentGrid;
