<script lang="ts">
	import { hostname } from "$lib/stores/environment";

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
</script>

<div>
	<table>
		<tbody>
			{#each testGroups as group, i}
				<tr>
					<td>
						{group} ({formatter.format(
							((1 / testGroups.length) * size) / 100,
						)})
					</td>
					<td>
						<a
							href={`${$hostname}/ab-tests/opt-in/${testName}:${group}`}
							target="_blank"
						>
							opt in
						</a>
					</td>
					<td>
						<a
							href={`${$hostname}/ab-tests/opt-out/${testName}:${group}`}
							target="_blank"
						>
							opt out
						</a>
					</td>
				</tr>
			{/each}
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
