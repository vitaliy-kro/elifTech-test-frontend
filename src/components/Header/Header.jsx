import { AppBar, Box, Container } from '@mui/material';
import { Link } from '../Link';

export const Header = () => {
  const stylesForLink = { color: 'white', py: 2 };

  return (
    <AppBar position="static">
      <Container>
        <Box
          component="nav"
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Link to="/" sx={stylesForLink}>
            Shop
          </Link>
          <Link to="orders-history" sx={stylesForLink}>
            Orders history
          </Link>
          <Link to="shopping-cart" sx={stylesForLink}>
            Shopping Cart
          </Link>
        </Box>
      </Container>
    </AppBar>
  );
};
