import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';

export async function GET() {
  try {
    const invoices = await prisma.invoice.findMany();
    return NextResponse.json(invoices);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch invoices' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const { invoiceNumber, clientName, clientEmail, items, totalAmount, dueDate } = await request.json();
  try {
    const newInvoice = await prisma.invoice.create({
      data: {
        invoiceNumber,
        clientName,
        clientEmail,
        items,
        totalAmount,
        dueDate,
      },
    });
    return NextResponse.json(newInvoice, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create invoice' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const { id } = Object.fromEntries(new URLSearchParams(request.nextUrl.search));
  try {
    await prisma.invoice.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete invoice' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const { id, invoiceNumber, clientName, clientEmail, items, totalAmount, dueDate } = await request.json();
  try {
    const updatedInvoice = await prisma.invoice.update({
      where: { id: Number(id) },
      data: {
        invoiceNumber,
        clientName,
        clientEmail,
        items,
        totalAmount,
        dueDate,
      },
    });
    return NextResponse.json(updatedInvoice);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update invoice' }, { status: 500 });
  }
}
