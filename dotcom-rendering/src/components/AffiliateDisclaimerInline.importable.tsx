import { css } from '@emotion/react';
import { space, textSans14 } from '@guardian/source/foundations';
import { Hide } from '@guardian/source/react-components';
import {
	DisclaimerText,
	useAffiliateDisclaimerEvent,
} from '../lib/affiliateDisclaimerHelpers';
import { palette as themePalette } from '../palette';

const disclaimerInlineStyles = css`
	${textSans14};
	/**
	 * Typography preset styles should not be overridden.
	 * This has been done because the styles do not directly map to the new presets.
	 * Please speak to your team's designer and update this to use a more appropriate preset.
	 */
	line-height: 1.15;
	float: left;
	clear: left;
	width: 8.75rem;
	background-color: ${themePalette('--affiliate-disclaimer-background')};
	:hover {
		background-color: ${themePalette(
			'--affiliate-disclaimer-background-hover',
		)};
	}
	margin-top: ${space[1]}px;
	margin-right: ${space[5]}px;
	margin-bottom: ${space[1]}px;
	padding-top: ${space[0]}px;
	padding-right: 5px;
	padding-left: 5px;
	padding-bottom: ${space[3]}px;
`;

const AffiliateDisclaimerInline = () => {
	useAffiliateDisclaimerEvent();
	return (
		<Hide from="leftCol">
			<aside
				css={[disclaimerInlineStyles]}
				data-testid="affiliate-disclaimer-inline"
			>
				<DisclaimerText />
			</aside>
		</Hide>
	);
};

export { AffiliateDisclaimerInline };
