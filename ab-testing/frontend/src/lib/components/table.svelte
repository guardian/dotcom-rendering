<script lang="ts">
	import type { ABTest } from '../../../../types';

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
		{#each tests as test}
			<tr>
				<th scope="row">{test.name}</th>
				<td>{test.status}</td>
				<td>
					{#each test.groups as group}
						<span>{group}{' '}</span>
					{/each}
				</td>
				<td>{daysToExpiry(test.expirationDate)} days</td>
				<td>{test.audienceSize * 100}%</td>
				<td>{test.audienceOffset ?? 0}</td>
				<td></td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table {
		text-align: left;
		table-layout: fixed;
		width: 100%;
  		border-collapse: collapse;
  		border: 1px solid #ddd;
	}

	th {
		min-width: 24px;
	}
</style>
