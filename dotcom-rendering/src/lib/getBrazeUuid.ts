import type { IdApiUserIdentifiers } from './getIdapiUserData';
import { getIdapiUserIdentifiers } from './getIdapiUserData';
import { reportErrorToSentry } from './reportErrorToSentry';
import { eitherInOktaTestOrElse } from './useAuthStatus';

export const getBrazeUuid = async (ajaxUrl: string): Promise<string | void> =>
	// TODO Okta: Remove either when at 100% in oktaVariant test, and just use idToken
	eitherInOktaTestOrElse(
		(authState) => authState.idToken?.claims.braze_uuid,
		() =>
			getIdapiUserIdentifiers(ajaxUrl)
				.then((data: IdApiUserIdentifiers) => data.brazeUuid)
				.catch((error) => {
					reportErrorToSentry(error, 'getBrazeUuid');
				}),
	);
