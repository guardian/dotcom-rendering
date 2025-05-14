<script lang="ts">
	import { ABTests } from '../../../abTest';
	import type { ABTest } from '../../../types';

	const clientSideTests = ABTests.filter((test) => test.type === 'client');
	const serverSideTests = ABTests.filter((test) => test.type === 'server');

	function daysToExpiry(expires: Date) {
		const today = new Date();
		const differenceInMilliseconds = expires.getTime() - today.getTime();
		const differenceInDays =
			differenceInMilliseconds / (1000 * 60 * 60 * 24);
		return Math.floor(differenceInDays);
	}

	function getAudience(test: ABTest) {
		return (
			test.groups.reduce<number>((accumulator, group) => {
				return accumulator + group.size;
			}, 0) * 100
		);
	}
</script>

<h1 class="headline">A/B Tests</h1>
<h2 class="sub-headline">Client-side Tests</h2>
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
		{#each clientSideTests as test}
			<tr>
				<th scope="row">{test.name}</th>
				<td>{test.status}</td>
				<td
					>{#each test.groups as group}
						<span>{group.id}{' '}</span>
					{/each}</td
				>
				<td>{daysToExpiry(test.expirationDate)} days</td>
				<td>{getAudience(test)}%</td>
				<td></td>
				<td></td>
			</tr>
		{/each}
	</tbody>
</table>

<style lang="css">
	.headline {
		font-family: 'GH Guardian Headline';
		font-size: 36px;
	}

	.sub-headline {
		font-family: 'GH Guardian Headline';
		font-size: 24px;
	}

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
