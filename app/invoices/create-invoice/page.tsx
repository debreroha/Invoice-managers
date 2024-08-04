'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateInvoice() {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [items, setItems] = useState('');
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const [dueDate, setDueDate] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const invoice = {
      invoiceNumber,
      clientName,
      clientEmail,
      items,
      totalAmount,
      dueDate,
    };

    const response = await fetch('/api/invoices', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invoice),
    });

    if (response.ok) {
      router.push('/invoices');
    } else {
      alert('Failed to create invoice');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Invoice</h1>
      <label>
        Invoice Number:
        <input type="text" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} />
      </label>
      <label>
        Client Name:
        <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} />
      </label>
      <label>
        Client Email:
        <input type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} />
      </label>
      <label>
        Items:
        <textarea value={items} onChange={(e) => setItems(e.target.value)} />
      </label>
      <label>
        Total Amount (ETB):
        <input type="number" value={totalAmount || ''} onChange={(e) => setTotalAmount(Number(e.target.value))} />
      </label>
      <label>
        Due Date:
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      </label>
      <button type="submit">Create Invoice</button>
    </form>
  );
}
