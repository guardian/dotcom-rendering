import { getAuthState } from './identity';

export const getBrazeUuid = async (): Promise<string | undefined> => {
	const authState = await getAuthState();
	return authState.idToken?.claims.braze_uuid;
};
