<script lang="ts">
	import type { ABTest } from '../../../../types.js';
	import OphanLink from '$lib/components/OphanLink.svelte';
	import TestVariants from '$lib/components/TestVariants.svelte';

	interface Props {
		tests: ABTest[];
	}

	const { tests }: Props = $props();

	function daysToExpiry(expires: string) {
		const today = new Date();
		const expiresDate = new Date(expires);
		const differenceInMilliseconds =
			expiresDate.getTime() - today.getTime();
		const differenceInDays =
			differenceInMilliseconds / (1000 * 60 * 60 * 24);
		return Math.floor(differenceInDays);
	}
</script>

<section class="tests">
	{#each tests as test}
		{@const expired = daysToExpiry(test.expirationDate) < 0}
		<table>
			<colgroup>
				<col span="1" style="width: 25%;" />
				<col span="1" style="width: 10%;" />
				<col span="1" style="width: 35%;" />
				<col span="1" style="width: 10%;" />
				<col span="1" style="width: 10%;" />
				<col span="1" style="width: 10%;" />
			</colgroup>
			<thead>
				<tr>
					<th scope="col">Name</th>
					<th scope="col">State</th>
					<th scope="col">Test Groups</th>
					<th scope="col">Expires In</th>
					<th scope="col">Audience</th>
					<th scope="col">Ophan</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th scope="row" class="test-name"
						>{test.name} ({test.type})</th
					>
					<td
						class="status"
						class:off={test.status === 'OFF'}
						class:expired
					>
						{#if expired}
							EXPIRED
						{:else}
							{test.status}
						{/if}
					</td>
					<td>
						<TestVariants
							testName={test.name}
							testGroups={test.groups}
						/>
					</td>
					<td class:expired
						>{daysToExpiry(test.expirationDate)} days</td
					>
					<td>{test.audienceSize * 100}%</td>
					<td><OphanLink testName={test.name} /></td>
				</tr>
				<tr>
					<th scope="row">Description</th>
					<td colspan="5">{test.description}</td>
				</tr>
			</tbody>
		</table>
	{/each}
</section>

<style>
	:root {
		--ok-green: #00823b;
		--error-red: #d5281b;
	}
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

	.status {
		text-transform: uppercase;
		font-weight: bold;

		color: var(--ok-green);

		&.off {
			color: #767676;
		}
	}

	.expired {
		color: var(--error-red);
		font-weight: bold;
	}
</style>
