import { css } from '@emotion/react';
import { space, textSans } from '@guardian/source-foundations';
import { Hide } from '@guardian/source-react-components';
import { palette as themePalette } from '../palette';

const disclaimerStyles = css`
	${textSans.medium({ lineHeight: 'regular' })};
	max-width: 540px;

	sup {
		font-size: 85%;
	}
	margin-bottom: 16px;
	color: inherit;
	text-decoration: none;
`;

const disclaimerInlineStyles = css`
	margin-bottom: ${space[1]}px;
	float: left;
	clear: left;
	width: 8.75rem;
	margin-right: 20px;
	background-color: ${themePalette('--rich-link-background')};
	:hover {
		background-color: ${themePalette('--rich-link-background-hover')};
	}
	padding-top: 2px;
	padding-right: 5px;
	padding-left: 5px;
	padding-bottom: 5px;
`;

const DisclaimerText = () => (
	<p>
		The Guardian’s product and service reviews are independent and are in no
		way influenced by any advertiser or commercial initiative. We will earn
		a commission from the retailer if you buy something through an affiliate
		link.&nbsp;
		<a href="https://www.theguardian.com/info/2017/nov/01/reader-information-on-affiliate-links">
			Learn more.
		</a>
	</p>
);

const AffiliateDisclaimer = () => (
	<aside css={[disclaimerStyles]} data-testid="affiliate-disclaimer">
		<DisclaimerText />
	</aside>
);

const AffiliateDisclaimerInline = () => (
	<Hide from="leftCol">
		<div
			css={[disclaimerInlineStyles]}
			data-testid="affiliate-disclaimer-inline"
		>
			<AffiliateDisclaimer />
		</div>
	</Hide>
);

export { AffiliateDisclaimer, AffiliateDisclaimerInline };
