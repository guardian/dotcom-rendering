/* eslint-disable -- perf script */
const fs = require('node:fs');
const readline = require('node:readline');

const logFilePath = process.argv[2];
if (!logFilePath) {
	console.error('Usage: node gc-summary.js <trace-gc-log-file>');
	process.exit(1);
}

// Global stats
let totalGCCount = 0;
let totalPauseTime = 0;
let maxPauseTime = 0;

// Per-type stats
const gcStatsByType = {};

const lineReader = readline.createInterface({
	input: fs.createReadStream(logFilePath),
	crlfDelay: Infinity,
});

lineReader.on('line', (line) => {
	// Match GC type: e.g., "Scavenge", "Mark-Compact (reduce)", etc.
	const typeMatch = line.match(/:\s*(\w+(?:-\w+)?(?:\s*\(\w+\))?)/);
	const pauseMatch =
		line.match(/([0-9]+\.[0-9]+)\s*\/\s*[0-9.]+\s*ms/) ||
		line.match(/([0-9]+\.[0-9]+)\s*ms/);

	if (pauseMatch && typeMatch) {
		const pause = parseFloat(pauseMatch[1]);
		const type = typeMatch[1].trim();

		totalGCCount++;
		totalPauseTime += pause;
		if (pause > maxPauseTime) maxPauseTime = pause;

		if (!gcStatsByType[type]) {
			gcStatsByType[type] = {
				count: 0,
				totalPause: 0,
				maxPause: 0,
			};
		}

		gcStatsByType[type].count++;
		gcStatsByType[type].totalPause += pause;
		if (pause > gcStatsByType[type].maxPause) {
			gcStatsByType[type].maxPause = pause;
		}
	}
});

lineReader.on('close', () => {
	console.log(`🧹 Total GC Events: ${totalGCCount}`);
	console.log(`⏱️ Total GC Pause Time: ${totalPauseTime.toFixed(2)} ms`);
	console.log(
		`📊 Average GC Pause: ${(totalGCCount
			? totalPauseTime / totalGCCount
			: 0
		).toFixed(2)} ms`,
	);
	console.log(`🚨 Longest GC Pause: ${maxPauseTime.toFixed(2)} ms`);
	console.log('\n📚 GC Breakdown by Type:\n');

	for (const [type, stats] of Object.entries(gcStatsByType)) {
		const avg = stats.totalPause / stats.count;
		console.log(`👉 ${type}`);
		console.log(`   - Count: ${stats.count}`);
		console.log(`   - Total Pause: ${stats.totalPause.toFixed(2)} ms`);
		console.log(`   - Average Pause: ${avg.toFixed(2)} ms`);
		console.log(`   - Max Pause: ${stats.maxPause.toFixed(2)} ms\n`);
	}
});
