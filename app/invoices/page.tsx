"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Invoice {
  id: number;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  items: string;
  totalAmount: number; // Assume amount is in ETB
  dueDate: string;
}

export default function InvoicesList() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/invoices')
      .then((res) => res.json())
      .then((data: Invoice[]) => setInvoices(data));
  }, []);

  return (
    <div>
      <h1>Invoices List</h1>
      {/* <Link href="/create-invoice">Create New Invoice</Link> */}
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
              <td>{invoice.totalAmount} ETB</td> {/* Display amount with two decimal places */}
              <td>{invoice.dueDate}</td>
              <td>
                <Link href={`/invoices/${invoice.id}/edit`}>Edit</Link>
                <Link href={`/invoices/${invoice.id}/delete`}>Delete</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
