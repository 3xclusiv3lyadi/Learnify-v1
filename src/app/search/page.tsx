'use client';

import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {useState} from 'react';
import {useRouter} from 'next/navigation';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery) {
      router.push(`/search/results?query=${searchQuery}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Search</h1>

      {/* Manual Search Bar */}
      <div className="flex w-full max-w-md mb-4 space-x-2">
        <Input
          type="text"
          placeholder="Enter search term"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
    </div>
  );
};

export default SearchPage;
