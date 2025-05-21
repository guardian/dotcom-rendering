<script lang="ts">
	import { ABTests } from '../../../abTest';
	import Table from "$lib/components/table.svelte";

	const clientSideTests = ABTests.filter((test) => test.type === 'client');
	const serverSideTests = ABTests.filter((test) => test.type === 'server');
</script>

<main>
	<h1 class="headline">A/B Tests</h1>
	<h2 class="sub-headline">Client-side Tests</h2>
	<Table tests={clientSideTests} />
</main>

<style lang="css">
	.headline {
		font-family: 'GH Guardian Headline';
		font-size: 36px;
	}

	.sub-headline {
		font-family: 'GH Guardian Headline';
		font-size: 24px;
	}
</style>
