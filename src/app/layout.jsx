import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import ProductProvider from '@/provider/context/ProductProvider';
import CartProvider from '@/provider/context/CartDataProvider';
import Navbar from '@/components/navbar';
import DarkModeButton from '@/components/ui/DarkModeButton';
import { NotificationProvider } from '@/provider/context/NotificationProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ProductProvider>
					<NotificationProvider>
					<CartProvider>
						<Providers>
							<Navbar />
							<DarkModeButton />
							{children}
						</Providers>
					</CartProvider>
					</NotificationProvider>
				</ProductProvider>
			</body>
		</html>
	);
}
