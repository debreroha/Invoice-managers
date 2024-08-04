'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditInvoice() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState({
    invoiceNumber: '',
    clientName: '',
    clientEmail: '',
    items: '',
    totalAmount: 0,
    dueDate: ''
  });

  const router = useRouter();

  useEffect(() => {
    fetch(`/api/invoices?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setInvoice(data);
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/invoices', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invoice),
    });

    if (response.ok) {
      router.push('/invoices');
    } else {
      alert('Failed to update invoice');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit Invoice</h1>
      <label>
        Invoice Number:
        <input type="text" value={invoice.invoiceNumber} onChange={(e) => setInvoice({ ...invoice, invoiceNumber: e.target.value })} />
      </label>
      <label>
        Client Name:
        <input type="text" value={invoice.clientName} onChange={(e) => setInvoice({ ...invoice, clientName: e.target.value })} />
      </label>
      <label>
        Client Email:
        <input type="email" value={invoice.clientEmail} onChange={(e) => setInvoice({ ...invoice, clientEmail: e.target.value })} />
      </label>
      <label>
        Items:
        <textarea value={invoice.items} onChange={(e) => setInvoice({ ...invoice, items: e.target.value })} />
      </label>
      <label>
        Total Amount (ETB):
        <input type="number" value={invoice.totalAmount} onChange={(e) => setInvoice({ ...invoice, totalAmount: Number(e.target.value) })} />
      </label>
      <label>
        Due Date:
        <input type="date" value={invoice.dueDate} onChange={(e) => setInvoice({ ...invoice, dueDate: e.target.value })} />
      </label>
      <button type="submit">Update Invoice</button>
    </form>
  );
}
