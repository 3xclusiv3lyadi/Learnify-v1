'use client';

import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Badge} from '@/components/ui/badge';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {useEffect, useState} from 'react';

const ProfilePage = () => {
  const [name, setName] = useState<string>('John Doe');
  const [age, setAge] = useState<number | null>(null);
  const [gender, setGender] = useState<string>('Unknown');
  const [description, setDescription] = useState<string>('No description available.');
  const [achievements, setAchievements] = useState<number>(0);
  const [points, setPoints] = useState<number>(0);
  const [badges, setBadges] = useState<string[]>([
    'Genius Badge',
    'Achiever Badge',
    'Smart Badge',
  ]); // Example badges

  useEffect(() => {
    // Simulate fetching user data (replace with actual data fetching)
    setTimeout(() => {
      setName('John Doe');
      setAge(25);
      setGender('Male');
      setDescription('A passionate learner and knowledge seeker.');
      setAchievements(10);
      setPoints(1500);
    }, 500);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 relative" style={{ backgroundColor: '#857861' }}>
       {/* Bubble Decorations */}
      <div className="bubble bubble-1"></div>
      <div className="bubble bubble-2"></div>
      <div className="bubble bubble-3"></div>
      <div className="bubble bubble-4"></div>
      <div className="bubble bubble-5"></div>
      <Card className="w-full max-w-md bg-card shadow-md rounded-lg overflow-hidden">
        <CardHeader className="flex flex-col items-center justify-center p-6 pb-0 space-y-2">
          <Avatar className="h-24 w-24 rounded-full border-4 border-primary">
            <AvatarImage src="https://picsum.photos/200/200" alt="Profile Picture" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl font-semibold text-primary">{name}</CardTitle>
          <CardDescription className="text-sm text-support">{description}</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 gap-4 text-black">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-secondary">Age:</span>
              <span className="text-foreground">{age !== null ? age : 'N/A'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-secondary">Gender:</span>
              <span className="text-foreground">{gender}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-secondary">Achievements:</span>
              <Badge variant="secondary">{achievements}</Badge>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-secondary">Points:</span>
              <Badge variant="support">{points}</Badge>
            </div>
          </div>

          {/* Badges Section */}
          <div className="mt-6 text-black">
            <h3 className="text-lg font-semibold mb-2 text-primary">Badges Earned</h3>
            <div className="flex flex-wrap gap-2">
              {badges.map(badge => (
                <Badge key={badge} variant="default">{badge}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
