'use client';

import {useEffect, useState} from 'react';
import {useAuth} from '@/hooks/use-auth';
import {Icons} from '@/components/icons';
import {Button} from '@/components/ui/button';
import {useRouter} from 'next/navigation';
import Lottie from 'react-lottie-player';
import lottieJson from '../../public/lottie.json';

const HomeScreen = () => {
  const {user, isLoading} = useAuth();
  const router = useRouter();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const generateGreeting = () => {
      const now = new Date();
      const hour = now.getHours();
      let newGreeting = '';

      if (hour < 12) {
        newGreeting = 'Good morning';
      } else if (hour < 18) {
        newGreeting = 'Good afternoon';
      } else {
        newGreeting = 'Good evening';
      }

      setGreeting(newGreeting);
    };

    generateGreeting();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4">
      {user ? (
        // Logged-in User Greeting Card
        <div className="w-full max-w-md p-6 rounded-lg shadow-md bg-white/90 backdrop-blur-sm border border-gray-200">
          <h1 className="text-2xl font-semibold mb-2">
            {greeting}, {user.displayName || 'Learner'}!
          </h1>
          <p className="text-md mb-4">Ready to learn something new today?</p>

          {/* Lottie Animation */}
          <div className="w-32 h-32 mx-auto mb-4">
            <Lottie loop animationData={lottieJson} play />
          </div>

          {/* Motivational Quote */}
          <p className="text-sm italic text-center">
            "The expert in anything was once a beginner." - Helen Hayes
          </p>
        </div>
      ) : (
        // Guest User Prompt
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Welcome to Learnify!</h1>
          <p className="text-lg mb-4">
            Please register or login to continue your learning journey.
          </p>
          <Button onClick={() => router.push('/login')}>
            <Icons.login className="mr-2 h-4 w-4" />
            Get Started
          </Button>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
