import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  List,
  ListItem,
  CardActions,
  Button,
} from '@mui/material';
import { useChosenProducts } from '../../hooks/useChosenProducts';

export const CartProductsList = () => {
  const {
    handleIncrementProduct,
    handleDecrementProduct,
    chosenProducts,
    handleDeleteProduct,
  } = useChosenProducts();

  return (
    <>
      <List>
        {chosenProducts.map(
          ({ imageURL, title, price, quantity, id, total }) => (
            <ListItem key={id}>
              <Card>
                <CardMedia
                  component="img"
                  sx={{ height: 140 }}
                  image={imageURL}
                  alt="Product Image"
                />
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6" component="div">
                    {title}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Price per one: ${price}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Total: ${total}
                  </Typography>
                  <TextField
                    label="Quantity"
                    type="number"
                    value={quantity}
                    onChange={e => {
                      const newQuantity = Number(e.target.value);
                      if (newQuantity > quantity) {
                        handleIncrementProduct(id);
                        return;
                      }

                      handleDecrementProduct(id);
                    }}
                    sx={{ mt: 2 }}
                  />
                </CardContent>
                <CardActions>
                  <Button onClick={() => handleDeleteProduct(id)}>
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </ListItem>
          )
        )}
      </List>
    </>
  );
};
