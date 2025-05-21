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
		return barStart + (BAR_HEIGHT / 2) + BAR_HEIGHT;
	}
</script>

<svg
	class="chart"
	width="100%"
	height={tests.length * 50 + 50}
	aria-labelledby="title"
	role="img"
>
	<title id="title">A/B test audience share</title>
	<g class="legend">
		<text x="0%" y={BAR_HEIGHT - 9}>0%</text>
		<text x="25%" y={BAR_HEIGHT - 9}>25%</text>
		<text x="50%" y={BAR_HEIGHT - 9}>50%</text>
		<text x="75%" y={BAR_HEIGHT - 9}>75%</text>
	</g>
	{#each tests as test, index}
		<g class="bar" width={`${getSize(test)}%`} y={(index * BAR_HEIGHT) + BAR_HEIGHT}>
			<rect
				width={`${getSize(test)}%`}
				height={BAR_HEIGHT}
				x={`${getOffset(test)}%`}
				y={(index * BAR_HEIGHT) + BAR_HEIGHT}
				rx="2"
			></rect>
			<text dominant-baseline="center" y={textOffset(index)} x={`${getOffset(test)}%`}>
				{test.name}
			</text>
		</g>
	{/each}
</svg>

<style>
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
		fill: #5bc0de; /* changes the background */
		height: 40px;
		transition: fill 0.3s ease;
		cursor: pointer;
	}

	.bar text {
		fill: #fff;
		color: #fff;
		font-size: 12px;
	}
</style>
