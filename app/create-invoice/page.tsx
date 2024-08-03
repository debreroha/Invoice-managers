"use client"

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface InvoiceData {
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  items: string;
  totalAmount: number; // Assume amount is in ETB
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
      [name]: name === 'totalAmount' ? parseFloat(value) : value
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
        <input
          type="text"
          name="invoiceNumber"
          placeholder="Invoice Number"
          value={invoiceData.invoiceNumber}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="clientName"
          placeholder="Client Name"
          value={invoiceData.clientName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="clientEmail"
          placeholder="Client Email"
          value={invoiceData.clientEmail}
          onChange={handleChange}
          required
        />
        <textarea
          name="items"
          placeholder="Itemized List of Products/Services"
          value={invoiceData.items}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="totalAmount"
          placeholder="Total Amount (ETB)"
          value={invoiceData.totalAmount}
          onChange={handleChange}
          required
          step="0.01" // Allow decimal values
        />
        <input
          type="date"
          name="dueDate"
          placeholder="Due Date"
          value={invoiceData.dueDate}
          onChange={handleChange}
          required
        />
        <button type="submit">Create Invoice</button>
      </form>
    </div>
  );
}
