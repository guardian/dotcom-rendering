import { Octokit } from 'npm:octokit@4';

/** Github token for Authentication */
const token = Deno.env.get('GITHUB_TOKEN');
if (!token) console.warn('Missing GITHUB_TOKEN');

/**
 * A hydrated Octokit with types for the rest API.
 */
export const octokit = token ? new Octokit({ auth: token }) : undefined;
