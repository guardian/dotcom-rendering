<script lang="ts">
	import { ABTests } from '../../../abTest';
	import Table from '$lib/components/TableFixed.svelte';
	import AudienceBreakdown from '$lib/components/AudienceBreakdown.svelte';

	const clientSideTests = ABTests.filter((test) => test.type === 'client');
	const serverSideTests = ABTests.filter((test) => test.type === 'server');
</script>

<h1 class="headline">A/B Tests</h1>
<section>
	<p>
		This page provides an overview of currently running A/B tests on
		theguardian.com. Please note that the audience segment allocations
		displayed for non-overlapping tests may not correspond to the actual
		allocation of MVT IDs, but simply represents how much of the audience is
		included in each test.
	</p>
	<p>
		AB tests are defined in <a
			href="https://github.com/guardian/dotcom-rendering/blob/main/ab-testing/abTest.ts"
			>guardian/dotcom-rendering</a
		>
	</p>
</section>
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
