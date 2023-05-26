import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Grid,
  Typography,
  Button,
} from '@mui/material';
import { useChosenProducts } from '../../hooks/useChosenProducts';

export const ProductsList = ({ products, shop }) => {
  const { addProduct } = useChosenProducts();

  const handleAddToCart = product => {
    addProduct(product);
  };

  return (
    <Grid container spacing={2}>
      {products.map(({ title, imageURL, price, id }) => (
        <Grid item xs={12} sm={6} key={id}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image={imageURL}
              alt={title}
            />
            <CardContent>
              <Typography variant="h5">{title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {price}$
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  handleAddToCart({ title, imageURL, price, id, shop })
                }
              >
                Add to cart
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
