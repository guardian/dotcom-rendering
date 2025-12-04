<script lang="ts">
	interface Props {
		testName: string;
		testGroups: string[];
		size: number;
	}

	const { testName, testGroups, size }: Props = $props();

	const formatter = new Intl.NumberFormat('en-US', {
		style: 'percent',
		minimumFractionDigits: 0,
		maximumFractionDigits: 2,
	});
</script>

<div>
	<ul>
		{#each testGroups as group, i}
			<li>
				<a
					href={`https://www.theguardian.com/ab-tests/opt/in/${testName}:${group}`}
					target="_blank"
				>
					{group} ({formatter.format(
						((1 / testGroups.length) * size) / 100,
					)})
				</a>{#if i < testGroups.length - 1}&nbsp;|&nbsp;{/if}
			</li>
		{/each}
	</ul>
</div>

<style>
	ul {
		margin: 0;
		padding: 0;
		list-style: none;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
</style>
