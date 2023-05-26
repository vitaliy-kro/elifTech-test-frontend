import { Route, Routes } from 'react-router-dom';
import { Shops } from './pages/Shops/Shops';
import { ShoppingCart } from './pages/ShoppingCart/ShoppingCart';
import { Layout } from './components/Layout';
import { ToastContainer } from 'react-toastify';
import { OrdersHistory } from './pages/OrdersHistory/OrdersHistory';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Shops />} />
          <Route path="orders-history" element={<OrdersHistory />} />
          <Route path="shopping-cart" element={<ShoppingCart />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
