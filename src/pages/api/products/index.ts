import type { APIRoute } from 'astro';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GET: APIRoute = async () => {
  try {
    const products = await prisma.product.findMany();
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch products' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const product = await request.json();
    
    // Create new product in the database
    const newProduct = await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        category: product.category,
        stock: product.stock,
        slug: product.slug,
      },
    });

    return new Response(JSON.stringify(newProduct), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return new Response(JSON.stringify({ error: 'Failed to create product' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } finally {
    await prisma.$disconnect();
  }
};

export const PUT: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const product = await prisma.product.update({
      where: { id: data.id },
      data: {
        name: data.name,
        description: data.description,
        price: parseFloat(data.price),
        image: data.image,
        category: data.category,
        stock: parseInt(data.stock),
      },
    });

    return new Response(JSON.stringify(product), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update product' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}; 