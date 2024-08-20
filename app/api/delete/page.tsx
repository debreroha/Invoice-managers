import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'DELETE') {
    try {
      const invoiceId = parseInt(id as string, 10);

      if (isNaN(invoiceId)) {
        return res.status(400).json({ error: 'Invalid invoice ID' });
      }

      // Delete the invoice from the database
      await prisma.invoice.delete({
        where: { id: invoiceId },
      });

      return res.status(200).json({ message: 'Invoice deleted successfully' });

    } catch (error) {
      console.error('Error deleting invoice:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
