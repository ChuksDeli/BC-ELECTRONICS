import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { AuthProvider } from '@/context/AuthContext';
import { OrdersProvider } from '@/context/OrdersContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'BC ELECTRONICS | Electronics That Actually Deliver',
  description: 'Genuine electronics from brands you already trust, with fast delivery and real warranty support.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-bg text-text-primary">
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <OrdersProvider>
                <Header />
                <main className="min-h-screen">{children}</main>
                <Footer />
              </OrdersProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
