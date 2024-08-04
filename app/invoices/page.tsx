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
    <div>
      <h1>Invoices List</h1>
      <table>
        <thead>
          <tr>
            <th>Invoice Number</th>
            <th>Client Name</th>
            <th>Client Email</th>
            <th>Services</th>
            <th>Total Amount (ETB)</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.invoiceNumber}</td>
              <td>{invoice.clientName}</td>
              <td>{invoice.clientEmail}</td>
              <td>{invoice.items}</td>
              <td>{invoice.totalAmount.toFixed(2)} ETB</td>
              <td>{invoice.dueDate}</td>
              <td>
                <Link href={`/invoices/${invoice.id}/edit`}>Edit</Link>
                <Link href={`/invoices/${invoice.id}/delete`}>delete</Link>
                {/* <button onClick={() => handleDelete(invoice.id)}>Delete</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
