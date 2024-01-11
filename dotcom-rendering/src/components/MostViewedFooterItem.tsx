import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import {
	breakpoints,
	headline,
	palette as sourcePalette,
	until,
} from '@guardian/source-foundations';
import { palette } from '../palette';
import { AgeWarning } from './AgeWarning';
import { BigNumber } from './BigNumber';
import { FormatBoundary } from './FormatBoundary';
import { LinkHeadline } from './LinkHeadline';
import { generateSources } from './Picture';

const gridItem = (
	position: number,
	isWithImage: boolean,
	hasPageSkin: boolean,
) => {
	const borderTop = hasPageSkin
		? css`
				border-top: 1px solid ${sourcePalette.neutral[86]};
		  `
		: css`
				/* Below leftCol always set top border */
				${until.leftCol} {
					border-top: 1px solid ${sourcePalette.neutral[86]};
				}
		  `;
	return css`
		position: relative;

		${borderTop}

		/* Above leftCol, don't apply a top border on the 1st and 6th
		items to prevent double borders */
		border-top: ${position !== 1 &&
		position !== 6 &&
		`1px solid ${sourcePalette.neutral[86]}`};

		/* The left border is set on the container */
		border-right: 1px solid ${sourcePalette.neutral[86]};
		min-height: ${isWithImage ? '4rem' : '3.25rem'};

		&:hover {
			cursor: pointer;
		}

		&:hover,
		:focus {
			background: ${palette('--most-viewed-footer-hover')};
		}
	`;
};

const bigNumber = css`
	position: absolute;
	top: 0.375rem;
	left: 0.625rem;
	fill: ${palette('--article-text')};
	svg {
		height: 2.5rem;
	}
`;

const headlineHeader = css`
	padding: 0.1875rem 0.625rem 1.125rem 4.6875rem;
	word-wrap: break-word;
	overflow: hidden;
`;

const headlineLink = css`
	text-decoration: none;
	color: ${palette('--article-text')};
	font-weight: 500;
	${headline.xxxsmall()};

	display: block; /* To ensure focus outline works okay */
`;

const ageWarningStyles = css`
	padding-left: 4.6875rem;
	margin-top: -16px;
	margin-bottom: 16px;
`;

const imageStyles = css`
	width: 53px;
	height: 53px;
	object-fit: cover;
	position: absolute;
	left: 59px;
	top: 6px;
`;

const textPaddingWithImage = css`
	padding-left: 122px;
`;

type Props = {
	position: number;
	url: string;
	format: ArticleFormat;
	headlineText: string;
	ageWarning?: string;
	cssOverrides?: SerializedStyles | SerializedStyles[];
	image?: string;
	hasPageSkin?: boolean;
};

type MiniImageProps = {
	image: string;
	alt: string;
};

const MiniImage = ({ image, alt }: MiniImageProps) => {
	// We need to have a square image with 53px width and height
	// We first get a source for a landscape image with height 53
	// (requesting a width of 89px from grid)
	// we then crop the image to give it a width of 53px using css
	const [source] = generateSources(image, [
		{ breakpoint: breakpoints.desktop, width: 89 },
	]);

	if (!source) throw new Error(`Missing source for ${image}`);

	return (
		<picture>
			{/* High resolution (HDPI) sources*/}
			<source
				srcSet={source.hiResUrl}
				media={`(-webkit-min-device-pixel-ratio: 1.25), (min-resolution: 120dpi)`}
			/>
			{/* Low resolution (MDPI) source*/}
			<source srcSet={source.lowResUrl} />

			<img alt={alt} src={source.lowResUrl} css={imageStyles} />
		</picture>
	);
};

export const MostViewedFooterItem = ({
	position,
	url,
	format,
	headlineText,
	ageWarning,
	cssOverrides,
	image,
	hasPageSkin = false,
}: Props) => (
	<li
		css={[gridItem(position, !!image, hasPageSkin), cssOverrides]}
		data-link-name={`${position} | text`}
	>
		<a css={headlineLink} href={url} data-link-name="article">
			<span css={bigNumber}>
				<BigNumber index={position} />
			</span>
			{!!image && <MiniImage image={image} alt={headlineText} />}
			<div css={[headlineHeader, !!image && textPaddingWithImage]}>
				<FormatBoundary format={format}>
					{format.design === ArticleDesign.LiveBlog ? (
						<LinkHeadline
							headlineText={headlineText}
							format={format}
							size="small"
							kickerText="Live"
							hideLineBreak={false}
							showPulsingDot={true}
							showQuotes={false}
						/>
					) : (
						<LinkHeadline
							headlineText={headlineText}
							format={format}
							size="small"
							showQuotes={
								format.design === ArticleDesign.Comment ||
								format.design === ArticleDesign.Letter
							}
						/>
					)}
				</FormatBoundary>
			</div>
			{!!ageWarning && (
				<div css={ageWarningStyles}>
					<AgeWarning age={ageWarning} size="small" />
				</div>
			)}
		</a>
	</li>
);
