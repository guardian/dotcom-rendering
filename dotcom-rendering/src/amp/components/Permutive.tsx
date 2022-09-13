import type { PermutivePayload } from '../lib/permutive';

export interface PermutiveModel {
	apiKey: string;
	projectId: string;
	payload: PermutivePayload;
}

export const Permutive = ({ apiKey, projectId, payload }: PermutiveModel) => {
	const permutiveConfig = `
		<script type="application/json">
			{
				"apiKey": "${apiKey}",
				"projectId": "${projectId}",
				"environment": "production"
			}
		</script>`;

	const permutiveAmpScript = `
		<script type="application/json">
			{
				"extraUrlParams": ${JSON.stringify(payload)}
			}
		</script>`;

	const permutiveCachedTargetingScript = `
		exportFunction('ct', () => {let c = JSON.parse(localStorage.getItem('_pdfps'));let i = localStorage.getItem('permutive-id');return {targeting:{permutive: c ? c : [], puid: i}, ppid: i};})
	`;

	const pampScript = `
		fetch('https://cdn.permutive.app/queries/${projectId}-amp.json').then(r => r.json()).then(d => AMP.setState({permutiveConfig: {ampJson: d}}));
	`;

	return (
		<>
			<amp-state
				id="permutiveConfig"
				dangerouslySetInnerHTML={{ __html: permutiveConfig }}
			/>
			<amp-analytics
				type="permutive-ampscript"
				dangerouslySetInnerHTML={{ __html: permutiveAmpScript }}
			/>
			<amp-script
				id="permutiveCachedTargeting"
				sandboxed=""
				script="permutiveCachedTargetingScript"
			></amp-script>
			<script
				id="permutiveCachedTargetingScript"
				type="text/plain"
				// @ts-expect-error -- Do as Permutive instructs
				target="amp-script"
				dangerouslySetInnerHTML={{
					__html: permutiveCachedTargetingScript,
				}}
			></script>
			<amp-script sandboxed="" script="pamp-json"></amp-script>
			<script
				id="pamp-json"
				type="text/plain"
				// @ts-expect-error -- Do as Permutive instructs
				target="amp-script"
				dangerouslySetInnerHTML={{
					__html: pampScript,
				}}
			></script>
			<amp-script
				data-block-on-consent={true}
				id="permutiveSdk"
				sandboxed=""
				src={`https://cdn.permutive.app/ampsdk/${projectId}-ampscript.js`}
			></amp-script>
		</>
	);
};
