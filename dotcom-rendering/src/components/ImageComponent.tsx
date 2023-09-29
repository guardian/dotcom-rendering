import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import {
	between,
	brandAltBackground,
	from,
	headline,
	neutral,
	until,
} from '@guardian/source-foundations';
import { decidePalette } from '../lib/decidePalette';
import { getLargest, getMaster } from '../lib/image';
import { isWideEnough } from '../lib/lightbox';
import type { Switches } from '../types/config';
import type { ImageBlockElement, RoleType } from '../types/content';
import type { Palette } from '../types/palette';
import { Caption } from './Caption';
import { Hide } from './Hide';
import { LightboxLink } from './LightboxLink';
import { Picture } from './Picture';
import { StarRating } from './StarRating/StarRating';

type Props = {
	element: ImageBlockElement;
	role: RoleType;
	format: ArticleFormat;
	hideCaption?: boolean;
	isMainMedia?: boolean;
	starRating?: number;
	title?: string;
	isAvatar?: boolean;
	switches?: Switches;
};

const starsWrapper = css`
	background-color: ${brandAltBackground.primary};

	position: absolute;
	${until.tablet} {
		bottom: 0;
	}
	${from.tablet} {
		top: 0;
	}

	/* Stars Padding from largest to smallest width */
	${from.leftCol} {
		padding-left: 5px;
	}

	${between.phablet.and.leftCol} {
		padding-left: 0px;
		margin-left: -0px;
	}

	${until.phablet} {
		padding-left: 10px;
		margin-left: 0px;
	}
`;

const PositionStarRating = ({ rating }: { rating: number }) => (
	<div css={starsWrapper}>
		<StarRating rating={rating} size="large" />
	</div>
);

const basicTitlePadding = css`
	${until.tablet} {
		padding-top: 4px;
		padding-bottom: 14px;
		padding-left: 20px;
		padding-right: 20px;
	}

	${from.tablet} {
		padding-top: 4px;
		padding-bottom: 17px;
		padding-left: 20px;
		padding-right: 20px;
	}
`;

const moreTitlePadding = css`
	padding-top: 4px;

	${until.tablet} {
		padding-bottom: 14px;
		padding-left: 20px;
		padding-right: 40px;
	}

	${until.mobileLandscape} {
		padding-left: 10px;
	}

	${from.tablet} {
		padding-bottom: 17px;
		padding-left: 20px;
		padding-right: 20px;
	}

	${from.leftCol} {
		padding-left: 160px;
	}

	${from.wide} {
		padding-left: 240px;
	}
`;

const titleWrapper = (palette: Palette) => css`
	position: absolute;
	bottom: 0;
	width: 100%;

	${until.desktop} {
		${headline.xxsmall({ fontWeight: 'light' })}
	}
	${until.phablet} {
		${headline.xxxsmall({ fontWeight: 'light' })}
	}
	${from.desktop} {
		${headline.xsmall({ fontWeight: 'light' })}
	}
	color: ${neutral[100]};
	background: linear-gradient(transparent, ${neutral[0]});

	:before {
		background-color: ${palette.background.imageTitle};
		display: block;
		content: '';
		width: 8.75rem;
		${until.desktop} {
			height: 0.5rem;
		}
		${from.desktop} {
			height: 0.75rem;
		}

		margin-bottom: calc(1.25rem / 3);
	}
`;

