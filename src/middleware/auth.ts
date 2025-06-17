import type { APIContext } from 'astro';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function isAuthenticated({ request }: APIContext) {
  const token = request.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return false;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return false;
  }
}

export async function requireAuth({ request, redirect }: APIContext) {
  const token = request.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return redirect('/login');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return redirect('/login');
  }
} 