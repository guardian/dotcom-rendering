import { css } from '@emotion/react';

import { from, until } from '@guardian/src-foundations/mq';
import { textSans } from '@guardian/src-foundations/typography';
import { space } from '@guardian/src-foundations';
import { ArticleDisplay, ArticleDesign, ArticleSpecial } from '@guardian/libs';

import CameraIcon from '@frontend/static/icons/camera.svg';

type Props = {
	captionText?: string;
	format: ArticleFormat;
	palette: Palette;
	padCaption?: boolean;
	credit?: string;
	displayCredit?: boolean;
	shouldLimitWidth?: boolean;
	isOverlayed?: boolean;
	isLeftCol?: boolean;
};

const captionStyle = (palette: Palette) => css`
	${textSans.xsmall()};
	line-height: 135%;
	padding-top: 6px;
	word-wrap: break-all;
	color: ${palette.text.caption};
	${until.tablet} {
		padding-left: ${space[2]}px;
		padding-right: ${space[2]}px;
	}
`;

const bottomMargin = css`
	margin-bottom: 6px;
`;

const overlayedStyles = (palette: Palette) => css`
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(18, 18, 18, 0.8);

	span {
		color: ${palette.text.overlayedCaption};
		font-size: 0.75rem;
		line-height: 1rem;
	}

	svg {
		fill: ${palette.text.overlayedCaption};
	}
	color: ${palette.text.overlayedCaption};
	font-size: 0.75rem;
	line-height: 1rem;
	padding-top: 0.375rem;
	padding-right: 2.5rem;
	padding-left: 0.75rem;
	padding-bottom: 0.375rem;

	flex-grow: 1;
	min-height: 2.25rem;
`;

const limitedWidth = css`
	${from.leftCol} {
		width: 140px;
		/* use absolute position here to allow the article text to push up alongside
           the caption when it is limited in width */
		position: absolute;
	}
	${from.wide} {
		width: 220px;
	}
`;

const veryLimitedWidth = css`
	${from.leftCol} {
		width: 120px;
		/* use absolute position here to allow the article text to push up alongside
           the caption when it is limited in width */
		position: absolute;
	}
	${from.wide} {
		width: 184px;
	}
`;

const captionPadding = css`
	padding-left: 8px;
	padding-right: 8px;
`;

const bigLeftMargin = css`
	width: inherit;
	margin-left: ${space[9]}px;
	${until.wide} {
		margin-left: 20px;
		margin-right: 20px;
	}
	${until.mobileLandscape} {
		margin-left: 10px;
		margin-right: 10px;
	}
`;

const hideIconBelowLeftCol = css`
	${until.leftCol} {
		display: none;
	}
`;

const iconStyle = (palette: Palette) => css`
	fill: ${palette.fill.cameraCaptionIcon};
	margin-right: ${space[1]}px;
	display: inline-block;
	vertical-align: middle;
	svg {
		width: 14px;
		display: inline-block;
	}
`;

const captionLink = (palette: Palette) => css`
	a {
		color: ${palette.text.captionLink};
		text-decoration: none;
	}
	a:hover {
		text-decoration: underline;
	}
	strong {
		font-weight: bold;
	}
`;

export const Caption = ({
	captionText,
	format,
	palette,
	padCaption = false,
	credit,
	displayCredit = true,
	shouldLimitWidth = false,
	isOverlayed,
	isLeftCol,
}: Props) => {
	// Sometimes captions come thorough as a single blank space, so we trim here to ignore those
	const noCaption = !captionText?.trim();
	const noCredit = !credit;
	const hideCredit = !displayCredit;
	if (noCaption && (noCredit || hideCredit)) return null;

	const defaultCaption = (
		<figcaption
			css={[
				captionStyle(palette),
				shouldLimitWidth && limitedWidth,
				!isOverlayed && bottomMargin,
				isOverlayed && overlayedStyles(palette),
				padCaption && captionPadding,
			]}
		>
			<span
				css={[
					iconStyle(palette),
					format.display === ArticleDisplay.Immersive &&
						hideIconBelowLeftCol,
				]}
			>
				<CameraIcon />
			</span>
			{captionText && (
				<span
					css={captionLink(palette)}
					// eslint-disable-next-line react/no-danger
					dangerouslySetInnerHTML={{
						__html: captionText || '',
					}}
					key="caption"
				/>
			)}
			{credit && displayCredit && ` ${credit}`}
		</figcaption>
	);

	switch (format.design) {
		case ArticleDesign.PhotoEssay:
			if (format.theme === ArticleSpecial.Labs && isLeftCol) {
				return defaultCaption;
			}
			return (
				<figcaption
					css={[
						css`
							${textSans.xxsmall({ lineHeight: 'tight' })};
							color: ${palette.text.caption};
							width: 100%;
							margin-top: ${space[3]}px;
							li:not(:first-child) {
								margin-top: ${space[3]}px;
							}
							li {
								padding-top: ${space[2]}px;
								border-top: 1px solid ${palette.text.caption};
							}
						`,
						bottomMargin,
						padCaption && captionPadding,
						shouldLimitWidth && veryLimitedWidth,
						shouldLimitWidth && bigLeftMargin,
					]}
				>
					{captionText && (
						<span
							css={captionLink(palette)}
							// eslint-disable-next-line react/no-danger
							dangerouslySetInnerHTML={{
								__html: captionText || '',
							}}
							key="caption"
						/>
					)}
					{credit && displayCredit && ` ${credit}`}
				</figcaption>
			);
		default:
			return defaultCaption;
	}
};