const ImageTitle = ({
	title,
	role,
	palette,
}: {
	title: string;
	role: RoleType;
	palette: Palette;
}) => {
	switch (role) {
		case 'inline':
		case 'thumbnail':
		case 'halfWidth':
		case 'supporting':
			return (
				<h2 css={[titleWrapper(palette), basicTitlePadding]}>
					{title}
				</h2>
			);
		case 'showcase':
		case 'immersive':
			return (
				<h2 css={[titleWrapper(palette), moreTitlePadding]}>{title}</h2>
			);
	}
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
		{}
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

const isSupported = (imageUrl: string): boolean => {
	const supportedImages = ['jpg', 'jpeg', 'png'];
	return supportedImages.some((extension) =>
		imageUrl.endsWith(`.${extension}`),
	);
};

export const ImageComponent = ({
	element,
	format,
	hideCaption,
	role,
	isMainMedia,
	starRating,
	title,
	isAvatar,
	switches,
}: Props) => {
	// Its possible the tools wont send us any images urls
	// if so, don't try to render
	if (element.media.allImages.length === 0) {
		return null;
	}

	const shouldLimitWidth =
		!isMainMedia &&
		(role === 'showcase' || role === 'supporting' || role === 'immersive');
	const isNotOpinion =
		format.design !== ArticleDesign.Comment &&
		format.design !== ArticleDesign.Editorial;

	/** Legacy images do not have a master so we fallback to the largest available */
	const image =
		getMaster(element.media.allImages) ??
		getLargest(element.media.allImages);

	if (!image?.url || !isSupported(image.url)) {
		// We should only try to render images that are supported by Fastly
		return null;
	}

	/**
	 * We use height and width for two things.
	 *
	 * 2) To get a true ratio value to apply to the image in the page, so the browser's pre-parser can reserve the space
	 *
	 * On the second point, see this PR for more detail
	 * https://github.com/guardian/dotcom-rendering/pull/1879
	 *
	 */
	const imageWidth = parseInt(image.fields.width, 10);
	const imageHeight = parseInt(image.fields.height, 10);

	const palette = decidePalette(format);

	if (
		isMainMedia &&
		format.display === ArticleDisplay.Immersive &&
		isNotOpinion
	) {
		return (
			<div
				id={
					element.position !== undefined
						? `img-${element.position}`
						: ''
				}
				css={css`
					/* These styles depend on the containing layout component wrapping the main media
                    with a div set to 100vh. This is the case for ImmersiveLayout which should
                    always be used if display === 'immersive' */
					height: 80vh;
					width: 100%;
					min-height: 25rem;

					${from.desktop} {
						height: 100vh;
						min-height: 31.25rem;
					}
					${from.wide} {
						min-height: 50rem;
					}
					img {
						object-fit: cover;
					}
					picture {
						height: 100%;
					}
					/* We need position relative here to contain the absolute positioned ClickOverlay added by LightboxLink */
					position: relative;
				`}
			>
				<Picture
					role={role}
					format={format}
					master={image.url}
					alt={element.data.alt ?? ''}
					width={imageWidth}
					height={imageHeight}
					isLazy={!isMainMedia}
					isMainMedia={isMainMedia}
				/>
				{!!title && (
					<ImageTitle title={title} role={role} palette={palette} />
				)}
				{switches?.lightbox === true &&
					isWideEnough(image) &&
					element.position !== undefined && (
						<LightboxLink
							role={role}
							format={format}
							elementId={element.elementId}
							isMainMedia={isMainMedia}
							position={element.position}
						/>
					)}
			</div>
		);
	}

	if (hideCaption) {
		return (
			<div
				id={
					element.position !== undefined
						? `img-${element.position}`
						: ''
				}
				css={css`
					position: relative;

					img {
						height: 100%;
						width: 100%;
						object-fit: cover;
						${isAvatar && 'border-radius: 50%;'}
					}
				`}
			>
				<Picture
					role={role}
					format={format}
					master={image.url}
					alt={element.data.alt ?? ''}
					width={imageWidth}
					height={imageHeight}
					isLazy={!isMainMedia}
					isMainMedia={isMainMedia}
				/>
				{typeof starRating === 'number' && (
					<PositionStarRating rating={starRating} />
				)}
				{!!title && (
					<ImageTitle title={title} role={role} palette={palette} />
				)}
				{switches?.lightbox === true &&
					isWideEnough(image) &&
					element.position !== undefined && (
						<LightboxLink
							role={role}
							format={format}
							elementId={element.elementId}
							isMainMedia={isMainMedia}
							position={element.position}
						/>
					)}
			</div>
		);
	}

	return (
		<>
			<div
				id={
					element.position !== undefined
						? `img-${element.position}`
						: ''
				}
				css={css`
					position: relative;

					img {
						height: 100%;
						width: 100%;
						object-fit: cover;
						${isAvatar && 'border-radius: 50%;'}
					}
				`}
			>
				<Picture
					role={role}
					format={format}
					master={image.url}
					alt={element.data.alt ?? ''}
					width={imageWidth}
					height={imageHeight}
					isLazy={!isMainMedia}
					isMainMedia={isMainMedia}
				/>
				{isMainMedia && (
					// Below tablet, main media images show an info toggle at the bottom right of
					// the image which, when clicked, toggles the caption as an overlay
					<Hide when="above" breakpoint="tablet">
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
									<Caption
										captionText={element.data.caption ?? ''}
										format={format}
										credit={element.data.credit}
										displayCredit={element.displayCredit}
										shouldLimitWidth={shouldLimitWidth}
										isOverlaid={true}
										isMainMedia={isMainMedia}
									/>
								</div>
							</div>
						</Row>
					</Hide>
				)}
				{typeof starRating === 'number' && (
					<PositionStarRating rating={starRating} />
				)}
				{!!title && (
					<ImageTitle title={title} role={role} palette={palette} />
				)}

				{switches?.lightbox === true &&
					isWideEnough(image) &&
					element.position !== undefined && (
						<LightboxLink
							role={role}
							format={format}
							elementId={element.elementId}
							isMainMedia={isMainMedia}
							position={element.position}
						/>
					)}
			</div>
			{isMainMedia ? (
				<Hide when="below" breakpoint="tablet">
					<Caption
						captionText={element.data.caption ?? ''}
						format={format}
						credit={element.data.credit}
						displayCredit={element.displayCredit}
						shouldLimitWidth={shouldLimitWidth}
						isMainMedia={isMainMedia}
					/>
				</Hide>
			) : (
				<Caption
					captionText={element.data.caption ?? ''}
					format={format}
					credit={element.data.credit}
					displayCredit={element.displayCredit}
					shouldLimitWidth={shouldLimitWidth}
					isMainMedia={isMainMedia}
				/>
			)}
		</>
	);
};
