import type { APIRoute } from 'astro';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email, password } = await request.json();

    // Find the admin user
    const admin = await prisma.user.findUnique({
      where: { email },
    });

    if (!admin) {
      return new Response(
        JSON.stringify({ error: 'Invalid credentials' }),
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, admin.password);

    if (!isValidPassword) {
      return new Response(
        JSON.stringify({ error: 'Invalid credentials' }),
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: admin.id, email: admin.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return new Response(
      JSON.stringify({ token }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    );
  }
}; 