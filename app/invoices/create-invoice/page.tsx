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
    <>
      <h1 className='text-center mb-8 text-4xl font-extrabold text-gray-800 underline'>Create Invoice</h1>
      <div className='max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md'>
        <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-6'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Invoice Number</label>
            <input 
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' 
              type="text" 
              value={invoiceNumber} 
              onChange={(e) => setInvoiceNumber(e.target.value)} 
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Client Name</label>
            <input 
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' 
              type="text" 
              value={clientName} 
              onChange={(e) => setClientName(e.target.value)} 
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Client Email</label>
            <input 
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' 
              type="email" 
              value={clientEmail} 
              onChange={(e) => setClientEmail(e.target.value)} 
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Services</label>
            <textarea 
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' 
              value={items} 
              onChange={(e) => setItems(e.target.value)} 
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Total Amount (ETB)</label>
            <input 
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' 
              type="number" 
              value={totalAmount || ''} 
              onChange={(e) => setTotalAmount(Number(e.target.value))} 
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Due Date</label>
            <input 
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' 
              type="date" 
              value={dueDate} 
              onChange={(e) => setDueDate(e.target.value)} 
            />
          </div>
          <div>
            <button 
              type="submit" 
              className='w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Create Invoice
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
