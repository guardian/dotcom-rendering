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

export const lazyFetchEmailWithTimeout =
	(idapiUrl: string): (() => Promise<string | null>) =>
	() => {
		return new Promise((resolve) => {
			setTimeout(() => resolve(null), 1000);
			// eslint-disable-next-line @typescript-eslint/no-floating-promises
			getEmail(idapiUrl).then((email) => {
				if (email) {
					resolve(email);
				} else {
					resolve(null);
				}
			});
		});
	};
