import { getOptionsHeaders, type SignedIn } from '../../lib/identity';

export const syncConsentToMparticle = async (
	signedInAuthStatus: SignedIn,
	browserId: string,
	consented: boolean,
	pageViewId: string,
): Promise<void> => {
	const baseUrl = window.guardian.config.page.mparticleApiUrl;
	if (!baseUrl) throw new Error('mparticleApiUrl is not defined');

	const url = `${baseUrl}/consents/${encodeURIComponent(browserId)}`;
	const response = await fetch(url, {
		method: 'PATCH',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			...getOptionsHeaders(signedInAuthStatus).headers,
		},
		body: JSON.stringify({ consented, pageViewId }),
	});

	if (!response.ok) {
		throw new Error(
			`mParticle consent sync failed: ${response.statusText}`,
		);
	}
};
