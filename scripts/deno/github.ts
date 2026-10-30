import { Octokit } from 'octokit';

/** Github token for Authentication */
const token = process.env.GITHUB_TOKEN;
if (!token) console.warn('Missing GITHUB_TOKEN');

/**
 * A hydrated Octokit with types for the rest API.
 */
export const octokit = token ? new Octokit({ auth: token }) : undefined;
