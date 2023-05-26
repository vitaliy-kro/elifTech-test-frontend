import { Container } from '@mui/material';
import { ShopsList } from '../../components/ShopsList';
import { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { ProductsList } from '../../components/ProductsList';

export const Shops = () => {
  const [activeShop, setActiveShop] = useState('Mc-Donny');
  const { data, isLoading } = useProducts(activeShop);

  return (
    <Container
      sx={{
        display: 'flex',

        p: 1,
      }}
    >
      <ShopsList
        activeShop={activeShop}
        setActiveShop={res => {
          setActiveShop(res);
        }}
      />
      {isLoading ? (
        <b>Loading...</b>
      ) : (
        <ProductsList products={data} shop={activeShop} />
      )}
    </Container>
  );
};
