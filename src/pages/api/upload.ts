import type { APIRoute } from 'astro';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return new Response(JSON.stringify({ error: 'No file provided' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Create a unique filename
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name}`;
    
    // Save the file to the public directory
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const publicDir = join(process.cwd(), 'public', 'uploads');
    const filePath = join(publicDir, filename);
    
    await writeFile(filePath, buffer);
    
    // Return the URL of the uploaded file
    const url = `/uploads/${filename}`;
    
    return new Response(JSON.stringify({ url }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return new Response(JSON.stringify({ error: 'Failed to upload file' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}; 