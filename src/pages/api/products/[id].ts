import type { APIRoute, GetStaticPaths } from 'astro';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GET: APIRoute = async ({ params }) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
    });

    if (!product) {
      return new Response(JSON.stringify({ error: 'Product not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    return new Response(JSON.stringify(product), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch product' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

export const DELETE: APIRoute = async ({ params }) => {
  try {
    const { id } = params;
    if (!id) {
      return new Response(JSON.stringify({ error: 'Product ID is required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    console.log('Attempting to delete product with ID:', id);
    const deletedProduct = await prisma.product.delete({
      where: { id },
    });

    return new Response(null, {
      status: 204,
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete product' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

export const PUT: APIRoute = async ({ params, request }) => {
  try {
    const { id } = params;
    console.log('Attempting to update product with ID:', id);
    if (!id) {
      return new Response(JSON.stringify({ error: 'Product ID is required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const productData = await request.json();
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name: productData.name,
        description: productData.description,
        price: parseFloat(productData.price),
        image: productData.image,
        category: productData.category,
        stock: parseInt(productData.stock),
        slug: productData.name.toLowerCase().replace(/\s+/g, '-'),
      },
    });

    return new Response(JSON.stringify(updatedProduct), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return new Response(JSON.stringify({ error: 'Failed to update product' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch all product IDs from your data source using an absolute URL
  const products = await fetch('http://localhost:4322/api/products').then(res => res.json());
  
  // Return an array of objects with the `params` property
  return products.map((product: { id: string }) => ({
    params: { id: product.id },
    props: { product }, // Optional: pass the product data to the page
  }));

  console.log(products);
}; 