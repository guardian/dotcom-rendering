<script lang="ts">
	import { getOrigin } from "$lib/stores/environment";

	interface Props {
		testName: string;
		testGroups: string[];
		size: number;
	}

	const { testName, testGroups, size }: Props = $props();

	const formatter = new Intl.NumberFormat("en-US", {
		style: "percent",
		minimumFractionDigits: 0,
		maximumFractionDigits: 2,
	});

	let frontendAdminUrl = $derived(getOrigin());
</script>

<div>
	{#each testGroups as group, i}
		<a
			class="link"
			href={`${frontendAdminUrl}/ab-tests/opt-in/${testName}:${group}`}
			target="_blank"
		>
			{group} ({formatter.format(((1 / testGroups.length) * size) / 100)})
		</a>
	{/each}
	<a
		href={`${frontendAdminUrl}/ab-tests/opt-out/${testName}`}
		target="_blank"
	>
		opt out
	</a>
</div>

<style>
	.link {
		margin: 0 4px;
	}
</style>
