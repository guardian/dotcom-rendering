import type { SerializedStyles } from '@emotion/react';
import { Disclaimer } from '@guardian/source-development-kitchen/react-components';
import { palette } from '../palette';

const AffiliateDisclaimerText = () => (
	<p
		style={{
			marginInline: 'auto',
			marginTop: 0,
			marginBottom: 0,
			width: 'fit-content',
		}}
	>
		The Guardian’s journalism is independent. We will earn a commission if
		you buy something through an affiliate link.&nbsp;
		<a href="https://www.theguardian.com/info/2017/nov/01/reader-information-on-affiliate-links">
			Learn more
		</a>
		.
	</p>
);

const affiliateDisclaimerId = 'affiliate-disclaimer';
const AffiliateDisclaimer = ({
	cssOverrides,
}: {
	cssOverrides?: SerializedStyles;
}) => (
	<Disclaimer
		theme={{
			backgroundPrimary: palette('--affiliate-disclaimer-background'),
			textPrimary: palette('--affiliate-disclaimer-text'),
			linkPrimary: palette('--article-section-title-lifestyle'),
		}}
		cssOverrides={cssOverrides}
		data-testid={affiliateDisclaimerId}
		data-component={affiliateDisclaimerId}
	>
		<AffiliateDisclaimerText />
	</Disclaimer>
);

export { AffiliateDisclaimer };
