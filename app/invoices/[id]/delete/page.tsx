'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function DeleteInvoice({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [invoice, setInvoice] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/invoices?id=${params.id}`)
      .then((res) => res.json())
      .then((data) => setInvoice(data))
      .catch((err) => console.error('Error fetching invoice:', err));
  }, [params.id]);

  const handleDelete = async () => {
    const response = await fetch(`/api/invoices?id=${params.id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      router.push('/invoices');
    } else {
      alert('Failed to delete invoice');
    }
  };

  if (!invoice) return <div>Loading...</div>;

  return (
    <div>
      <h1>Delete Invoice</h1>
      <p>Are you sure you want to delete the invoice with the number <strong>{invoice.invoiceNumber}</strong>?</p>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={() => router.push('/invoices')}>Cancel</button>
    </div>
  );
}
