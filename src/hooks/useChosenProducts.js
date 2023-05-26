import { createContext, useContext, useState } from 'react';
import { toastSuccess } from '../helpers/toast-notifications';

const ProductsContext = createContext();

export const useChosenProducts = () => useContext(ProductsContext);

export const ChosenProductsProvider = ({ children }) => {
  const [chosenProducts, setChosenProducts] = useState([]);

  const addProduct = addedProduct => {
    const updatedProducts = [...chosenProducts];
    toastSuccess('Successful added to cart!');
    const previouslyAddedProductCheck = updatedProducts.findIndex(
      ({ id }) => id === addedProduct.id
    );

    if (previouslyAddedProductCheck >= 0) {
      const product = updatedProducts[previouslyAddedProductCheck];
      product.quantity += 1;
      product.total = product.quantity * product.price;
      setChosenProducts(updatedProducts);
      return;
    }
    updatedProducts.push({ ...addedProduct, quantity: 1 });
    setChosenProducts(updatedProducts);
  };

  const handleDeleteProduct = productId => {
    setChosenProducts(prevState =>
      prevState.filter(({ id }) => id !== productId)
    );
  };

  const handleIncrementProduct = productId => {
    const updatedProducts = [...chosenProducts].map(p => {
      if (p.id === productId) {
        p.quantity += 1;
        p.total = p.quantity * p.price;
      }
      return p;
    });

    setChosenProducts(updatedProducts);
  };

  const handleDecrementProduct = productId => {
    const updatedProducts = [...chosenProducts];
    const foundProductIndex = updatedProducts.findIndex(
      ({ id }) => productId === id
    );

    if (updatedProducts[foundProductIndex].quantity - 1 === 0) {
      handleDeleteProduct(productId);
      return;
    }
    const product = updatedProducts[foundProductIndex];
    product.quantity -= 1;
    product.total = product.quantity * product.price;

    setChosenProducts(updatedProducts);
  };

  const handleClearCart = () => {
    setChosenProducts([]);
  };
  const getTotalPrice = () => {
    return chosenProducts.reduce((total, product) => {
      return total + product.quantity * product.price;
    }, 0);
  };

  return (
    <ProductsContext.Provider
      value={{
        chosenProducts,
        addProduct,
        handleIncrementProduct,
        handleDecrementProduct,
        totalPrice: (() => getTotalPrice())(),
        handleClearCart,
        handleDeleteProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
