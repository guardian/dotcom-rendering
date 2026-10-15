import { css } from '@emotion/react';
import {
	between,
	from,
	space,
	textSans12,
	textSans14,
	until,
} from '@guardian/source/foundations';
import { grid } from '../grid';
import type { LayoutType } from '../layouts/lib/articleArrangements';
import {
	ArticleDesign,
	ArticleDisplay,
	type ArticleFormat,
	ArticleSpecial,
} from '../lib/articleFormat';
import { palette } from '../palette';
import CameraSvg from '../static/icons/camera.svg';
import VideoSvg from '../static/icons/video-icon.svg';
import type { MainMedia } from '../types/mainMedia';

type Props = {
	captionText?: string;
	format: ArticleFormat;
	padCaption?: boolean;
	credit?: string;
	displayCredit?: boolean;
	shouldLimitWidth?: boolean;
	isOverlaid?: boolean;
	isLeftCol?: boolean;
	mediaType?: MainMedia['type'];
	isMainMedia?: boolean;
	isImmersive?: boolean;
	showIconBelowLeftCol?: boolean;
	layoutType?: LayoutType;
};

type IconProps = {
	format: ArticleFormat;
	isMainMedia?: boolean;
	showIconBelowLeftCol: boolean;
};

const captionStyle = (isMainMedia: boolean) => css`
	${textSans14};
	line-height: 135%;
	padding-top: 6px;
	overflow-wrap: break-word;
	color: ${isMainMedia
		? palette('--caption-main-media-text')
		: palette('--caption-text')};
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
	padding-left: 10px;
	padding-right: 10px;
`;

const tabletCaptionPadding = css`
	${until.desktop} {
		${captionPadding}
	}
`;

const immersivePadding = css`
	padding-left: 10px;
	padding-right: 10px;
	${from.mobileLandscape} {
		padding-left: 20px;
		padding-right: 20px;
	}
	${from.tablet} {
		padding-right: 100px;
	}
	${from.desktop} {
		padding-right: 340px;
	}
	${from.leftCol} {
		padding-left: 0;
		padding-right: 0;
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

const iconStyle = (isMainMedia?: boolean) => css`
	fill: ${isMainMedia
		? palette('--caption-main-media-text')
		: palette('--caption-text')};
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

const galleryCaptionHeadingReset = css`
	h2 {
		display: inline;
		font-weight: bold;
	}
	h2::after {
		content: '';
		display: block;
	}
`;

const galleryStyles = css`
	${galleryCaptionHeadingReset}
	${grid.column.centre};
	${textSans14};

	margin-bottom: 0;
	padding-bottom: 6px;
	${from.leftCol} {
		${grid.column.left}
		grid-row: 8/10;
	}
	${between.tablet.and.leftCol} {
		position: relative;
		&::before {
			content: '';
			position: absolute;
			left: -10px;
			top: 0;
			bottom: 0;
			width: 1px;
			background-color: ${palette('--article-border')};
		}
	}
`;

function shouldNotRenderCaption({
	captionText,
	credit,
	displayCredit,
}: Pick<Props, 'captionText' | 'credit' | 'displayCredit'>): boolean {
	const noCaption = !captionText?.trim();
	const noCredit = !credit;
	const hideCredit = !displayCredit;
	return noCaption && (noCredit || hideCredit);
}

const CameraIcon = ({
	format,
	isMainMedia,
	showIconBelowLeftCol,
}: IconProps) => {
	return (
		<span
			css={[
				iconStyle(isMainMedia),
				format.display === ArticleDisplay.Immersive &&
					!showIconBelowLeftCol &&
					hideIconBelowLeftCol,
			]}
		>
			<CameraSvg />
		</span>
	);
};

const VideoIcon = ({
	format,
	isMainMedia,
	showIconBelowLeftCol,
}: IconProps) => {
	return (
		<span
			css={[
				iconStyle(isMainMedia),
				format.display === ArticleDisplay.Immersive &&
					!showIconBelowLeftCol &&
					hideIconBelowLeftCol,
				videoIconStyle,
			]}
		>
			<VideoSvg />
		</span>
	);
};

