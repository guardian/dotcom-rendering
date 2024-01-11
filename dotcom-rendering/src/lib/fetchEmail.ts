import type { IdApiUserData } from './getIdapiUserData';
import { getIdApiUserData } from './getIdapiUserData';
import { eitherInOktaTestOrElse } from './identity';

const getEmail = async (ajaxUrl: string): Promise<string | undefined> =>
	// TODO Okta: Remove either when at 100% in oktaVariant test, and just use idToken
	eitherInOktaTestOrElse(
		(authState) => authState.idToken?.claims.email,
		() =>
			getIdApiUserData(ajaxUrl)
				.then((data: IdApiUserData) => data.user?.primaryEmailAddress)
				.catch((error) => {
					window.guardian.modules.sentry.reportError(
						error,
						'getEmail',
					);
					return undefined;
				}),
	);

/**
 * Attempts to fetch a signed in user's email address either from okta token or falling back to IdApi request.
 * Returns null if no email address is found or if the request times out after 1 second.
 * @param {string} idapiUrl - Idapi url available from window.guardian.config.page
 */
export const lazyFetchEmailWithTimeout =
	(idapiUrl: string): (() => Promise<string | null>) =>
	() => {
		return new Promise((resolve) => {
			setTimeout(() => resolve(null), 1000);
			void getEmail(idapiUrl).then((email) => {
				if (email) {
					resolve(email);
				} else {
					resolve(null);
				}
			});
		});
	};
