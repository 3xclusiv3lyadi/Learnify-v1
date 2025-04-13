'use client';

import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {useState} from 'react';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Implement your search logic here, e.g., API call or data filtering
    console.log('Searching for:', searchQuery);
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

      <p className="text-lg">Basic Search Page</p>
    </div>
  );
};

export default SearchPage;
