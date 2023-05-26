import { Box, Container } from '@mui/material';
import { CartProductsList } from '../../components/CartProductsList';
import { UserCredentialsForm } from '../../components/UserCredentialsForm';
import { useChosenProducts } from '../../hooks/useChosenProducts';

export const ShoppingCart = () => {
  const { chosenProducts } = useChosenProducts();

  return (
    <Container>
      {chosenProducts.length ? (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
          <Box sx={{ position: 'sticky', top: 0, zIndex: 1 }}>
            <UserCredentialsForm />
          </Box>
          <CartProductsList />
        </Box>
      ) : (
        <b>No products on your cart</b>
      )}
    </Container>
  );
};
