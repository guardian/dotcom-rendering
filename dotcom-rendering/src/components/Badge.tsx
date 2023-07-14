import { css } from '@emotion/react';
import { from, palette, textSans } from '@guardian/source-foundations';

const badgeSizingStyles = (width?: number, height?: number) => {
	// This default applies to non-sponsored badges
	// where the size of the badge is unknown
	if (width === undefined || height === undefined) {
		return css`
			height: 42px;
			${from.leftCol} {
				height: 54px;
			}
		`;
	} else {
		// The sizing here uses the width and height from the branding
		// The badge is at half size unless at wide viewpoints
		return css`
			width: ${width / 2}px;
			height: ${height / 2}px;
			${from.wide} {
				width: ${width}px;
				height: ${height}px;
			}
		`;
	}
};

const imageStyles = css`
	display: block;
	max-width: 100%;
	object-fit: contain;
`;

const badgeLink = css`
	text-decoration: none;
`;

const labelStyles = css`
	${textSans.xxsmall()};
	line-height: 1rem;
	color: ${palette.neutral[46]};
	font-weight: bold;
	margin-top: 0.375rem;
	padding-right: 0.625rem;
	padding-bottom: 0.625rem;
	text-align: left;
`;

const aboutThisLinkStyles = css`
	${textSans.xxsmall()};
	line-height: 11px;
	color: ${palette.neutral[46]};
	font-weight: normal;
	text-decoration: none;
`;

type Props = {
	imageSrc: string;
	href: string;
	label?: string;
	aboutThisLinkHref?: string;
	sponsorName?: string;
	width?: number;
	height?: number;
};

export const Badge = ({
	imageSrc,
	href,
	label,
	aboutThisLinkHref,
	sponsorName,
	width,
	height,
}: Props) => {
	return (
		<>
			{!!label && <p css={labelStyles}>{label}</p>}

			<a href={href} css={badgeLink} role="button">
				<img
					css={[imageStyles, badgeSizingStyles(width, height)]}
					src={imageSrc}
					alt={`${sponsorName ?? 'brand'} logo`}
				/>
			</a>

			{!!aboutThisLinkHref && (
				<a css={aboutThisLinkStyles} href={aboutThisLinkHref}>
					About this content
				</a>
			)}
		</>
	);
};
