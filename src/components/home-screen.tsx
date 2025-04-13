'use client';

import {useEffect, useState} from 'react';
import {generateHomeScreenImages} from '@/ai/flows/generate-home-screen-images';

const subjects = ['Physics', 'Chemistry', 'Computer Science', 'Mathematics', 'Biology', 'History', 'Geography', 'Economics'];

export const HomeScreen = () => {
  const [imageUrls, setImageUrls] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await generateHomeScreenImages({subjects});
        setImageUrls(result.imageUrls);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Welcome to Learnify!</h1>
      <p className="text-lg mb-8 text-center">
        Your AI-powered study companion.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {subjects.map(subject => (
          <div key={subject} className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-2">{subject}</h2>
            {imageUrls && imageUrls[subject] ? (
              <img
                src={imageUrls[subject]}
                alt={subject}
                className="rounded-lg shadow-md w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-muted rounded-lg shadow-md flex items-center justify-center">
                Loading image...
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

