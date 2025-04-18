'use client';

import Link from 'next/link';

const HomeScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to StudyGenius!</h1>
      <p className="text-lg mb-4 text-center">
        Please <Link href="/login" className="text-blue-500 hover:underline">login</Link> or <Link href="/login" className="text-blue-500 hover:underline">register</Link> to continue.
      </p>
    </div>
  );
};

export default HomeScreen;
