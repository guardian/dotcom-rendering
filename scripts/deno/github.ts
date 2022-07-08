import { Octokit as Core } from 'https://cdn.skypack.dev/@octokit/core@4?dts';
import { restEndpointMethods } from 'https://cdn.skypack.dev/@octokit/plugin-rest-endpoint-methods@5?dts';

/** Github token for Authentication */
const token = Deno.env.get('GITHUB_TOKEN');
if (!token) throw new Error('Missing GITHUB_TOKEN');

const Octokit = Core.plugin(restEndpointMethods);

const dcr = { owner: 'guardian', repo: 'dotcom-rendering' } as const;

/** A hydrated Octokit */
const octokit = new Octokit({ auth: token });

export { dcr, octokit };
