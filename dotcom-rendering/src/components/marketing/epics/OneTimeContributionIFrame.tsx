import { isProd } from '../lib/stage';

interface OneTimeContributionsIFrameProps {
	countryCode: string;
	stage: string;
}

export function OneTimeContributionIFrame({
	countryCode,
	stage,
}: OneTimeContributionsIFrameProps): JSX.Element {
	const countryCodeParam = getCountryCode(countryCode);
	// Use the helper function to construct the iframe source URL
	const iframeSrc = getIframeUrl(isProd(stage), countryCodeParam);

	//Input from design required on how this will look on mobile/tablet devices
	return (
		<div style={{ height: '80vh' }}>
			<iframe
				src={iframeSrc}
				width="100%"
				height="100%"
				title="One-off contributions embed"
			/>
		</div>
	);
}

// Helper function to construct iframe URL
function getIframeUrl(stage: boolean, countryCode: string | undefined): string {
	const baseUrl = getBaseUrl(stage);
	return `${baseUrl}/${countryCode}/one-time-checkout-embed`;
}

// Helper function to determine the base URL based on the stage.
// This needs to be worked on as currently it always points to production!!
function getBaseUrl(stage: boolean): string {
	if (stage === 'PROD') {
		return 'https://support.theguardian.com';
	} else if (stage === 'CODE') {
		return 'https://support.code.dev-theguardian.com';
	}
	return 'https://support.thegulocal.com';
}

//Need to check if there is already an existing function that does this like it does on support frontend
function getCountryCode(countryCode: string): string | undefined {
	if (countryCode === 'GB') {
		return 'uk';
	}
	if (countryCode === 'US') {
		return 'us';
	} else {
		return 'int';
}
}
