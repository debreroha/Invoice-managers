'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Invoice {
  id: number;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  items: string;
  totalAmount: number;
  dueDate: string;
}

export default function InvoicesList() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    fetch('/api/invoices')
      .then((res) => res.json())
      .then((data) => {
        const formattedData = data.map((invoice: any) => ({
          ...invoice,
          totalAmount: Number(invoice.totalAmount)
        }));
        setInvoices(formattedData);
      });
  }, []);

  const handleDelete = async (id: number) => {
    const updatedInvoices = invoices.filter(invoice => invoice.id !== id);
    setInvoices(updatedInvoices);

    const response = await fetch(`/api/invoices?id=${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      setInvoices(invoices);
      alert('Failed to delete invoice');
    }
  };

  return (
    <>
      <h1 className='flex justify-center ... mb-4 text-3xl font-bold underline'>Invoices List</h1>
      <div className='flex justify-center ...'>
        <table className='border-collapse border border-green-800 ...'>
          <thead>
            <tr>
              <th className='border border-green-600 ...'>InvoiceNum</th>
              <th className='border border-green-600 ...'>Client Name</th>
              <th className='border border-green-600 ...'>Client Email</th>
              <th className='border border-green-600 ...'>Services</th>
              <th className='border border-green-600 ...'>Total Amount (ETB)</th>
              <th className='border border-green-600 ...'>Due Date</th>
              <th className='border border-green-600 ...'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td className='border border-green-600 ...'>{invoice.invoiceNumber}</td>
                <td className='border border-green-600 ...'>{invoice.clientName}</td>
                <td className='border border-green-600 ...'>{invoice.clientEmail}</td>
                <td className='border border-green-600 ...'>{invoice.items}</td>
                <td className='border border-green-600 ...'>{invoice.totalAmount.toFixed(2)}</td>
                <td className='border border-green-600 ...'>{invoice.dueDate}</td>
                <td className='border border-green-600 ...'>
                  <Link className='ml-5 pr-4 text-blue-900 hover:underline' href={`/invoices/${invoice.id}/edit`}>Edit</Link>
                  <Link className='text-red-900 hover:underline' href={`/invoices/${invoice.id}/delete`}>delete</Link>
                  {/* <button onClick={() => handleDelete(invoice.id)}>Delete</button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
