import { Octokit } from "https://cdn.skypack.dev/octokit";
import type { RestEndpointMethodTypes } from "https://cdn.skypack.dev/@octokit/plugin-rest-endpoint-methods?dts";

/** Github token for Authentication */
const token = Deno.env.get("GITHUB_TOKEN");
if (!token) throw new Error("Missing GITHUB_TOKEN");

type OctokitWithRest = {
	rest: {
		issues: {
			[Method in keyof RestEndpointMethodTypes["issues"]]: (
				arg: RestEndpointMethodTypes["issues"][Method]["parameters"]
			) => Promise<RestEndpointMethodTypes["issues"][Method]["response"]>;
		};
	};
};

/**
 * A hydrated Octokit with types for the rest API.
 */
// @ts-expect-error -- Octokit’s own types are not as good as ours
export const octokit = new Octokit({ auth: token }) as OctokitWithRest;
