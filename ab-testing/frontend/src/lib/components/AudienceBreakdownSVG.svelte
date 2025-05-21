<script lang="ts">
	import type { ABTest } from '../../../../types.ts';

	interface Props {
		tests: ABTest[];
	}

	const { tests }: Props = $props();

	const BAR_HEIGHT = 40;

	function getOffset(test: ABTest) {
		return test.audienceOffset ?? 0;
	}

	function getSize(test: ABTest) {
		return test.audienceSize * 100;
	}

	function testSegmentEnd(test: ABTest) {
		return getOffset(test) + getOffset(test);
	}

	function textOffset(index: number) {
		const barStart = index * BAR_HEIGHT;
		return barStart + BAR_HEIGHT / 2 + BAR_HEIGHT;
	}
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink"
	width="100%"
	height={tests.length * 50 + 50}
	class="chart"
>
	<g class="legend">
		<text x="0%" y={BAR_HEIGHT - 9}>0%</text>
		<text x="25%" y={BAR_HEIGHT - 9}>25%</text>
		<text x="50%" y={BAR_HEIGHT - 9}>50%</text>
		<text x="75%" y={BAR_HEIGHT - 9}>75%</text>
	</g>
	{#each tests as test, index}
		<svg
			x={`${getOffset(test)}%`}
			width={`${getSize(test)}%`}
			y={index * BAR_HEIGHT + BAR_HEIGHT}
		>
			<g class="bar">
				<rect
					height={`${BAR_HEIGHT}px`}
					width="100%"
					rx="4"
				/>
				<text
					x="50%"
					y="12%"
					>{test.name}</text
				>
			</g>
		</svg>
	{/each}
</svg>

<style>
	.chart {
		background-color: #f5f5f5;
		padding: 0 12px;
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
		transition: fill .3s ease;
		cursor: pointer;
	}

	.bar:hover,
	.bar:focus {
	fill: #02124B;
	}

	.bar text {
		fill: #fff;
		color: #fff;
		font-size: 12px;
		dominant-baseline: central;
		text-anchor:middle;
	}
</style>
