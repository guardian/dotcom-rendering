import { type AuthStatus, getOptionsHeaders } from '../../lib/identity';

export const syncConsentToMparticle = async (
	authStatus: AuthStatus,
	browserId: string,
	consented: boolean,
	pageViewId: string,
): Promise<void> => {
	const baseUrl = window.guardian.config.page.mparticleApiUrl;
	if (!baseUrl) throw new Error('mparticleApiUrl is not defined');

	const url = `${baseUrl}/consents/${encodeURIComponent(browserId)}`;

	// Attach Bearer token when available; anonymous calls are permitted without auth
	const authHeaders =
		authStatus.kind === 'SignedIn'
			? getOptionsHeaders(authStatus).headers
			: {};

	const response = await fetch(url, {
		method: 'PATCH',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			...authHeaders,
		},
		body: JSON.stringify({ consented, pageViewId }),
	});

	if (!response.ok) {
		throw new Error(
			`mParticle consent sync failed: ${response.statusText}`,
		);
	}
};
