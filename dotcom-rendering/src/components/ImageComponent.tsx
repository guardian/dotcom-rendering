import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, isUndefined } from '@guardian/libs';
import {
	from,
	headlineLight17,
	headlineLight20,
	headlineLight24,
	headlineLight34,
	palette as srcPalette,
	until,
} from '@guardian/source/foundations';
import { decidePalette } from '../lib/decidePalette';
import { getLargest, getMaster } from '../lib/image';
import { palette as themePalette } from '../palette';
import type {
	ImageBlockElement,
	StarRating as Rating,
	RoleType,
} from '../types/content';
import type { Palette } from '../types/palette';
import { AppsLightboxImage } from './AppsLightboxImage.importable';
import { Caption } from './Caption';
import { useConfig } from './ConfigContext';
import { Hide } from './Hide';
import { Island } from './Island';
import { LightboxLink } from './LightboxLink';
import { Picture } from './Picture';
import { StarRating } from './StarRating/StarRating';

type Props = {
	element: ImageBlockElement;
	role: RoleType;
	format: ArticleFormat;
	hideCaption?: boolean;
	isMainMedia?: boolean;
	starRating?: Rating;
	title?: string;
	isAvatar?: boolean;
	isTimeline?: boolean;
};

const timelineBulletStyles = css`
	position: relative;
	::before {
		content: '';
		position: absolute;
		display: block;
		width: 12px;
		height: 12px;
		border: 1px solid ${themePalette('--timeline-event-border')};
		border-radius: 100%;
		background-color: ${themePalette('--timeline-bullet')};
		top: -6px;
		left: -6.5px;

		${from.leftCol} {
			left: 143.5px;
		}

		${from.wide} {
			left: 223.5px;
		}
	}
`;

const starsWrapper = css`
	background-color: ${themePalette('--star-rating-background')};
	color: ${themePalette('--star-rating-fill')};

	position: absolute;
	${until.tablet} {
		bottom: 0;
	}
	${from.tablet} {
		top: 0;
	}
`;

