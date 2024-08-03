import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface InvoiceData {
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  items: string;
  totalAmount: number; // Assume amount is in ETB
  dueDate: string;
}

export default function EditInvoice({ params }: { params: { id: string } }) {
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/api/invoices?id=${id}`)
        .then((res) => res.json())
        .then((data: InvoiceData) => setInvoiceData(data));
    }
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (invoiceData) {
      setInvoiceData({
        ...invoiceData,
        [name]: name === 'totalAmount' ? parseFloat(value) : value
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (invoiceData) {
      const response = await fetch(`http://localhost:3001/api/invoices?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(invoiceData)
      });
      if (response.ok) {
        router.push('/invoices');
      }
    }
  };

  if (!invoiceData) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Invoice</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="invoiceNumber"
          placeholder="Invoice Number"
          value={invoiceData.invoiceNumber}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="clientName"
          placeholder="Client Name"
          value={invoiceData.clientName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="clientEmail"
          placeholder="Client Email"
          value={invoiceData.clientEmail}
          onChange={handleChange}
          required
        />
        <textarea
          name="items"
          placeholder="Itemized List of Products/Services"
          value={invoiceData.items}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="totalAmount"
          placeholder="Total Amount (ETB)"
          value={invoiceData.totalAmount}
          onChange={handleChange}
          required
          step="0.01" // Allow decimal values
        />
        <input
          type="date"
          name="dueDate"
          placeholder="Due Date"
          value={invoiceData.dueDate}
          onChange={handleChange}
          required
        />
        <button type="submit">Update Invoice</button>
      </form>
    </div>
  );
}
