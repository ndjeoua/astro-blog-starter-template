import type { Match } from './types';

export async function getUpcomingMatches(): Promise<Match[]> {
  // In a real scenario, this would fetch from an API like API-Football
  // const response = await fetch('https://api-football.com/fixtures...');

  // Mock data for demonstration
  const today = new Date().toISOString().split('T')[0];

  return [
    {
      id: 'm1',
      homeTeam: { name: 'Real Madrid' },
      awayTeam: { name: 'Barcelona' },
      date: `${today}T20:00:00Z`,
      odds: { home: 2.10, draw: 3.50, away: 3.10 }
    },
    {
      id: 'm2',
      homeTeam: { name: 'Manchester City' },
      awayTeam: { name: 'Liverpool' },
      date: `${today}T18:30:00Z`,
      odds: { home: 1.85, draw: 3.80, away: 4.00 }
    },
    {
      id: 'm3',
      homeTeam: { name: 'PSG' },
      awayTeam: { name: 'Marseille' },
      date: `${today}T21:00:00Z`,
      odds: { home: 1.40, draw: 5.00, away: 7.50 }
    },
    {
      id: 'm4',
      homeTeam: { name: 'Bayern Munich' },
      awayTeam: { name: 'Dortmund' },
      date: `${today}T15:30:00Z`,
      odds: { home: 1.60, draw: 4.20, away: 4.80 }
    }
  ];
}
