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
	<table>
		<tbody>
			{#each testGroups as group, i}
				<tr>
					<td>
						{group} ({formatter.format(
							Math.floor((size / testGroups.length) * 10) / 1000,
						)}{isRounded ? "*" : ""})
					</td>
					<td>
						<a
							href={`${frontendAdminUrl}/ab-tests/opt-in/${testName}:${group}`}
							target="_blank"
						>
							opt in
						</a>
					</td>
					<td>
						<a
							href={`${frontendAdminUrl}/ab-tests/opt-out/${testName}:${group}`}
							target="_blank"
						>
							opt out
						</a>
					</td>
				</tr>
			{/each}
			{#if isRounded}
				<tr>
					<td colspan="3">
						<em>
							* Rounded down to nearest 0.1% from ~{formatter.format(
								Math.floor((size / testGroups.length) * 1000) /
									100000,
							)}
						</em>
					</td>
				</tr>
			{/if}
		</tbody>
	</table>
</div>

<style>
	table {
		border-collapse: collapse;
	}

	td {
		padding: 0.1rem 0.5rem;
		border: 1px solid var(--color-border);
	}
</style>
