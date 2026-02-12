<script lang="ts">
	interface Props {
		testName: string;
	}

	const { testName }: Props = $props();
</script>

<a
	href={`https://metrics.gutools.co.uk/d/bfd4abner943ke/page-views?folderUid=efd48ip6ch3i8f&orgId=1&from=now-7d&to=now&var-test_name=${testName}`}
	target="_blank"
>
	Grafana
</a>
