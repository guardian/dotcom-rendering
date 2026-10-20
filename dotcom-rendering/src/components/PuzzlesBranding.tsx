import { css } from '@emotion/react';
import {
	from,
	palette,
	space,
	textSans12,
	textSansBold12,
} from '@guardian/source/foundations';
import { getOphanComponents } from '../lib/labs';
import { puzzlesContainerStyles } from '../lib/puzzlesContainerStyles';
import type { Branding } from '../types/branding';

// Sits in the clear bottom-left area of the sponsored header artwork.
const overlayStyles = css`
	position: absolute;
	right: 0;
	bottom: 0;
	left: 0;
	color: ${palette.neutral[7]};
`;

// Borders are hidden but kept so the text lines up with the directory titles.
const alignedStyles = css`
	${puzzlesContainerStyles};
	padding-right: 10px;
	padding-left: 10px;
	${from.mobileMedium} {
		padding-right: 20px;
		padding-left: 20px;
	}
	${from.desktop} {
		border-color: transparent;
	}
`;

const lockupStyles = css`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 7px;
	padding-bottom: 15px;
	white-space: nowrap;
	${from.desktop} {
		flex-direction: row;
		align-items: center;
		padding-bottom: ${space[5]}px;
	}
`;

const labelStyles = css`
	${textSansBold12};
`;

const logoStyles = css`
	display: block;
	width: auto;
	height: auto;
	max-width: 100px;
	max-height: 40px;
	object-fit: contain;
	object-position: left;
`;

const aboutStyles = css`
	min-height: 35px;
	padding-top: ${space[2]}px;
	padding-bottom: ${space[2]}px;
	text-align: right;
	${from.wide} {
		padding-right: 100px;
	}
`;

const aboutLinkStyles = css`
	${textSans12};
	color: var(--puzzles-text-colour, ${palette.neutral[7]});
`;

type Props = { branding: Branding };

export const PuzzlesBranding = ({ branding }: Props) => {
	const { ophanComponentName, ophanComponentLink } = getOphanComponents({
		branding,
		locationPrefix: 'front-container',
	});
	return (
		<div
			css={overlayStyles}
			data-component="puzzles-branding"
			data-print-layout="hide"
		>
			<div css={[alignedStyles, lockupStyles]}>
				<span css={labelStyles}>{branding.logo.label}</span>
				<a
					href={branding.logo.link}
					rel="nofollow"
					aria-label={`Visit the ${branding.sponsorName} website`}
					data-sponsor={branding.sponsorName.toLowerCase()}
					data-component={ophanComponentName}
					data-link-name={ophanComponentLink}
				>
					<img
						css={logoStyles}
						src={branding.logo.src}
						alt={branding.sponsorName}
						width={branding.logo.dimensions.width}
						height={branding.logo.dimensions.height}
					/>
				</a>
			</div>
		</div>
	);
};

export const PuzzlesBrandingAboutLink = ({ branding }: Props) => (
	<div css={[alignedStyles, aboutStyles]} data-print-layout="hide">
		<a css={aboutLinkStyles} href={branding.aboutThisLink}>
			About this content
		</a>
	</div>
);
