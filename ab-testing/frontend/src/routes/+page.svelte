<script lang="ts">
	import { ABTests } from '../../../abTest';
	import Table from '$lib/components/Table.svelte';
	import AudienceBreakdown from '$lib/components/AudienceBreakdown.svelte';

	const clientSideTests = ABTests.filter((test) => test.type === 'client');
	const serverSideTests = ABTests.filter((test) => test.type === 'server');
</script>

<h1 class="headline">A/B Tests</h1>
<section>
	<h2 class="sub-headline">Client-side Tests</h2>
	<AudienceBreakdown tests={clientSideTests} />
	<Table tests={clientSideTests} />
</section>
<section>
	<h2 class="sub-headline">Server-side Tests</h2>
	<AudienceBreakdown tests={serverSideTests} />
	<Table tests={serverSideTests} />
</section>

<style>
	.headline {
		font-family: 'GH Guardian Headline';
		font-size: 36px;
	}

	.sub-headline {
		font-family: 'GH Guardian Headline';
		font-size: 24px;
	}
</style>
