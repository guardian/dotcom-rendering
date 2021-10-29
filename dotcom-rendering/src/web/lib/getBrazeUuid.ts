import {
	getIdapiUserIdentifiers,
	IdApiUserIdentifiers,
} from '@root/src/web/lib/getIdapiUserData';

export const getBrazeUuid = async (ajaxUrl: string): Promise<string | void> => {
	return getIdapiUserIdentifiers(ajaxUrl)
		.then((data: IdApiUserIdentifiers) => data.brazeUuid)
		.catch((error) => {
			window.guardian.modules.sentry.reportError(error, 'getBrazeUuid');
		});
};
