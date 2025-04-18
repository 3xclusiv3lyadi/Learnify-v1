'use client';

import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {useState} from 'react';
import {useRouter} from 'next/navigation';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery) {
      router.push(`/search/results?query=${searchQuery}`);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      // Basic validation (you might want to check file types and sizes more rigorously)
      if (selectedFile.type !== 'application/pdf' && selectedFile.type !== 'application/vnd.ms-powerpoint' && selectedFile.type !== 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
        alert('Invalid file type. Please upload a PDF or PPT file.');
        return;
      }

      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Navigate to the results page with the file
      router.push(`/search/results?file=${selectedFile.name}`);
    } else {
      alert('Please select a file.');
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

      {/* File Upload Option */}
      <div className="flex w-full max-w-md mb-4 space-x-2">
        <Input
          type="file"
          accept=".pdf,.ppt,.pptx"
          onChange={handleFileChange}
          className="flex-grow"
        />
        <Button onClick={handleFileUpload} disabled={!selectedFile}>Upload</Button>
      </div>

      {/* Image and Quote Section */}
      <img
        src="https://picsum.photos/400/200"
        alt="Books"
        className="rounded-lg shadow-md w-3/4 mb-4"
      />
      <p className="text-md italic mb-4 text-center w-3/4">
        "The only way to do great work is to love what you do." - Steve Jobs
      </p>
    </div>
  );
};

export default SearchPage;
