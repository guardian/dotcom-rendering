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

const stripStyles = css`
	background: ${palette.opinion[800]};
	color: ${palette.neutral[7]};
`;

// Borders are hidden but kept so the text lines up with the directory titles.
const lockupStyles = css`
	${puzzlesContainerStyles};
	display: flex;
	align-items: center;
	height: 50px;
	padding: 0 10px;
	white-space: nowrap;
	${from.mobileMedium} {
		padding: 0 20px;
	}
	${from.desktop} {
		border-color: transparent;
	}
`;

const labelStyles = css`
	${textSansBold12};
	margin-right: ${space[2]}px;
`;

const logoStyles = css`
	display: block;
	width: auto;
	height: auto;
	max-width: 100px;
	max-height: 40px;
	object-fit: contain;
	${from.mobileMedium} {
		max-width: 120px;
	}
`;

const aboutLinkStyles = css`
	${textSans12};
	margin-left: ${space[3]}px;
	color: inherit;
	text-decoration: none;
	&:hover {
		text-decoration: underline;
	}
	${from.mobileMedium} {
		margin-left: ${space[5]}px;
	}
`;

export const PuzzlesBranding = ({ branding }: { branding: Branding }) => {
	const { ophanComponentName, ophanComponentLink } = getOphanComponents({
		branding,
		locationPrefix: 'front-container',
	});
	return (
		<div
			css={stripStyles}
			data-component="puzzles-branding"
			data-print-layout="hide"
		>
			<div css={lockupStyles}>
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
				<a css={aboutLinkStyles} href={branding.aboutThisLink}>
					About this content
				</a>
			</div>
		</div>
	);
};
