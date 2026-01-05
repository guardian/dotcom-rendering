import { css } from '@emotion/react';
import {
	palette,
	space,
	textSans12,
	textSans15,
} from '@guardian/source/foundations';
import { useEffect } from 'react';
import { submitComponentEvent } from '../client/ophan/ophan';
import { palette as themePalette } from '../palette';

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

const galleryDisclaimerStyles = css`
	${textSans12};
	line-height: 1.5;
	color: ${themePalette('--affiliate-disclaimer-text')};
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

const useAffiliateDisclaimerEvent = () => {
	useEffect(() => {
		console.log(
			'*** useAffiliateDisclaimerEvent GalleryAffiliateDisclaimer ***',
		);

		void submitComponentEvent(
			{
				action: 'DETECT',
				component: {
					componentType: 'AFFILIATE_DISCLAIMER',
				},
			},
			'Web',
		);
	}, []);
};

const GalleryAffiliateDisclaimer = () => {
	useAffiliateDisclaimerEvent();
	return (
		<aside
			css={[disclaimerLeftColStyles, galleryDisclaimerStyles]}
			data-testid="affiliate-disclaimer"
		>
			<DisclaimerText />
		</aside>
	);
};

export { GalleryAffiliateDisclaimer };
