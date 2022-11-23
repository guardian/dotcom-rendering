// import { octokit } from '../deno/github.ts';
// import type { EventPayloadMap } from 'https://cdn.skypack.dev/@octokit/webhooks-types?dts';

type Metric = {
	key: string;
	value: string;
};

type MetricsLogFile = Metric[];

// const isPullRequestEvent = (
// 	payload: EventPayloadMap[keyof EventPayloadMap],
// ): payload is EventPayloadMap['pull_request'] =>
// 	//@ts-expect-error -- We’re actually checking the type
// 	typeof payload?.pull_request?.number === 'number';

// const getCommentID = async (): Promise<number | null> => {
// 	/**
// 	 * https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads
// 	 */
// 	const payload: EventPayloadMap['push' | 'pull_request'] = JSON.parse(
// 		Deno.readTextFileSync(path),
// 	);

// 	const issue_number = isPullRequestEvent(payload)
// 		? payload.pull_request.number
// 		: undefined;

// 	if (!issue_number) {
// 		throw Error('Not a pull request event');
// 	}

// 	const GIHUB_PARAMS = {
// 		owner: 'guardian',
// 		repo: 'dotcom-rendering',
// 		issue_number,
// 	} as const;

// 	if (!octokit) return null;
// 	const { data: comments } = await octokit.rest.issues.listComments({
// 		...GIHUB_PARAMS,
// 	});

// 	const comment = comments.find((comment) =>
// 		comment.body?.includes(REPORT_TITLE),
// 	);

// 	return comment?.id ?? null;
// };

const loadMetrics = async (filename: string): Promise<MetricsLogFile> => {
	const decoder = new TextDecoder('utf-8');
	const data = await Deno.readFile(filename);
	return JSON.parse(decoder.decode(data)) as MetricsLogFile;
};

const main = async () => {
	/** Path for workflow event */
	const path = Deno.env.get('GITHUB_EVENT_PATH');
	if (!path) throw new Error('Missing GITHUB_EVENT_PATH');

	// Obtain the metrics
	const metrics = await loadMetrics('metrics.log');

	// TODO send the metrics to the remote server for aggregation!

	// Present the metrics!
	console.log(metrics);
};

await main();
