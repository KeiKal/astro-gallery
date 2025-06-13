import type { APIRoute } from 'astro';
import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();
const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

// Email configuration
const transporter = nodemailer.createTransport({
  host: import.meta.env.SMTP_HOST,
  port: parseInt(import.meta.env.SMTP_PORT || '587'),
  secure: import.meta.env.SMTP_SECURE === 'true',
  auth: {
    user: import.meta.env.SMTP_USER,
    pass: import.meta.env.SMTP_PASS,
  },
});

export const post: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { 
      shippingInfo, 
      paymentInfo, 
      items,
      total,
      userEmail,
      userName
    } = data;

    // Validate input
    if (!shippingInfo || !paymentInfo || !items || !total || !userEmail) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
      });
    }

    // Create or get user
    let user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: userEmail,
          name: userName,
        },
      });
    }

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), // Convert to cents
      currency: 'usd',
      payment_method: paymentInfo.paymentMethodId,
      confirm: true,
      return_url: `${import.meta.env.SITE_URL}/order-confirmation`,
    });

    // Create order in database
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        total,
        paymentIntent: paymentIntent.id,
        status: 'PAID',
        shippingAddress: {
          create: {
            street: shippingInfo.address,
            city: shippingInfo.city,
            state: shippingInfo.state,
            zipCode: shippingInfo.zipCode,
            country: shippingInfo.country,
          },
        },
        items: {
          create: items.map((item: { id: string; quantity: number; price: number; name: string }) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
            name: item.name,
          })),
        },
      },
      include: {
        items: true,
        shippingAddress: true,
      },
    });

    // Send confirmation email
    await transporter.sendMail({
      from: import.meta.env.SMTP_FROM,
      to: userEmail,
      subject: 'Order Confirmation',
      html: `
        <h1>Thank you for your order!</h1>
        <p>Order ID: ${order.id}</p>
        <h2>Order Summary:</h2>
        <ul>
          ${order.items.map((item: { name: string; quantity: number; price: number }) => `
            <li>${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</li>
          `).join('')}
        </ul>
        <p>Total: $${order.total.toFixed(2)}</p>
        <h2>Shipping Address:</h2>
        <p>
          ${order.shippingAddress.street}<br>
          ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}<br>
          ${order.shippingAddress.country}
        </p>
      `,
    });

    return new Response(JSON.stringify({ 
      success: true, 
      orderId: order.id,
      clientSecret: paymentIntent.client_secret,
    }), {
      status: 200,
    });
  } catch (error: any) {
    console.error('Checkout error:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'An error occurred during checkout' 
    }), {
      status: 500,
    });
  }
}; 