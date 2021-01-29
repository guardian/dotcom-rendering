import { getCookie } from '@root/src/web/browser/cookie';
import { HIDE_SUPPORT_MESSAGING_COOKIE } from '@root/src/web/lib/contributions';

const hideSupportMessaging = () =>
	getCookie(HIDE_SUPPORT_MESSAGING_COOKIE) === 'true';

export { hideSupportMessaging };
