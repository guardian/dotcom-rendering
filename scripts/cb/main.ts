type Metric = {
	key: string;
	value: string;
};

type MetricsLogFile = {};

const loadMetrics = async (filename: string): Promise<MetricsLogFile> => {
	const decoder = new TextDecoder('utf-8');
	const data = await Deno.readFile(filename);
	return JSON.parse(decoder.decode(data)) as MetricsLogFile;
};

const metrics = await loadMetrics('metrics.log');

console.log(metrics);
