<script lang="ts">
	import type { ABTest } from '../../../../types.js';

	interface Props {
		tests: ABTest[];
	}

	const { tests }: Props = $props();

	const BAR_HEIGHT = 40;

	// Account for legend bar and vertical padding in chart height
	const chartHeight = tests.length * BAR_HEIGHT + BAR_HEIGHT + 16;

	function getOffset(test: ABTest) {
		return test.audienceOffset ?? 0;
	}

	function getSize(test: ABTest) {
		return test.audienceSize * 100;
	}

	function testSegmentEnd(test: ABTest) {
		return getOffset(test) + getSize(test);
	}
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink"
	width="100%"
	height={chartHeight}
	class="chart"
>
	<svg x="0" y="0" height={BAR_HEIGHT}>
		<g class="legend" y="50%">
			<text x="0%" y="50%">0%</text>
			<text x="25%" y="50%">25%</text>
			<text x="50%" y="50%">50%</text>
			<text x="75%" y="50%">75%</text>
		</g>
	</svg>
	{#each tests as test, index}
		<svg
			x={`${getOffset(test)}%`}
			y={index * BAR_HEIGHT + BAR_HEIGHT}
			width={`${getSize(test)}%`}
			height={BAR_HEIGHT}
		>
			<g class="bar">
				<rect height={BAR_HEIGHT} width="100%" rx="4" />
				<text class="name" x="50%" y="50%">{test.name}</text>
				<text class="segments" x="50%" y="50%">{getOffset(test)}% to {testSegmentEnd(test)}%</text>
			</g>
		</svg>
	{/each}
</svg>

<style>
	.chart {
		background-color: var(--light-grey);
		padding: 8px;
		margin-bottom: 24px;
		box-sizing: border-box;
	}

	.legend {
		fill: var(--black);
		height: 40px;
	}

	.legend text {
		fill: var(--black);
		font-size: 18px;
	}

	.bar {
		fill: var(--light-blue);
		transition: fill 0.3s ease;
		cursor: pointer;
	}

	.bar:hover,
	.bar:focus {
		fill: var(--dark-blue);
	}

	.bar text {
		fill: var(--white);
		font-size: 12px;
		dominant-baseline: central;
		text-anchor: middle;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.segments {
		display: none;
	}
	.bar:hover .name {
		display: none;
	}

	.bar:hover .segments {
		display: block;
	}
</style>
