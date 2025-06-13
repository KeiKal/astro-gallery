import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateProductSlugs() {
  try {
    const products = await prisma.product.findMany();
    
    for (const product of products) {
      const slug = product.name.toLowerCase().replace(/\s+/g, '-');
      await prisma.product.update({
        where: { id: product.id },
        data: { slug },
      });
    }
    
    console.log('Successfully updated product slugs');
  } catch (error) {
    console.error('Error updating product slugs:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateProductSlugs(); 