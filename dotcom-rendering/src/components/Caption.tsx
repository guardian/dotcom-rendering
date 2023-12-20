import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleDisplay, ArticleSpecial } from '@guardian/libs';
import {
	between,
	from,
	space,
	textSans,
	until,
} from '@guardian/source-foundations';
import { palette } from '../palette';
import CameraSvg from '../static/icons/camera.svg';
import VideoSvg from '../static/icons/video-icon.svg';

type Props = {
	captionText?: string;
	format: ArticleFormat;
	padCaption?: boolean;
	credit?: string;
	displayCredit?: boolean;
	shouldLimitWidth?: boolean;
	isOverlaid?: boolean;
	isLeftCol?: boolean;
	mediaType?: MediaType;
	isMainMedia?: boolean;
};

type IconProps = {
	format: ArticleFormat;
};

const captionStyle = css`
	${textSans.xsmall()};
	line-height: 135%;
	padding-top: 6px;
	overflow-wrap: break-all;
	color: ${palette('--caption-text')};
`;

const bottomMarginStyles = css`
	margin-bottom: 6px;
`;

const overlaidBottomPadding = (format: ArticleFormat) => {
	if (
		format.display === ArticleDisplay.Showcase &&
		format.design === ArticleDesign.Review
	) {
		return css`
			padding-bottom: 2.5rem;
		`;
	}
	return css`
		padding-bottom: 0.375rem;
	`;
};

const overlaidStyles = (format: ArticleFormat) => css`
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(18, 18, 18, 0.8);

	span {
		color: ${palette('--caption-overlay-text')};
		font-size: 0.75rem;
		line-height: 1rem;
	}

	svg {
		fill: currentcolor;
	}
	color: ${palette('--caption-overlay-text')};
	font-size: 0.75rem;
	line-height: 1rem;
	padding-top: 0.375rem;
	padding-right: 2.5rem;
	padding-left: 0.75rem;
	${overlaidBottomPadding(format)};

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

const tabletCaptionPadding = css`
	${until.desktop} {
		${captionPadding}
	}
`;

const videoPadding = css`
	${until.mobileLandscape} {
		margin-left: 10px;
	}
	${between.mobileLandscape.and.phablet} {
		margin-left: ${space[5]}px;
	}
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

const pictureRatio = (13 / 18) * 100;
const videoRatio = (23 / 36) * 100;

const iconStyle = css`
	fill: ${palette('--caption-text')};
	margin-right: ${space[1]}px;
	display: inline-block;
	position: relative;
	width: 1em;
	vertical-align: baseline;
	::before {
		content: ' ';
		display: block;
		padding-top: ${pictureRatio}%;
	}
	svg {
		top: 0px;
		right: 0px;
		bottom: 0px;
		left: 0px;
		width: 100%;
		position: absolute;
		height: 100%;
	}
`;

const videoIconStyle = css`
	width: 1.1em;
	::before {
		padding-top: ${videoRatio}%;
	}
`;

const captionLink = css`
	a {
		color: ${palette('--caption-link')};
		text-decoration: none;
	}
	a:hover {
		text-decoration: underline;
	}
	strong {
		font-weight: bold;
	}
`;

const CameraIcon = ({ format }: IconProps) => {
	return (
		<span
			css={[
				iconStyle,
				format.display === ArticleDisplay.Immersive &&
					hideIconBelowLeftCol,
			]}
		>
			<CameraSvg />
		</span>
	);
};

const VideoIcon = ({ format }: IconProps) => {
	return (
		<span
			css={[
				iconStyle,
				format.display === ArticleDisplay.Immersive &&
					hideIconBelowLeftCol,
				videoIconStyle,
			]}
		>
			<VideoSvg />
		</span>
	);
};

export const Caption = ({
	captionText,
	format,
	padCaption = false,
	credit,
	displayCredit = true,
	shouldLimitWidth = false,
	isOverlaid,
	isLeftCol,
	mediaType = 'Gallery',
	isMainMedia = false,
}: Props) => {
	// Sometimes captions come thorough as a single blank space, so we trim here to ignore those
	const noCaption = !captionText?.trim();
	const noCredit = !credit;
	const hideCredit = !displayCredit;
	if (noCaption && (noCredit || hideCredit)) return null;

	const isBlog =
		format.design === ArticleDesign.LiveBlog ||
		format.design === ArticleDesign.DeadBlog;

	const defaultCaption = (
		<figcaption
			css={[
				captionStyle,
				shouldLimitWidth && limitedWidth,
				isOverlaid ? overlaidStyles(format) : bottomMarginStyles,
				isMainMedia && isBlog && tabletCaptionPadding,
				padCaption && captionPadding,
				mediaType === 'Video' && videoPadding,
			]}
		>
			{mediaType === 'Video' ? (
				<VideoIcon format={format} />
			) : (
				<CameraIcon format={format} />
			)}
			{!!captionText && (
				<span
					css={captionLink}
					dangerouslySetInnerHTML={{
						__html: captionText || '',
					}}
					key="caption"
				/>
			)}
			{!!credit && displayCredit && ` ${credit}`}
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
							color: ${palette('--caption-text')};
							width: 100%;
							margin-top: ${space[3]}px;
							li:not(:first-child) {
								margin-top: ${space[3]}px;
							}
							li {
								padding-top: ${space[2]}px;
								border-top: 1px solid
									${palette('--caption-text')};
							}
						`,
						bottomMarginStyles,
						padCaption && captionPadding,
						shouldLimitWidth && veryLimitedWidth,
						shouldLimitWidth && bigLeftMargin,
					]}
				>
					{!!captionText && (
						<span
							css={captionLink}
							dangerouslySetInnerHTML={{
								__html: captionText || '',
							}}
							key="caption"
						/>
					)}
					{!!credit && displayCredit && ` ${credit}`}
				</figcaption>
			);
		default:
			return defaultCaption;
	}
};
