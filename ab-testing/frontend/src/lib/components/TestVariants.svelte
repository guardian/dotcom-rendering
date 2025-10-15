<script lang="ts">
	interface Props {
		testName: string;
		testGroups: string[];
	}

	const { testName, testGroups }: Props = $props();
</script>

<div>
	<ul>
		{#each testGroups as group}
			<li>
				<a
					href={`https://www.theguardian.com/ab-tests/opt/in/${testName}:${group}`}
				>
					{group}
				</a>
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
		justify-content: space-between;
		flex-wrap: wrap;
	}
</style>
