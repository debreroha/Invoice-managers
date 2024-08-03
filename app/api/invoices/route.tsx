import { NextRequest, NextResponse } from 'next/server';

interface Invoice {
  id: number;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  items: string;
  totalAmount: number;
  dueDate: string;
}

let invoices: Invoice[] = [];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (id) {
    const invoice = invoices.find(inv => inv.id === Number(id));
    if (invoice) {
      return NextResponse.json(invoice);
    } else {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }
  }

  return NextResponse.json(invoices);
}

export async function POST(request: NextRequest) {
  const newInvoice: Invoice = await request.json();
  newInvoice.id = invoices.length ? invoices[invoices.length - 1].id + 1 : 1;
  invoices.push(newInvoice);
  return NextResponse.json(newInvoice, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (id) {
    const updatedInvoice: Invoice = await request.json();
    invoices = invoices.map(invoice => (invoice.id === Number(id) ? updatedInvoice : invoice));
    return NextResponse.json(updatedInvoice);
  }

  return NextResponse.json({ error: 'Invoice ID is required' }, { status: 400 });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (id) {
    invoices = invoices.filter(invoice => invoice.id !== Number(id));
    return NextResponse.json({ message: 'Invoice deleted successfully' });
  }

  return NextResponse.json({ error: 'Invoice ID is required' }, { status: 400 });
}
