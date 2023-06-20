import type { IdApiUserIdentifiers } from './getIdapiUserData';
import { getIdapiUserIdentifiers } from './getIdapiUserData';

export const getBrazeUuid = async (ajaxUrl: string): Promise<string | void> => {
	// TODO: We need the brazeUUID, add this to the ID token
	return getIdapiUserIdentifiers(ajaxUrl)
		.then((data: IdApiUserIdentifiers) => data.brazeUuid)
		.catch((error) => {
			window.guardian.modules.sentry.reportError(error, 'getBrazeUuid');
		});
};
