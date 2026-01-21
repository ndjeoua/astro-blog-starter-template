export interface Team {
  name: string;
}

export interface Odds {
  home: number;
  draw: number;
  away: number;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  date: string;
  odds: Odds;
}

export interface Recommendation {
  match: Match;
  selection: 'home' | 'draw' | 'away';
  probability: number; // 0 to 1
  reason: string;
  expectedValue: number;
}
