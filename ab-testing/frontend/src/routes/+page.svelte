<script lang="ts">
	import { allABTests, activeABtests } from '../../../abTest';
	import Table from '$lib/components/TableFixed.svelte';
	import AudienceBreakdown from '$lib/components/AudienceBreakdown.svelte';
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
	<p>
		Use the test group links in the table to opt in to those test groups,
		this will override any cookie based test assignment, and you will only
		be in that test until you opt out.
	</p>
	<p>
		<a href="https://www.theguardian.com/ab-tests/opt/out"
			>Use this link to opt out of any tests</a
		>
	</p>
</section>
<section>
	<AudienceBreakdown tests={activeABtests} />
	<Table tests={allABTests} />
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
