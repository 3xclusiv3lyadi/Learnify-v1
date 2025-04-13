/**
 * Represents a leaderboard entry with user information and points.
 */
export interface LeaderboardEntry {
  /**
   * The user's unique identifier.
   */
  userId: string;
  /**
   * The user's display name.
   */
  displayName: string;
  /**
   * The user's points or score.
   */
  points: number;
}

/**
 * Asynchronously retrieves the weekly leaderboard data.
 *
 * @returns A promise that resolves to an array of LeaderboardEntry objects, sorted by points.
 */
export async function getWeeklyLeaderboard(): Promise<LeaderboardEntry[]> {
  // TODO: Implement this by calling an API or database query.

  return [
    {
      userId: 'user1',
      displayName: 'Alice',
      points: 1200,
    },
    {
      userId: 'user2',
      displayName: 'Bob',
      points: 950,
    },
    {
      userId: 'user3',
      displayName: 'Charlie',
      points: 800,
    },
  ];
}
