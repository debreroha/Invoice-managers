import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Welcome to Invoice Manager</h1>
        <p className="text-gray-600 mb-8">The ultimate tool to manage your invoices seamlessly.</p>
        <div className="space-y-4">
          <Link href="/login" className="block px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
            Login
          </Link>
          <Link href="/sign-up" className="block px-6 py-3 border border-blue-500 text-blue-500 rounded-lg shadow-md hover:bg-blue-500 hover:text-white transition duration-300">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
