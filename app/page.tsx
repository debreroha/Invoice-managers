import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl mb-8">Welcome to Invoice Manager</h1>
      <Link href="/login" className="mb-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        Login
      </Link>
      <Link href="/sign-up" className="px-6 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white">
        Sign Up
      </Link>
    </div>
  );
}
