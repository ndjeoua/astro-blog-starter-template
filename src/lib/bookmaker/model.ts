import type { Match, Recommendation } from './types';

export function analyzeMatches(matches: Match[]): Recommendation[] {
  const recommendations: Recommendation[] = [];

  for (const match of matches) {
    // 1. Calculate Implied Probabilities (1 / Odds)
    const impliedHome = 1 / match.odds.home;

    // 2. Simulate Model Prediction
    // In a real world, this comes from your database/AI model.
    // Here we generate a "True Probability" simulation.
    // We'll give a random "Edge" to the home team for the sake of the demo
    // ensuring we sometimes find a "value bet".

    // Random probability between 0.3 and 0.8 for home win
    const estimatedProbHome = 0.4 + (Math.random() * 0.4);

    // 3. Calculate Expected Value (EV)
    // EV = (Probability * DecimalOdds) - 1
    const evHome = (estimatedProbHome * match.odds.home) - 1;

    // 4. Filter for Value Bets
    // We only recommend if EV is positive (mathematically profitable long term)
    // and if the probability isn't too low (e.g., > 50%) to ensure some "wins".
    if (evHome > 0.05 && estimatedProbHome > 0.5) {
        recommendations.push({
            match,
            selection: 'home',
            probability: estimatedProbHome,
            reason: `Value Bet detected on ${match.homeTeam.name}. Model Probability: ${(estimatedProbHome*100).toFixed(1)}% vs Implied: ${(impliedHome*100).toFixed(1)}%`,
            expectedValue: evHome
        });
    }
  }

  // Sort by highest Expected Value first
  return recommendations.sort((a, b) => b.expectedValue - a.expectedValue);
}
