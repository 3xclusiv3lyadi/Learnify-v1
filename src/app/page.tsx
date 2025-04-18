'use client';

import {useEffect, useState} from 'react';
import {generateHomeScreenImages} from '@/ai/flows/generate-home-screen-images';
import Link from 'next/link';
import {Button} from '@/components/ui/button';

const subjects = ['Physics', 'Chemistry', 'Computer Science', 'Mathematics', 'Biology', 'History', 'Geography', 'Economics'];

const HomeScreen = () => {
  const [imageUrls, setImageUrls] = useState<Record<string, string> | null>(null);
  const [greeting, setGreeting] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await generateHomeScreenImages({subjects});
        setImageUrls(result.imageUrls);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    const generateGreeting = () => {
      const now = new Date();
      const hour = now.getHours();
      let newGreeting = '';
      let newWelcomeMessage = '';

      // Simple welcome back/new user logic (can be expanded)
      const isNewUser = Math.random() < 0.5; // Dummy logic
      newWelcomeMessage = isNewUser ? "New to Learnify? Let's get started!" : "Welcome back! Ready to learn?";

      if (hour < 12) {
        newGreeting = 'Good morning!';
      } else if (hour < 18) {
        newGreeting = 'Good afternoon!';
      } else {
        newGreeting = 'Good evening!';
      }

      setGreeting(newGreeting);
      setWelcomeMessage(newWelcomeMessage);
    };

    const generateQuote = () => {
      const quotes = [
        "The beautiful thing about learning is nobody can take it away from you. - B.B. King",
        "Education is the most powerful weapon which you can use to change the world. - Nelson Mandela",
        "Live as if you were to die tomorrow. Learn as if you were to live forever. - Mahatma Gandhi",
        "The only way to do great work is to love what you do. - Steve Jobs",
        "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
      ];
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex]);
    };

    fetchImages();
    generateGreeting();
    generateQuote();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Welcome to Learnify!</h1>
      
      <img
        src="https://picsum.photos/400/200"
        alt="Two students studying"
        className="rounded-lg shadow-md w-3/4 mb-4"
      />
      
      <p className="text-lg mb-8 text-center">
        Your AI-powered study companion.
      </p>

      {/* Greeting Section */}
      {greeting && (
        <div className="text-2xl font-semibold mb-2">{greeting}</div>
      )}
      {welcomeMessage && (
        <div className="text-xl mb-4">{welcomeMessage}</div>
      )}

      {/* Quote Section */}
      {quote && (
        <div className="text-md italic mb-4 text-center w-3/4">
          "{quote}"
        </div>
      )}

      <Link href="/search" className="mb-4 text-blue-500 hover:underline">
        Explore all these subjects and more with Learnify
      </Link>

      <Button asChild>
        <Link href="/search">
          Explore all these subjects and more with Learnify
        </Link>
      </Button>


      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {subjects.map(subject => (
          <div key={subject} className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-2">{subject}</h2>
            <Link href={`/subjects/${subject.toLowerCase().replace(/ /g, '-')}`}>
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
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
