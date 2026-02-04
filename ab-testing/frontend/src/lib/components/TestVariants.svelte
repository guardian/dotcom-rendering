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

	let isRounded = Math.floor((size / testGroups.length) * 10) % 10 !== 0;
</script>

<div>
	{#each testGroups as group, i}
		<a
			class="link"
			href={`${frontendAdminUrl}/ab-tests/opt-in/${testName}:${group}`}
			target="_blank"
		>
			{group} ({formatter.format(
				Math.floor((size / testGroups.length) * 10) / 1000,
			)}{isRounded ? "*" : ""})
		</a>
	{/each}
	<a
		href={`${frontendAdminUrl}/ab-tests/opt-out/${testName}`}
		target="_blank"
	>
		opt out
	</a>
	{#if isRounded}
		<div class="note">
			* Rounded down to nearest 0.1% from ~{formatter.format(
				Math.floor((size / testGroups.length) * 1000) / 100000,
			)}
		</div>
	{/if}
</div>

<style>
	.link {
		margin: 0 4px;
	}

	.note {
		font-size: 0.8em;
		color: var(--color-text-secondary);
		margin-top: 4px;
	}
</style>
