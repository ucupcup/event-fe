import type { PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './CartProvider';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <BrowserRouter>
      <CartProvider>{children}</CartProvider>
    </BrowserRouter>
  );
}

export default AppProviders;
