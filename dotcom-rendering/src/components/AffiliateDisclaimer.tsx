import type { SerializedStyles } from '@emotion/react';
import { palette } from '../palette';
import { Disclaimer } from './disclaimer/Disclaimer';

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
	>
		<AffiliateDisclaimerText />
	</Disclaimer>
);

export { AffiliateDisclaimer };
