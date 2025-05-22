<script lang="ts">
	import type { ABTest } from '../../../../types.ts';
	import OphanLink from '$lib/components/OphanLink.svelte';
	import TestVariants from '$lib/components/TestVariants.svelte';

	interface Props {
		tests: ABTest[];
	}

	const { tests }: Props = $props();

	function daysToExpiry(expires: Date) {
		const today = new Date();
		const differenceInMilliseconds = expires.getTime() - today.getTime();
		const differenceInDays =
			differenceInMilliseconds / (1000 * 60 * 60 * 24);
		return Math.floor(differenceInDays);
	}
</script>

<section class="tests">
	{#each tests as test}
		<table>
			<thead>
				<tr>
					<th scope="col">Name</th>
					<th scope="col">State</th>
					<th scope="col">Variants</th>
					<th scope="col">Expires In</th>
					<th scope="col">Audience</th>
					<th scope="col">Offset</th>
					<th scope="col">Ophan</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th scope="row" class="test-name">{test.name}</th>
					<td>{test.status}</td>
					<td>
						<TestVariants
							testName={test.name}
							testGroups={test.groups}
						/>
					</td>
					<td>{daysToExpiry(test.expirationDate)} days</td>
					<td>{test.audienceSize * 100}%</td>
					<td>{test.audienceOffset ?? 0}</td>
					<td><OphanLink testName={test.name} /></td>
				</tr>
				<tr>
					<th scope="row">Description</th>
					<td colspan="6">{test.description}</td>
				</tr>
			</tbody>
		</table>
	{/each}
</section>

<style>
	.tests {
		border: 1px solid var(--border-grey);
		padding: 8px;
	}

	table {
		text-align: left;
		table-layout: fixed;
		width: 100%;
		border-collapse: collapse;
		border: 1px solid var(--border-grey);
		margin-bottom: 24px;
	}

	th,
	td {
		min-width: 24px;
		border: 1px solid var(--border-grey);
		padding: 8px;
	}

	th[scope='col'] {
		background-color: var(--light-grey);
	}

	td,
	.test-name {
		font-weight: 100;
	}
</style>
