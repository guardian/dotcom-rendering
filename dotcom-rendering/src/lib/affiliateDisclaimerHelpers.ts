import { useEffect } from 'react';
import { submitComponentEvent } from '../client/ophan/ophan';

/**
 * On Articles we render multiple Affiliate Disclaimer components,
 * For example one in the left column (for non-mobile breakpoints)
 * and one inline (for mobile breakpoints), however we don't want to
 * trigger multiple detect events, eg. one event per component,
 * one event per Article is desired, we're therefore keeping a record
 * of the event being tracked here to achieve this.
 */
let affiliateDisclaimerDetectTracked = false;

const useAffiliateDisclaimerEvent = (): void => {
	useEffect(() => {
		if (!affiliateDisclaimerDetectTracked) {
			void submitComponentEvent(
				{
					action: 'DETECT',
					component: {
						componentType: 'AFFILIATE_DISCLAIMER',
					},
				},
				'Web',
			);

			affiliateDisclaimerDetectTracked = true;
		}
	}, []);
};

export { useAffiliateDisclaimerEvent };
