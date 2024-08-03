"use client"

import { useEffect, useState } from 'react';

interface Invoice {
  id: number;
  invoiceNumber: string;
  clientName: string;
  totalAmount: number;
  dueDate: string;
}

export default function Invoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/invoices')
      .then((res) => res.json())
      .then((data: Invoice[]) => setInvoices(data));
  }, []);

  return (
    <div>
      <h1>Invoices</h1>
      <table>
        <thead>
          <tr>
            <th>Invoice Number</th>
            <th>Client Name</th>
            <th>Total Amount</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.invoiceNumber}</td>
              <td>{invoice.clientName}</td>
              <td>{invoice.totalAmount}</td>
              <td>{new Date(invoice.dueDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
