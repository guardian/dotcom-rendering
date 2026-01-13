import { css } from '@emotion/react';
import {
	palette,
	space,
	textSans12,
	textSans15,
} from '@guardian/source/foundations';
import {
	DisclaimerText,
	useAffiliateDisclaimerEvent,
} from '../lib/affiliateDisclaimerHelpers';
import { palette as themePalette } from '../palette';

const galleryDisclaimerStyles = css`
	${textSans12};
	line-height: 1.5;
	color: ${themePalette('--affiliate-disclaimer-text')};
	padding-top: ${space[1]}px;
	padding-bottom: ${space[1]}px;
	a {
		color: ${themePalette('--affiliate-disclaimer-text')};
		transition: border-color 0.15s ease-out;
		border-bottom: 1px solid ${palette.neutral[46]};
		text-decoration: none;
	}
	a:hover {
		border-bottom: 1px solid
			${themePalette('--affiliate-disclaimer-text-hover')};
		text-decoration: none;
	}
`;

const GalleryAffiliateDisclaimer = () => {
	useAffiliateDisclaimerEvent();
	return (
		<aside
			css={[galleryDisclaimerStyles]}
			data-testid="affiliate-disclaimer"
		>
			<DisclaimerText />
		</aside>
	);
};

export { GalleryAffiliateDisclaimer };
