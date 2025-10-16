<script lang="ts">
	import type { ABTest } from '../../../../types.js';

	interface Props {
		tests: ABTest[];
	}

	type ABTestBarData = {
		x: number;
		y: number;
		width: number;
		name: string;
		segments: string;
	};

	const { tests }: Props = $props();

	const BAR_HEIGHT = 40;

	const BAR_MARGIN_X = 0.1;
	const BAR_MARGIN_Y = 2;

	const testSpaces = ['A', 'B', 'C'];

	const chartHeight = testSpaces.length * BAR_HEIGHT + BAR_HEIGHT + 16;

	const testsBySpace = testSpaces.map((space) => {
		if (space === 'A') {
			return tests.filter(
				(test) => test.audienceSpace === space || !test.audienceSpace,
			);
		} else {
			return tests.filter((test) => test.audienceSpace === space);
		}
	});

	function getBars(testList: ABTest[], rowPosition: number) {
		return testList.reduce<Array<ABTestBarData>>((barsList, test) => {
			const previousBarsWidth = barsList.reduce(
				(acc, bar) => acc + bar.width,
				0,
			);
			const offset: number = Number(previousBarsWidth);
			const rowYLevel = rowPosition;
			const testSize = getSize(test);

			return [
				...barsList,
				{
					x: offset,
					y: rowYLevel * BAR_HEIGHT + BAR_HEIGHT,
					width: testSize,
					name: test.name,
					segments: `${offset}% to ${offset + testSize}%`,
				},
			];
		}, []);
	}

	function getAllRows(testsBySpace: ABTest[][]) {
		return testsBySpace.reduce<Array<ABTestBarData>>(
			(barsList, testsInSpace, i) => {
				return [...barsList, ...getBars(testsInSpace, i)];
			},
			[],
		);
	}

	function getSize(test: ABTest) {
		return test.audienceSize * 100;
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
	{#each getAllRows(testsBySpace) as bar}
		<svg
			x={`${bar.x + BAR_MARGIN_X}%`}
			y={bar.y}
			width={`${bar.width - BAR_MARGIN_X * 2}%`}
			height={BAR_HEIGHT}
		>
			<g class="bar">
				<rect height={BAR_HEIGHT - BAR_MARGIN_Y} width="100%" rx="4" />
				<text class="name" x="50%" y="50%">{bar.name}</text>
				<text class="segments" x="50%" y="50%">{bar.segments}</text>
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
