import { List, ListItemButton, ListItemText } from '@mui/material';
import { SHOPS } from '../../consts';
import { useChosenProducts } from '../../hooks/useChosenProducts';

export const ShopsList = ({ activeShop, setActiveShop }) => {
  const { chosenProducts } = useChosenProducts();

  return (
    <List sx={{ border: '1px solid #ccc', borderRadius: 1 }}>
      {SHOPS.map((shop, index) => (
        <ListItemButton
          selected={activeShop === shop.name}
          disabled={chosenProducts.length > 0 && activeShop !== shop.name}
          key={index}
          onClick={e => {
            setActiveShop(e.target.textContent);
          }}
        >
          <ListItemText primary={shop.name} />
        </ListItemButton>
      ))}
    </List>
  );
};
