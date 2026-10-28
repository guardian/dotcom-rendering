import { shouldCollectMetricsForTests } from './Metrics.island';

describe('forced test metrics collection', () => {
	it('continues to collect metrics for the Auxia experiment Variant', () => {
		expect(shouldCollectMetricsForTests(['growth-auxia-banner'])).toBe(
			true,
		);
	});
});
