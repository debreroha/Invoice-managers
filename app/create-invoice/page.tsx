"use client"

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface InvoiceData {
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  items: string;
  totalAmount: number;
  dueDate: string;
}

export default function CreateInvoice() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    invoiceNumber: '',
    clientName: '',
    clientEmail: '',
    items: '',
    totalAmount: 0,
    dueDate: ''
  });

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInvoiceData({
      ...invoiceData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3001/api/invoices', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(invoiceData)
    });
    if (response.ok) {
      router.push('/invoices');
    }
  };

  return (
    <div>
      <h1>Create Invoice</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="invoiceNumber" placeholder="Invoice Number" onChange={handleChange} required />
        <input type="text" name="clientName" placeholder="Client Name" onChange={handleChange} required />
        <input type="email" name="clientEmail" placeholder="Client Email" onChange={handleChange} required />
        <textarea name="items" placeholder="Items" onChange={handleChange} required />
        <input type="number" name="totalAmount" placeholder="Total Amount" onChange={handleChange} required />
        <input type="date" name="dueDate" placeholder="Due Date" onChange={handleChange} required />
        <button type="submit">Create Invoice</button>
      </form>
    </div>
  );
}