const Row = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			display: flex;
			flex-direction: row;
		`}
	>
		{children}
	</div>
);

const CaptionToggle = () => (
	<>
		<label
			htmlFor="the-checkbox"
			css={css`
				position: absolute;
				right: 5px;
				width: 32px;
				height: 32px;
				z-index: 1;
				/* We're using rgba here for the opactiy */
				background-color: rgba(18, 18, 18, 0.6);
				border-radius: 50%;
				bottom: 6px;
				border: none;
				cursor: pointer;

				svg {
					top: 0;
					bottom: 0;
					right: 0;
					left: 0;
					margin: auto;
					position: absolute;
					fill: white;
				}
			`}
		>
			<svg width="6" height="14" fill="white" viewBox="0 0 6 14">
				<path d="M4.6 12l-.4 1.4c-.7.2-1.9.6-3 .6-.7 0-1.2-.2-1.2-.9 0-.2 0-.3.1-.5l2-6.7H.7l.4-1.5 4.2-.6h.2L3 12h1.6zm-.3-9.2c-.9 0-1.4-.5-1.4-1.3C2.9.5 3.7 0 4.6 0 5.4 0 6 .5 6 1.3c0 1-.8 1.5-1.7 1.5z" />
			</svg>
		</label>
		{/* Hidden input used to toggle the caption using css */}
		<input type="checkbox" id="the-checkbox" />
	</>
);

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
	isImmersive = false,
	showIconBelowLeftCol = false,
	layoutType,
}: Props) => {
	if (shouldNotRenderCaption({ captionText, credit, displayCredit })) {
		return null;
	}

	const isGallery = format.design === ArticleDesign.Gallery;

	const isBlog =
		format.design === ArticleDesign.LiveBlog ||
		format.design === ArticleDesign.DeadBlog;

	const defaultCaption = (
		<figcaption
			css={[
				captionStyle(isMainMedia),
				shouldLimitWidth && limitedWidth,
				isOverlaid ? overlaidStyles(format) : bottomMarginStyles,
				isMainMedia &&
					(isBlog ||
						mediaType === 'YoutubeVideo' ||
						mediaType === 'SelfHostedVideo') &&
					tabletCaptionPadding,
				padCaption && captionPadding,
				isImmersive && immersivePadding,
				isGallery && galleryStyles,
			]}
			data-spacefinder-role="inline"
		>
			{mediaType === 'YoutubeVideo' || mediaType === 'SelfHostedVideo' ? (
				<VideoIcon
					format={format}
					isMainMedia={isMainMedia}
					showIconBelowLeftCol={showIconBelowLeftCol}
				/>
			) : (
				<CameraIcon
					format={format}
					isMainMedia={isMainMedia}
					showIconBelowLeftCol={showIconBelowLeftCol}
				/>
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
			if (
				((format.theme === ArticleSpecial.Labs && isLeftCol) ||
					layoutType?.startsWith('immersive')) ??
				false
			) {
				return defaultCaption;
			}
			return (
				<figcaption
					css={[
						css`
							${textSans12};
							/**
							 * Typography preset styles should not be overridden.
							 * This has been done because the styles do not directly map to the new presets.
							 * Please speak to your team's designer and update this to use a more appropriate preset.
							 */
							line-height: 1.15;
							color: ${isMainMedia
								? palette('--caption-main-media-text')
								: palette('--caption-text')};
							width: 100%;
							margin-top: ${space[3]}px;
							li:not(:first-child) {
								margin-top: ${space[3]}px;
							}
							li {
								padding-top: ${space[2]}px;
								border-top: 1px solid
									${isMainMedia
										? palette('--caption-main-media-text')
										: palette('--caption-text')};
							}
						`,
						bottomMarginStyles,
						padCaption && captionPadding,
						shouldLimitWidth && veryLimitedWidth,
						shouldLimitWidth && bigLeftMargin,
					]}
					data-spacefinder-role="inline"
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

export const ToggleableCaption = (props: Props) => {
	if (shouldNotRenderCaption(props)) {
		return null;
	}

	return (
		<Row>
			<div
				css={css`
					#the-checkbox {
						/* Never show the input */
						display: none;
					}

					#the-caption {
						/* Hide caption by default */
						display: none;
					}

					#the-checkbox:checked + #the-caption {
						/* Show the caption if the input is checked */
						display: block;
					}
				`}
			>
				{/* CaptionToggle contains the input with id #the-checkbox */}
				<CaptionToggle />{' '}
				<div id="the-caption">
					<Caption {...props} />
				</div>
			</div>
		</Row>
	);
};
