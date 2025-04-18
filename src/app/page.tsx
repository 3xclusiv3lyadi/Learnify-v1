'use client';

import {useEffect, useState} from 'react';
import {useAuth} from '@/hooks/use-auth';
import {Icons} from '@/components/icons';
import {Button} from '@/components/ui/button';
import {useRouter} from 'next/navigation';
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Badge} from '@/components/ui/badge';
import {Card, CardContent} from '@/components/ui/card';
import Image from 'next/image';

const HomeScreen = () => {
  const {user, isLoading} = useAuth();
  const router = useRouter();
  const [greeting, setGreeting] = useState('');
  const [open, setOpen] = useState(true);

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
    <div className="flex flex-col items-center justify-start min-h-screen p-4 relative" style={{ backgroundColor: '#E7D4BB' }}>
      {/* Bubble Decorations */}
      <div className="bubble bubble-1"></div>
      <div className="bubble bubble-2"></div>
      <div className="bubble bubble-3"></div>
      <div className="bubble bubble-4"></div>
      <div className="bubble bubble-5"></div>
      <div className="bubble bubble-6"></div>
      <div className="bubble bubble-7"></div>
      <div className="bubble bubble-8"></div>
      <div className="bubble bubble-9"></div>
      <div className="bubble bubble-10"></div>
       {/* Top Navigation Bar */}
       <div className="w-full bg-[#48252f] text-white p-4 flex items-center justify-between rounded-md shadow-md mb-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-8 w-8 rounded-full">
            <AvatarImage src="https://picsum.photos/200/200" alt="Profile Picture" />
            <AvatarFallback>{user?.displayName?.substring(0, 2) || 'JD'}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{user?.displayName || 'Learner'}</span>
          <Badge variant="secondary">1200 XP</Badge>
        </div>
        {/* You can add more navigation items here if needed */}
      </div>
            {/* AI Generated Sticker */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
        <Image
          src="https://picsum.photos/100/150" // Replace with actual AI-generated image URL when available
          alt="AI Student"
          width={100}
          height={150}
          className="rounded-lg shadow-md"
        />
      </div>
      {/* Motivational Quote */}
      <p className="text-md italic text-center mb-4">
        "The expert in anything was once a beginner." - Helen Hayes
      </p>

      {/* What is Learnify Heading */}
      <h2 className="text-4xl font-bold mb-4" style={{color: '#29281e', fontFamily: 'Times New Roman'}}>What is Learnify</h2>

      {user ? (
        <>
          {/* User Profile Section */}
          <Card className="w-full max-w-md p-4 mb-4 rounded-lg shadow-md bg-white/90 backdrop-blur-sm border border-gray-200">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12 rounded-full">
                <AvatarImage src="https://picsum.photos/200/200" alt="Profile Picture" />
                <AvatarFallback>{user.displayName?.substring(0, 2) || 'JD'}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-lg font-semibold">{user.displayName || 'Learner'}</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">XP:</span>
                  <Badge variant="secondary">1200</Badge>
                </div>
              </div>
            </div>
          </Card>

          {/* Logged-in User Greeting Card */}
          <div className="w-full max-w-md p-6 rounded-lg shadow-md bg-white/90 backdrop-blur-sm border border-gray-200">
            <h1 className="text-2xl font-semibold mb-2">
              {greeting}, {user.displayName || 'Learner'}!
            </h1>
            <p className="text-md mb-4">Ready to learn something new today?</p>

            {/* Motivational Quote */}
            <p className="text-sm italic text-center">
              "The expert in anything was once a beginner." - Helen Hayes
            </p>
          </div>
        </>
      ) : (
        // Guest User Prompt
        <div className="text-center">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Welcome to Learnify!</DialogTitle>
                <DialogDescription>
                  Embark on a journey of knowledge with us.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold">Quote of the Day</h2>
                  <p className="text-sm italic">
                    "Education is the most powerful weapon which you can use to change the world." - Nelson Mandela
                  </p>
                </div>
                <div className="space-y-2">
                  <img
                    src="https://picsum.photos/400/200"
                    alt="Educational"
                    className="rounded-md shadow-md"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => router.push('/login')}>
                  <Icons.login className="mr-2 h-4 w-4"/>
                  Get Started
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
