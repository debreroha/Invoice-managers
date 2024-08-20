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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await fetch('/api/invoices');
        if (!res.ok) throw new Error('Failed to fetch invoices');
        const data = await res.json();
        const formattedData = data.map((invoice: any) => ({
          ...invoice,
          totalAmount: Number(invoice.totalAmount),
        }));
        setInvoices(formattedData);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this invoice?')) {
      const updatedInvoices = invoices.filter((invoice) => invoice.id !== id);

      try {
        const response = await fetch(`/api/delete/?id=${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete invoice');
        }
        
        setInvoices(updatedInvoices); // Update the state only after successful deletion

      } catch (error:any) {
        setError(error.message);
        alert(error.message);
        // Optionally: Re-fetch invoices to ensure state consistency
        const res = await fetch('/api/delete');
        const data = await res.json();
        setInvoices(data);
      }
    }
  };

  if (loading) return <p className='text-center text-gray-500'>Loading...</p>;
  if (error) return <p className='text-center text-red-500'>Error: {error}</p>;

  return (
    <div className='max-w-7xl mx-auto px-4 py-6'>
      <h1 className='text-3xl font-bold mb-6 text-center text-gray-800'>Invoices List</h1>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-200 rounded-lg shadow-md'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='py-3 px-4 border-b border-gray-300 text-left text-gray-600'>Invoice Number</th>
              <th className='py-3 px-4 border-b border-gray-300 text-left text-gray-600'>Client Name</th>
              <th className='py-3 px-4 border-b border-gray-300 text-left text-gray-600'>Client Email</th>
              <th className='py-3 px-4 border-b border-gray-300 text-left text-gray-600'>Services</th>
              <th className='py-3 px-4 border-b border-gray-300 text-left text-gray-600'>Total Amount (ETB)</th>
              <th className='py-3 px-4 border-b border-gray-300 text-left text-gray-600'>Due Date</th>
              <th className='py-3 px-4 border-b border-gray-300 text-left text-gray-600'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className='hover:bg-gray-50'>
                <td className='py-3 px-4 border-b border-gray-300'>{invoice.invoiceNumber}</td>
                <td className='py-3 px-4 border-b border-gray-300'>{invoice.clientName}</td>
                <td className='py-3 px-4 border-b border-gray-300'>{invoice.clientEmail}</td>
                <td className='py-3 px-4 border-b border-gray-300'>{invoice.items}</td>
                <td className='py-3 px-4 border-b border-gray-300'>{invoice.totalAmount.toFixed(2)}</td>
                <td className='py-3 px-4 border-b border-gray-300'>{invoice.dueDate}</td>
                <td className='py-3 px-4 border-b border-gray-300'>
                  <Link className='text-blue-600 hover:underline mr-3' href={`/invoices/${invoice.id}/edit`}>
                    Edit
                  </Link>
                  <button
                    className='text-red-600 hover:underline'
                    onClick={() => handleDelete(invoice.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