const PositionStarRating = ({ rating }: { rating: Rating }) => (
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

const immersiveTitleWrapper = css`
	${until.desktop} {
		${headlineLight34};
	}

	${until.phablet} {
		${headlineLight34};
	}

	${from.desktop} {
		${headlineLight34};
	}
`;
const titleWrapper = (palette: Palette) => css`
	position: absolute;
	bottom: 0;
	width: 100%;

	${until.desktop} {
		${headlineLight20};
	}
	${until.phablet} {
		${headlineLight17};
	}
	${from.desktop} {
		${headlineLight24};
	}

	color: ${srcPalette.neutral[100]};
	background: linear-gradient(transparent, ${srcPalette.neutral[0]});

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
				<h2
					css={[
						titleWrapper(palette),
						immersiveTitleWrapper,
						moreTitlePadding,
					]}
				>
					{title}
				</h2>
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
	const supportedImages = ['jpg', 'jpeg', 'png', 'gif'];
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
	isTimeline = false,
}: Props) => {
	const { renderingTarget } = useConfig();
	// Its possible the tools wont send us any images urls
	// if so, don't try to render
	if (element.media.allImages.length === 0) {
		return null;
	}

	const shouldLimitWidth =
		(!isMainMedia || isTimeline) &&
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

	const isWeb = renderingTarget === 'Web';

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

	const loading = isMainMedia ? 'eager' : 'lazy';

	const orientation = imageWidth > imageHeight ? 'landscape' : 'portrait';
	console.log({ orientation });
	if (
		isMainMedia &&
		format.display === ArticleDisplay.Immersive &&
		isNotOpinion
	) {
		return (
			<div
				id={
					!isUndefined(element.position)
						? `img-${element.position}`
						: ''
				}
				css={css`
					/* These styles depend on the containing layout component wrapping the main media
                    with a div set to 100vh. This is the case for ImmersiveLayout which should
                    always be used if display === 'immersive' */
					height: 100%;
					width: 100%;
					min-height: 25rem;

					${from.desktop} {
						min-height: 31.25rem;
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
				{renderingTarget === 'Apps' ? (
					<Island priority="critical">
						<AppsLightboxImage
							elementId={element.elementId}
							role={role}
							format={format}
							master={image.url}
							alt={element.data.alt ?? ''}
							width={imageWidth}
							height={imageHeight}
							loading={loading}
							isMainMedia={isMainMedia}
						/>
					</Island>
				) : (
					<Picture
						role={role}
						format={format}
						master={image.url}
						alt={element.data.alt ?? ''}
						width={imageWidth}
						height={imageHeight}
						loading={loading}
						isMainMedia={isMainMedia}
					/>
				)}

				{!!title && (
					<ImageTitle title={title} role={role} palette={palette} />
				)}
				{isWeb && !isUndefined(element.position) && (
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
				{renderingTarget === 'Apps' ? (
					<Island priority="critical">
						<AppsLightboxImage
							elementId={element.elementId}
							role={role}
							format={format}
							master={image.url}
							alt={element.data.alt ?? ''}
							width={imageWidth}
							height={imageHeight}
							loading={loading}
							isMainMedia={isMainMedia}
						/>
					</Island>
				) : (
					<Picture
						role={role}
						format={format}
						master={image.url}
						alt={element.data.alt ?? ''}
						width={imageWidth}
						height={imageHeight}
						loading={loading}
						isMainMedia={isMainMedia}
					/>
				)}

				{isTimeline && isMainMedia && role === 'showcase' && (
					<div css={timelineBulletStyles} aria-hidden="true" />
				)}
				{!isUndefined(starRating) ? (
					<PositionStarRating rating={starRating} />
				) : null}
				{!!title && (
					<ImageTitle title={title} role={role} palette={palette} />
				)}
				{isWeb && !isUndefined(element.position) && (
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

	//** TODO: check this is up to date with latest changes */
	if (format.design === ArticleDesign.Gallery && !isMainMedia) {
		return (
			<div
				css={[
					css`
						${until.leftCol} {
							display: flex;
							flex-direction: column-reverse;
						}
					`,
					orientation === 'portrait' &&
						css`
							max-width: calc(0.66666 * 96vh);
						`,
					orientation === 'landscape' &&
						css`
							${from.leftCol} {
								max-width: calc(1.333 * 96vh);
							}
						`,
				]}
			>
				<div
					css={css`
						${from.leftCol} {
							float: left;
							margin-left: -160px;
							width: 140px;
						}
						${from.wide} {
							float: left;
							margin-left: -240px;
							width: 200px;
						}
					`}
				>
					<Caption
						captionText={element.data.caption ?? ''}
						format={format}
						credit={element.data.credit}
						displayCredit={element.displayCredit}
						shouldLimitWidth={shouldLimitWidth}
						isMainMedia={isMainMedia}
					/>
				</div>

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
					{renderingTarget === 'Apps' ? (
						<Island priority="critical">
							<AppsLightboxImage
								elementId={element.elementId}
								role={role}
								format={format}
								master={image.url}
								alt={element.data.alt ?? ''}
								width={imageWidth}
								height={imageHeight}
								loading={loading}
								isMainMedia={isMainMedia}
							/>
						</Island>
					) : (
						<Picture
							role={role}
							format={format}
							master={image.url}
							alt={element.data.alt ?? ''}
							width={imageWidth}
							height={imageHeight}
							loading={loading}
							isMainMedia={isMainMedia}
						/>
					)}

					{!!title && (
						<ImageTitle
							title={title}
							role={role}
							palette={palette}
						/>
					)}

					{isWeb && !isUndefined(element.position) && (
						<LightboxLink
							role={role}
							format={format}
							elementId={element.elementId}
							isMainMedia={isMainMedia}
							position={element.position}
						/>
					)}
				</div>
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
				{renderingTarget === 'Apps' ? (
					<Island priority="critical">
						<AppsLightboxImage
							elementId={element.elementId}
							role={role}
							format={format}
							master={image.url}
							alt={element.data.alt ?? ''}
							width={imageWidth}
							height={imageHeight}
							loading={loading}
							isMainMedia={isMainMedia}
						/>
					</Island>
				) : (
					<Picture
						role={role}
						format={format}
						master={image.url}
						alt={element.data.alt ?? ''}
						width={imageWidth}
						height={imageHeight}
						loading={loading}
						isMainMedia={isMainMedia}
					/>
				)}
				{isTimeline && isMainMedia && role === 'showcase' && (
					<div css={timelineBulletStyles} aria-hidden="true" />
				)}

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
				{!isUndefined(starRating) ? (
					<PositionStarRating rating={starRating} />
				) : null}
				{!!title && (
					<ImageTitle title={title} role={role} palette={palette} />
				)}

				{isWeb && !isUndefined(element.position) && (
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
					padCaption={role === 'showcase' && isTimeline}
				/>
			)}
		</>
	);
};
