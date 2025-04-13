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
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md bg-background shadow-md rounded-lg overflow-hidden">
        <CardHeader className="flex flex-col items-center justify-center p-6 pb-0 space-y-2">
          <Avatar className="h-24 w-24 rounded-full border-4 border-primary">
            <AvatarImage src="https://picsum.photos/200/200" alt="Profile Picture" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl font-semibold">{name}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Age:</span>
              <span>{age !== null ? age : 'N/A'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Gender:</span>
              <span>{gender}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Achievements:</span>
              <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                {achievements}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Points:</span>
              <span className="inline-flex items-center rounded-full bg-support px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                {points}
              </span>
            </div>
          </div>

          {/* Badges Section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Badges Earned</h3>
            <div className="flex flex-wrap gap-2">
              {badges.map(badge => (
                <Badge key={badge}>{badge}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
