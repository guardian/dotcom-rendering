import type { IdApiUserIdentifiers } from './getIdapiUserData';
import { getIdapiUserIdentifiers } from './getIdapiUserData';
import { eitherSignedInWithOktaOrElse } from './useSignedInAuthState';

export const getBrazeUuid = async (ajaxUrl: string): Promise<string | void> =>
	// TODO Okta: Remove either when at 100% in oktaVariant test, and just use idToken
	eitherSignedInWithOktaOrElse(
		(authState) => authState.idToken?.claims.braze_uuid,
		() =>
			getIdapiUserIdentifiers(ajaxUrl)
				.then((data: IdApiUserIdentifiers) => data.brazeUuid)
				.catch((error) => {
					window.guardian.modules.sentry.reportError(
						error,
						'getBrazeUuid',
					);
				}),
	);
