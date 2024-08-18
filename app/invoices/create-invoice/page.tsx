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
      <h1 className='flex justify-center ... mb-5 text-3xl font-bold underline'>Create Invoice</h1>
      <div className='flex justify-center ...'>
      <form onSubmit={handleSubmit} className='grid grid-cols-2 grid-rows-4 gap-x-5 justify-items-stretch ... '>
        <label>
          InvoiceNum:
          <input className='placeholder-black-500 ...' type="text" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} />
        </label>
        <label className='justify-self-center '>
          ClientName:
          <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} />
        </label>
        <label>
          ClientEmail:
          <input type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} />
        </label>
        <label className='justify-self-center '>
          Services:
          <textarea value={items} onChange={(e) => setItems(e.target.value)} />
        </label>
        <label>
          TotalAmount (ETB):
          <input type="number" value={totalAmount || ''} onChange={(e) => setTotalAmount(Number(e.target.value))} />
        </label>
        <label className='justify-self-center'>
          Due Date:
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </label>
        <button type="submit" className='bg-green-500 bg-opacity-75 col-span-2 ... text-black hover:text-red-700 ...'>Create Invoice</button>
      </form>
      </div>
    </>
  );
}
