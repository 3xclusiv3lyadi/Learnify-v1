'use client';

import {useEffect, useState} from 'react';
import {getWeeklyLeaderboard, LeaderboardEntry} from '@/services/leaderboard';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Badge} from '@/components/ui/badge';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import Confetti from 'react-confetti';

const LeaderboardPage = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [isConfettiRunning, setIsConfettiRunning] = useState(true); // State for confetti

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const data = await getWeeklyLeaderboard();
      setLeaderboardData(data);
    };

    fetchLeaderboard();

    // Set confetti to stop after 3 seconds
    const confettiTimeout = setTimeout(() => {
      setIsConfettiRunning(false);
    }, 3000);

    return () => clearTimeout(confettiTimeout); // Clear timeout on unmount
  }, []);

  // Determine the top three entries
  const topThree = leaderboardData.slice(0, 3);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4">
      {/* Confetti component */}
      {isConfettiRunning && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false} // Prevents confetti from disappearing
        />
      )}
      <h1 className="text-3xl font-bold mb-4">Weekly Leaderboard</h1>

      {/* Top Three Display */}
      <div className="flex justify-center w-full max-w-4xl mb-8">
        {topThree.map((entry, index) => (
          <Card key={entry.userId} className="w-full max-w-md mx-2">
            <CardHeader className="flex flex-col items-center justify-center p-6 pb-0 space-y-2">
              <Avatar className="h-20 w-20 rounded-full border-2 border-primary">
                <AvatarImage src={`https://picsum.photos/id/${index + 10}/200/200`} alt={entry.displayName} />
                <AvatarFallback>{entry.displayName.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl font-semibold">{entry.displayName}</CardTitle>
              <CardDescription>
                {index === 0 ? '🥇 First Place' : index === 1 ? '🥈 Second Place' : '🥉 Third Place'}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <span className="font-semibold">Points:</span>
                <Badge variant="secondary">{entry.points}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Rest of the Leaderboard */}
      <div className="w-full max-w-4xl">
        {leaderboardData.slice(3).map((entry, index) => (
          <Card key={entry.userId} className="mb-2">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <span>{index + 4}.</span> {/* Adjusted index for the rest of the list */}
                <Avatar className="h-8 w-8 rounded-full">
                  <AvatarImage src={`https://picsum.photos/id/${index + 20}/200/200`} alt={entry.displayName} />
                  <AvatarFallback>{entry.displayName.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <span>{entry.displayName}</span>
              </div>
              <Badge variant="secondary">{entry.points}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardPage;
