import type { PermutivePayload } from '../lib/permutive.amp';

export interface PermutiveModel {
	apiKey: string;
	projectId: string;
	payload: PermutivePayload;
}

/**
 * Responsible for ensuring the necessary scripts are placed on articles in order to run the Permutive SDK
 */
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
				data-block-on-consent="_till_responded"
				id="permutiveConfig"
				dangerouslySetInnerHTML={{ __html: permutiveConfig }}
			/>
			<amp-analytics
				data-block-on-consent="_till_responded"
				type="permutive-ampscript"
				dangerouslySetInnerHTML={{ __html: permutiveAmpScript }}
			/>
			<amp-script
				data-block-on-consent="_till_responded"
				id="permutiveCachedTargeting"
				// Empty string required to pass AMP validation
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
			<amp-script
				data-block-on-consent="_till_responded"
				// Empty string required to pass AMP validation
				sandboxed=""
				script="pamp-json"
			></amp-script>
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
				data-block-on-consent="_till_responded"
				id="permutiveSdk"
				// Empty string required to pass AMP validation
				sandboxed=""
				src={`https://cdn.permutive.app/ampsdk/${projectId}-ampscript.js`}
			></amp-script>
		</>
	);
};
