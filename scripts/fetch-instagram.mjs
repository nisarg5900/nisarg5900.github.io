import { writeFile, mkdir } from 'node:fs/promises';

const TOKEN = process.env.IG_ACCESS_TOKEN;
const IG_USER_ID = process.env.IG_USER_ID;
const GRAPH_VERSION = 'v22.0';
const POST_LIMIT = 6;

if (!TOKEN || !IG_USER_ID) {
  console.warn('Missing IG_ACCESS_TOKEN or IG_USER_ID — skipping Instagram fetch.');
  process.exit(0);
}

async function main() {
  const fields = 'id,caption,media_type,media_url,permalink,timestamp,thumbnail_url';
  const url = `https://graph.facebook.com/${GRAPH_VERSION}/${IG_USER_ID}/media?fields=${fields}&limit=${POST_LIMIT}&access_token=${TOKEN}`;

  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text();
    console.error(`Instagram Graph API request failed: ${res.status} ${body}`);
    process.exit(0);
  }

  const { data } = await res.json();

  const output = {
    fetchedAt: new Date().toISOString(),
    posts: (data || []).map((post) => ({
      id: post.id,
      caption: post.caption ?? '',
      mediaType: post.media_type,
      mediaUrl: post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url,
      permalink: post.permalink,
      timestamp: post.timestamp,
    })),
  };

  await mkdir('data', { recursive: true });
  await writeFile('data/instagram.json', JSON.stringify(output, null, 2));
  console.log(`Wrote data/instagram.json (${output.posts.length} posts)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(0);
});
