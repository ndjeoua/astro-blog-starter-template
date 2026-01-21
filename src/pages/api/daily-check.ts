import type { APIRoute } from 'astro';
import { getUpcomingMatches } from '../../lib/bookmaker/data';
import { analyzeMatches } from '../../lib/bookmaker/model';
import { sendToSlack } from '../../lib/bookmaker/slack';

export const GET: APIRoute = async ({ request }) => {
  // Optional: Add a secret check here if you want to protect this endpoint
  // const url = new URL(request.url);
  // if (url.searchParams.get('secret') !== import.meta.env.CRON_SECRET) { ... }

  try {
    console.log('🏁 Starting Daily Bookmaker Check...');

    // 1. Get Data
    const matches = await getUpcomingMatches();
    console.log(`📊 Fetched ${matches.length} matches.`);

    // 2. Analyze
    const recommendations = analyzeMatches(matches);
    console.log(`🧠 Generated ${recommendations.length} recommendations.`);

    // 3. Notify
    await sendToSlack(recommendations);
    console.log('📨 Slack notification sent (if configured).');

    return new Response(JSON.stringify({
      success: true,
      message: 'Analysis complete',
      matchesAnalyzed: matches.length,
      recommendationsCount: recommendations.length,
      topPick: recommendations[0] || null
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error in daily-check:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
