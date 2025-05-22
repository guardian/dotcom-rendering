<script lang="ts">
	import type { ABTest } from '../../../../types.ts';

	interface Props {
		tests: ABTest[];
	}

	const { tests }: Props = $props();

	const BAR_HEIGHT = 40;

	const CHART_HEIGHT = tests.length * BAR_HEIGHT + BAR_HEIGHT;

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
	height={CHART_HEIGHT}
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
				<rect height={`${BAR_HEIGHT}px`} width="100%" rx="4" />
				<text class="name" x="50%" y="50%">{test.name}</text>
				<text class="segments" x="50%" y="50%">{getOffset(test)}% to {testSegmentEnd(test)}%</text>
			</g>
		</svg>
	{/each}
</svg>

<style>
	.chart {
		background-color: #f5f5f5;
		padding: 12px;
		margin-bottom: 24px;
		box-sizing: border-box;
	}

	.legend {
		fill: #000;
		height: 40px;
	}

	.legend text {
		fill: #000;
		color: #000;
		font-size: 18px;
	}

	.bar {
		fill: #5bc0de;
		transition: fill 0.3s ease;
		cursor: pointer;
	}

	.bar:hover,
	.bar:focus {
		fill: #02124b;
	}

	.bar text {
		fill: #fff;
		color: #fff;
		font-size: 12px;
		dominant-baseline: central;
		text-anchor: middle;
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
