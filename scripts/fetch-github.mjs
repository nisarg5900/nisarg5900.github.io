import { writeFile, mkdir } from 'node:fs/promises';

const USERNAME = process.env.GITHUB_USERNAME;
const TOKEN = process.env.GITHUB_TOKEN;

if (!USERNAME || !TOKEN) {
  console.error('Missing GITHUB_USERNAME or GITHUB_TOKEN env vars.');
  process.exit(1);
}

const GRAPHQL_QUERY = /* GraphQL */ `
  query ($login: String!) {
    user(login: $login) {
      name
      bio
      avatarUrl
      followers { totalCount }
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              color
            }
          }
        }
      }
      repositories(
        first: 6
        ownerAffiliations: OWNER
        privacy: PUBLIC
        orderBy: { field: STARGAZERS, direction: DESC }
      ) {
        nodes {
          name
          description
          url
          stargazerCount
          forkCount
          primaryLanguage { name color }
        }
      }
    }
  }
`;

async function main() {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: GRAPHQL_QUERY, variables: { login: USERNAME } }),
  });

  if (!res.ok) {
    throw new Error(`GitHub GraphQL request failed: ${res.status} ${await res.text()}`);
  }

  const { data, errors } = await res.json();
  if (errors) {
    throw new Error(`GitHub GraphQL errors: ${JSON.stringify(errors)}`);
  }

  const output = {
    fetchedAt: new Date().toISOString(),
    profile: {
      name: data.user.name,
      bio: data.user.bio,
      avatarUrl: data.user.avatarUrl,
      followers: data.user.followers.totalCount,
    },
    contributions: data.user.contributionsCollection.contributionCalendar,
    topRepos: data.user.repositories.nodes,
  };

  await mkdir('data', { recursive: true });
  await writeFile('data/github.json', JSON.stringify(output, null, 2));
  console.log(`Wrote data/github.json (${output.contributions.totalContributions} contributions, ${output.topRepos.length} repos)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
