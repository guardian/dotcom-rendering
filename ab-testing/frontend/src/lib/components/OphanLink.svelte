<script lang="ts">
	interface Props {
		testName: string;
	}

	const { testName }: Props = $props();
</script>

<a
	href={`https://dashboard.ophan.co.uk/graph/breakdown?day=today&ab=${testName}`}
	>graph</a
>
