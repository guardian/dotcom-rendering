import { performance } from 'node:perf_hooks';
import { safeParse } from 'valibot'; // adjust path
import { FEArticleSchema } from '../frontend/feArticle';
import { validateArticle } from '../model/validate';
import articleJson from './article.json' assert { type: 'json' };

// ---- Benchmark Helper ----
function runBenchmark(label: string, fn: () => void, iterations = 100000) {
	// warmup
	for (let i = 0; i < 1000; i++) fn();

	const start = performance.now();
	for (let i = 0; i < iterations; i++) fn();
	const end = performance.now();

	const avgMs = (end - start) / iterations;
	console.log(`${label.padEnd(10)}: ${avgMs.toFixed(4)} ms per validation`);
}

// ---- Execute ----
console.log('\nRunning validation benchmarks...\n');
runBenchmark('AJV', () => validateArticle(articleJson));
runBenchmark('Valibot', () => safeParse(FEArticleSchema, articleJson));
