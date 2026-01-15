<script lang="ts">
	import type { ABTest } from "@guardian/ab-testing-config";

	interface Props {
		testName: string;
		testGroups: ABTest["groups"];
	}

	const { testName, testGroups }: Props = $props();
</script>

<span>
	<a
		href={`https://dashboard.ophan.co.uk/graph/breakdown?day=today&by=platform&ab=${testName}`}
		target="_blank"
	>
		all
	</a>
	{#if testGroups.length > 0}
		{#each testGroups as group}
			&nbsp;|&nbsp;
			<a
				href={`https://dashboard.ophan.co.uk/graph/breakdown?day=today&by=platform&ab=${testName}:${group}`}
				target="_blank">{group}</a
			>
		{/each}
	{/if}
</span>

<style>
	span {
		white-space-collapse: collapse;
	}
</style>
