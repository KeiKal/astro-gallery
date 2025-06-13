import type { Product } from '../utils/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    description: 'Premium cotton t-shirt with a comfortable fit. Perfect for everyday wear.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format',
    category: 'clothing',
    stock: 50,
    slug: 'classic-white-tshirt'
  },
  {
    id: '2',
    name: 'Slim Fit Denim Jeans',
    description: 'Modern slim fit jeans with stretch comfort. Available in multiple washes.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format',
    category: 'clothing',
    stock: 30,
    slug: 'slim-fit-denim-jeans'
  },
  {
    id: '3',
    name: 'Leather Wallet',
    description: 'Genuine leather wallet with multiple card slots and RFID protection.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&auto=format',
    category: 'accessories',
    stock: 25,
    slug: 'leather-wallet'
  },
  {
    id: '4',
    name: 'Wireless Headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format',
    category: 'electronics',
    stock: 15,
    slug: 'wireless-headphones'
  },
  {
    id: '5',
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with health tracking and notifications.',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format',
    category: 'electronics',
    stock: 20,
    slug: 'smart-watch'
  },
  {
    id: '6',
    name: 'Running Shoes',
    description: 'Lightweight running shoes with responsive cushioning.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format',
    category: 'footwear',
    stock: 40,
    slug: 'running-shoes'
  }
]; 