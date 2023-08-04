import type { CheckoutCompleteCookieData } from '../../components/SignInGate/types.ts';
import { isCheckoutCompleteCookieData } from '../../components/SignInGate/types.ts';
import { safeJsonParse } from './jsonParser.ts';

export const parseCheckoutCompleteCookieData = (
	checkoutCompleteStr: string,
): CheckoutCompleteCookieData | undefined => {
	const decodedCookieString = decodeURIComponent(checkoutCompleteStr);
	if (decodedCookieString === checkoutCompleteStr) return undefined;
	const parseResult = safeJsonParse(isCheckoutCompleteCookieData)(
		decodeURIComponent(checkoutCompleteStr),
	);
	return !parseResult.hasError ? parseResult.parsed : undefined;
};
