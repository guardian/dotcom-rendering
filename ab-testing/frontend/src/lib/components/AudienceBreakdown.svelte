<script lang="ts">
	import type { ABTest } from '../../../../types.ts';

	interface Props {
		tests: ABTest[];
	}

	const { tests }: Props = $props();

	function getOffset(test: ABTest) {
		return test.audienceOffset ?? 0;
	}

	function getSize(test: ABTest) {
		return test.audienceSize * 100;
	}

	function testSegmentEnd(test: ABTest) {
		return getOffset(test) + getOffset(test);
	}
</script>

<table class="table table-bordered">
	<thead>
		<tr
			><th>0%</th>
			<th>25%</th>
			<th>50%</th>
			<th>75%</th>
		</tr>
	</thead>
	<tbody class="audience-breakdown__tests">
		{#each tests as test}
			<tr class="audience-item">
				<td class="audience-item__container" colspan="4">
					&nbsp;
					<div
						class="audience-item__test"
						style={`width: ${getSize(test)}%; left: ${getOffset(
							test,
						)}%;`}
					>
						<div class="audience-item__test-label label label-info">
							{test.name}
						</div>
						<!-- <div class="audience-item__caption">
							<div class="audience-item__caption-test">
								{test.name}
							</div>
							<div class="audience-item__caption-range">
								{`${getOffset(test)}% to ${testSegmentEnd(test)}%`}
							</div>
						</div> -->
					</div>
				</td>
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
		margin-bottom: 24px;
	}

	thead {
		border: 1px solid #ddd;
	}

	.audience-item__container {
		position: relative;
		padding: 8px;
		line-height: 1.5;
		vertical-align: top;
	}

	.audience-item__test {
		position: absolute;
		top: 0;
		bottom: 0;
		margin: auto 0;
	}

	.audience-item__test-label {
		background-color: #5bc0de;
		border-radius: 4px;
		color: #fff;
		font-size: 75%;
		display: block;
		text-align: center;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		padding: 8px 3px;
	}
</style>
