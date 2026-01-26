<script lang="ts">
	import { allABTests, activeABtests } from "@guardian/ab-testing-config";
	import Table from "$lib/components/TableFixed.svelte";
	import AudienceBreakdown from "$lib/components/AudienceBreakdown.svelte";
	import { getHostname } from "$lib/stores/environment";

	let hostname = $derived(getHostname());
</script>

<h1 class="headline">A/B Tests (Beta)</h1>
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
			href="https://github.com/guardian/dotcom-rendering/blob/main/ab-testing/config/abTest.ts"
			>guardian/dotcom-rendering</a
		>
	</p>
	<p>
		Use the test group links in the table to opt in to those test groups,
		this will override any cookie based test assignment.
	</p>
	<p>
		<a href={`${hostname}/ab-tests/opt-out`}
			>Use this link to opt out of all tests you've opted into</a
		>
	</p>
</section>
<section>
	{#if activeABtests.length > 0}
		<AudienceBreakdown tests={activeABtests} />
	{/if}
	{#if allABTests.length > 0}
		<Table tests={allABTests} />
	{:else}
		<p>There are <b>ZERO</b> A/B tests currently configured!</p>
	{/if}
</section>

<style>
	.headline {
		font-family: "GH Guardian Headline";
		font-size: 36px;
	}

	.sub-headline {
		font-family: "GH Guardian Headline";
		font-size: 24px;
	}
</style>
