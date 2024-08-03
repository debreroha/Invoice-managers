import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DeleteInvoice({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/api/invoices/${id}`, {
        method: 'DELETE'
      }).then(() => router.push('/invoices'));
    }
  }, [id]);

  return <div>Deleting...</div>;
}
