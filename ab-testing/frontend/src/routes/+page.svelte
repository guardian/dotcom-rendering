<script lang="ts">
	import { ABTests } from '../../../abTest';
	import Table from '$lib/components/Table.svelte';
	import AudienceBreakdownSvg from '$lib/components/AudienceBreakdownSVG.svelte';

	const clientSideTests = ABTests.filter((test) => test.type === 'client');
	const serverSideTests = ABTests.filter((test) => test.type === 'server');
</script>

<main class="main">
	<h1 class="headline">A/B Tests</h1>
	<section>
		<h2 class="sub-headline">Client-side Tests</h2>
		<AudienceBreakdownSvg tests={clientSideTests} />
		<Table tests={clientSideTests} />
	</section>
	<section>
		<h2 class="sub-headline">Server-side Tests</h2>
		<AudienceBreakdownSvg tests={serverSideTests} />
		<Table tests={serverSideTests} />
	</section>
</main>

<style lang="css">
	.main {
		max-width: 88rem;
		padding: 20px;
		margin: 0 auto;
	}
	.headline {
		font-family: 'GH Guardian Headline';
		font-size: 36px;
	}

	.sub-headline {
		font-family: 'GH Guardian Headline';
		font-size: 24px;
	}
</style>
