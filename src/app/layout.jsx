import {Inter} from 'next/font/google';
import './globals.css';
import {Providers} from './providers';
import CartProvider from '@/provider/context/CartDataProvider';
import Navbar from '@/components/navbar';
import DarkModeButton from '@/components/ui/DarkModeButton';
import {NotificationProvider} from '@/provider/context/NotificationProvider';
import ProductProviderWithSuspense from "@/provider/ProductProviderWithSuspense";

const inter = Inter({subsets: ['latin']});

export const metadata = {
    title: 'shopify',
    description: 'Generated by create next app',
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <head>
            <link rel="icon" href="/shopify-favicon.png" type="image/png"/>
        </head>
        <body className={inter.className}>
        <NotificationProvider>
            <ProductProviderWithSuspense>
                <CartProvider>
                    <Providers>
                        <Navbar/>
                        <DarkModeButton/>
                        {children}
                    </Providers>
                </CartProvider>
            </ProductProviderWithSuspense>
        </NotificationProvider>
        </body>
        </html>
    );
}
