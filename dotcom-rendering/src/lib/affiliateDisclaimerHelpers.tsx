import { useEffect } from 'react';
import { submitComponentEvent } from '../client/ophan/ophan';
import { useConfig } from '../components/ConfigContext';

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
	const { renderingTarget } = useConfig();

	useEffect(() => {
		if (!affiliateDisclaimerDetectTracked) {
			void submitComponentEvent(
				{
					action: 'DETECT',
					component: {
						componentType: 'AFFILIATE_DISCLAIMER',
					},
				},
				renderingTarget,
			);

			affiliateDisclaimerDetectTracked = true;
		}
	}, [renderingTarget]);
};

const DisclaimerText = () => (
	<p>
		The Guardian’s journalism is independent. We will earn a commission if
		you buy something through an affiliate link.&nbsp;
		<a href="https://www.theguardian.com/info/2017/nov/01/reader-information-on-affiliate-links">
			Learn more
		</a>
		.
	</p>
);

export { DisclaimerText, useAffiliateDisclaimerEvent };
