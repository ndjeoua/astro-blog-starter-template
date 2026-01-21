import type { Recommendation } from './types';

export async function sendToSlack(recommendations: Recommendation[], webhookUrl?: string) {
  // Try to get URL from args, or Astro env (safely checked)
  const envUrl = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env.SLACK_WEBHOOK_URL : process.env.SLACK_WEBHOOK_URL;
  const url = webhookUrl || envUrl;

  if (!url) {
    console.warn('⚠️ SLACK_WEBHOOK_URL is not defined. Skipping Slack notification.');
    console.log('Would have sent:', JSON.stringify(recommendations, null, 2));
    return;
  }

  if (recommendations.length === 0) {
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ text: "🤖 Agent Bookmaker: Pas de pari haute valeur détecté aujourd'hui." }),
      headers: { 'Content-Type': 'application/json' }
    });
    return;
  }

  // Take top 2 max as requested
  const topPicks = recommendations.slice(0, 2);

  const blocks = [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "🎯 Recommandations du Jour (6h)",
        emoji: true
      }
    },
    {
      type: "divider"
    }
  ];

  topPicks.forEach(rec => {
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${rec.match.homeTeam.name}* vs *${rec.match.awayTeam.name}*\n👉 Pari: *${rec.selection.toUpperCase()}*\n📊 Proba Modèle: ${(rec.probability * 100).toFixed(1)}%\n💰 Cote: ${rec.match.odds[rec.selection]}\n💡 _${rec.reason}_`
      }
    });
    blocks.push({ type: "divider" });
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ blocks }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      console.error(`Failed to send to Slack: ${response.statusText}`);
    }
  } catch (e) {
    console.error('Error sending to Slack:', e);
  }
}
