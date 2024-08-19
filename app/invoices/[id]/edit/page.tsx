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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Invoice</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Invoice Number:</label>
            <input
              type="text"
              value={invoice.invoiceNumber}
              onChange={(e) => setInvoice({ ...invoice, invoiceNumber: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Client Name:</label>
            <input
              type="text"
              value={invoice.clientName}
              onChange={(e) => setInvoice({ ...invoice, clientName: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Client Email:</label>
            <input
              type="email"
              value={invoice.clientEmail}
              onChange={(e) => setInvoice({ ...invoice, clientEmail: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Items:</label>
            <textarea
              value={invoice.items}
              onChange={(e) => setInvoice({ ...invoice, items: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Total Amount (ETB):</label>
            <input
              type="number"
              value={invoice.totalAmount}
              onChange={(e) => setInvoice({ ...invoice, totalAmount: Number(e.target.value) })}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Due Date:</label>
            <input
              type="date"
              value={invoice.dueDate}
              onChange={(e) => setInvoice({ ...invoice, dueDate: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition duration-300"
          >
            Update Invoice
          </button>
        </form>
      </div>
    </div>
  );
}
