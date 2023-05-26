import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChosenProductsProvider } from './hooks/useChosenProducts';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="delivery">
        <ChosenProductsProvider>
          <App />
        </ChosenProductsProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
