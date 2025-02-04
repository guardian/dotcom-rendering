import { getCookie } from '@guardian/libs';

export const USER_FEATURES_EXPIRY_COOKIE = 'gu_user_features_expiry';

export const getUserFeaturesExpiryCookie = (): string | null =>
	getCookie({ name: USER_FEATURES_EXPIRY_COOKIE });
