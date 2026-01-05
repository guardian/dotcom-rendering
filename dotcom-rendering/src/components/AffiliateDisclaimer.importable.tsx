import { css } from '@emotion/react';
import { space, textSans15 } from '@guardian/source/foundations';
import { Hide } from '@guardian/source/react-components';
import { useAffiliateDisclaimerEvent } from '../lib/affiliateDisclaimerHelpers';

const disclaimerLeftColStyles = css`
	${textSans15};
	/**
	 * Typography preset styles should not be overridden.
	 * This has been done because the styles do not directly map to the new presets.
	 * Please speak to your team's designer and update this to use a more appropriate preset.
	 */
	line-height: 1.15;
	padding-top: ${space[1]}px;
	padding-bottom: ${space[1]}px;
`;

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

const AffiliateDisclaimer = () => {
	useAffiliateDisclaimerEvent();
	return (
		<Hide until="leftCol">
			<aside
				css={[disclaimerLeftColStyles]}
				data-testid="affiliate-disclaimer"
			>
				<DisclaimerText />
			</aside>
		</Hide>
	);
};

export { AffiliateDisclaimer };
