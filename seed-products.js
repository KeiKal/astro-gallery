import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const products = [
  {
    name: "Classic White T-Shirt",
    description: "A comfortable, everyday essential white t-shirt made from 100% cotton.",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Clothing",
    stock: 100
  },
  {
    name: "Denim Jeans",
    description: "Classic blue denim jeans with a modern fit.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Clothing",
    stock: 50
  },
  {
    name: "Leather Wallet",
    description: "Genuine leather wallet with multiple card slots and coin pocket.",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Accessories",
    stock: 75
  },
  {
    name: "Smart Watch",
    description: "Feature-packed smartwatch with health tracking and notifications.",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Electronics",
    stock: 30
  }
];

async function seed() {
  try {
    // Clear existing products
    await prisma.product.deleteMany();
    console.log('Cleared existing products');

    // Add new products
    for (const product of products) {
      await prisma.product.create({
        data: product
      });
    }
    console.log('Added new products');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed(); 