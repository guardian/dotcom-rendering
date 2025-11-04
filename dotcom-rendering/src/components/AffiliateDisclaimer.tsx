import { css } from '@emotion/react';
import {
	palette,
	space,
	textSans12,
	textSans14,
	textSans15,
} from '@guardian/source/foundations';
import { Hide } from '@guardian/source/react-components';
import { useBetaAB } from '../lib/useAB';
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
	const abTests = useBetaAB();

	const isUserInServerSideVariant = abTests?.isUserInTestGroup(
		'commercial-dev-server-side-test',
		'variant',
	);

	console.log('isUserInServerSideVariant ---->', isUserInServerSideVariant);

	return (
		<Hide until="leftCol">
			<aside
				css={[disclaimerLeftColStyles]}
				data-testid="affiliate-disclaimer"
				data-foo={isUserInServerSideVariant}
			>
				<DisclaimerText />
			</aside>
		</Hide>
	);
};

const AffiliateDisclaimerInline = () => (
	<Hide from="leftCol">
		<aside
			css={[disclaimerInlineStyles]}
			data-testid="affiliate-disclaimer-inline"
		>
			<DisclaimerText />
		</aside>
	</Hide>
);

const GalleryAffiliateDisclaimer = () => (
	<aside
		css={[disclaimerLeftColStyles, galleryDisclaimerStyles]}
		data-testid="affiliate-disclaimer"
	>
		<DisclaimerText />
	</aside>
);

export {
	AffiliateDisclaimer,
	AffiliateDisclaimerInline,
	GalleryAffiliateDisclaimer,
};
