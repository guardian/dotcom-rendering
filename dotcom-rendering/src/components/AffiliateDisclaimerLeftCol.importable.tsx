import { css } from '@emotion/react';
import { space, textSans15 } from '@guardian/source/foundations';
import { Hide } from '@guardian/source/react-components';
import {
	DisclaimerText,
	useAffiliateDisclaimerEvent,
} from '../lib/affiliateDisclaimerHelpers';

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

const AffiliateDisclaimerLeftCol = () => {
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

export { AffiliateDisclaimerLeftCol };
