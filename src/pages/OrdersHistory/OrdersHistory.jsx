import { useState } from 'react';
import {
  Card,
  CardContent,
  Container,
  List,
  ListItem,
  Typography,
  Button,
  CardActions,
  Modal,
  Paper,
  CardMedia,
} from '@mui/material';
import { useOrders } from '../../hooks/useOrders';

export const OrdersHistory = () => {
  const [isModalOpen, setIsModalOpen] = useState({});
  const { isLoading, data } = useOrders();

  const handleModalOpen = orderId => {
    setIsModalOpen(prevModalOpenMap => ({
      ...prevModalOpenMap,
      [orderId]: true,
    }));
  };

  const handleModalClose = orderId => {
    setIsModalOpen(prevModalOpenMap => ({
      ...prevModalOpenMap,
      [orderId]: false,
    }));
  };

  return (
    <Container>
      {isLoading ? (
        <b>Loading...</b>
      ) : (
        <List>
          {data.map(order => (
            <ListItem key={order.id}>
              <Card sx={{ display: 'flex', flex: 1 }}>
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6" component="div">
                    Name: {order.name}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Email: {order.email}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Total cost: {order.totalPrice}$
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => handleModalOpen(order.id)}
                  >
                    Show more
                  </Button>
                </CardActions>
              </Card>
              <Modal
                open={isModalOpen[order.id] || false}
                onClose={() => handleModalClose(order.id)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h5" component="h2">
                    Order Details
                  </Typography>
                  <Typography variant="h6">
                    Shop: {order.products[0].shop}
                  </Typography>
                  <List>
                    {order.products.map(product => (
                      <ListItem key={product.id}>
                        <Card>
                          <CardMedia
                            component="img"
                            height="50"
                            image={product.imageURL}
                            alt={product.title}
                          />
                          <CardContent>
                            <Typography variant="subtitle1">
                              {product.title}:
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              color="text.secondary"
                            >
                              {product.quantity} *{product.price}$ ={' '}
                              {product.total}$
                            </Typography>
                          </CardContent>
                        </Card>
                      </ListItem>
                    ))}
                  </List>
                  <Button
                    variant="contained"
                    onClick={() => handleModalClose(order.id)}
                  >
                    Close
                  </Button>
                </Paper>
              </Modal>
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};
