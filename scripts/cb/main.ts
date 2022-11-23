import { octokit } from '../deno/github.ts';
import type { EventPayloadMap } from 'https://cdn.skypack.dev/@octokit/webhooks-types?dts';

type Metric = {
	key: string;
	name: string;
	max: number;
	value: number;
};

type MetricsLogFile = Metric[];

const sendMetrics = async (metrics: MetricsLogFile) => {
	try {
		// Reverse-proxy to local instance
		const metricsUrl = 'https://03f4-77-91-250-234.eu.ngrok.io/api/metrics';
		const res = await fetch(metricsUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(metrics),
		});

		if (res.ok) {
			console.log('Successfully posted metrics to server');
		}
	} catch (err) {
		console.log('Error sending metrics', err);
	}
};

const getCommentID = async (
	GIHUB_PARAMS: Record<string, unknown>,
): Promise<number | null> => {
	if (!octokit) return null;
	const { data: comments } = await octokit.rest.issues.listComments({
		...GIHUB_PARAMS,
	});

	const comment = comments.find((comment) => comment.body?.includes('Bench'));

	return comment?.id ?? null;
};

const isPullRequestEvent = (
	payload: EventPayloadMap[keyof EventPayloadMap],
): payload is EventPayloadMap['pull_request'] =>
	typeof payload?.pull_request?.number === 'number';

const loadMetrics = async (filename: string): Promise<MetricsLogFile> => {
	const decoder = new TextDecoder('utf-8');
	const data = await Deno.readFile(filename);
	return JSON.parse(decoder.decode(data)) as MetricsLogFile;
};

const postGithubComment = async (
	GITHUB_PARAMS: Record<string, unknown>,
	body: unknown,
) => {
	const comment_id = await getCommentID(GITHUB_PARAMS);

	comment_id
		? await octokit.rest.issues.updateComment({
				...GITHUB_PARAMS,
				comment_id,
				body,
		  })
		: await octokit.rest.issues.createComment({
				...GITHUB_PARAMS,
				body,
		  });
};

const buildMetricsComment = (metrics: MetricsLogFile) => {
	const tableHeader = [
		'| Name | Value | Max | Pass |',
		'| --- | --- | --- | --- |',
	];

	const table: string[] = metrics.map(({ key, name, max, value }) => {
		return (
			'| ' +
			name +
			' | ' +
			value +
			' | ' +
			max +
			' | ' +
			(value <= max ? '✅' : '❌')
		);
	});

	return [
		`## Benchmarking results are in!`,
		`**Retrieved ${metrics.length} performance metrics**`,
		...tableHeader,
		...table,
	].join('\n');
};

const main = async () => {
	// Obtain the metrics
	let allMetrics: MetricsLogFile = [];
	for await (const dirEntry of Deno.readDir('./dotcom-rendering/metrics')) {
		console.log('Found metrics: ', JSON.stringify(dirEntry));
		if (dirEntry.isFile) {
			const metrics = await loadMetrics(
				`./dotcom-rendering/metrics/${dirEntry.name}`,
			);
			allMetrics = allMetrics.concat(metrics);
		}
	}

	console.log('All metrics', JSON.stringify(allMetrics));

	const metricsComment = buildMetricsComment(allMetrics);

	// Only run this in Github this way...
	const path = Deno.env.get('GITHUB_EVENT_PATH');
	if (path) {
		/**
		 * https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads
		 */
		const payload: EventPayloadMap['push' | 'pull_request'] = JSON.parse(
			Deno.readTextFileSync(path),
		);

		const issue_number = isPullRequestEvent(payload)
			? payload.pull_request.number
			: undefined;

		if (!issue_number) {
			return;
		}

		const GITHUB_PARAMS = {
			owner: 'guardian',
			repo: 'dotcom-rendering',
			issue_number,
		};

		// Post the comment
		await postGithubComment(GITHUB_PARAMS, metricsComment);
	}

	// TODO send the metrics to the remote server for aggregation!
	console.log('About to send metrics', JSON.stringify(allMetrics));
	await sendMetrics(allMetrics);

	// Make sure we exit gracefully
	Deno.exit();
};

await main();
