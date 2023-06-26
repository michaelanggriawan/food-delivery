"use client";

import './globals.css'
import { Inter } from 'next/font/google'
import CheckoutProvider from '@/context/checkoutContext';
import store from '@/redux/store'
const inter = Inter({ subsets: ['latin'] })
import Layout from '@/components/layout/Layout'
import { Provider as ReduxProvider } from 'react-redux'
import Checkout from '@/components/cart/Checkout';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider store={store}>
          <CheckoutProvider>
            <Layout>
              {children}
              <Checkout />
            </Layout>
          </CheckoutProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
