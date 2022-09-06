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
import type { Palette } from '../../types/palette';
import { decidePalette } from '../lib/decidePalette';
import { Caption } from './Caption';
import { CaptionToggle } from './CaptionToggle';
import { Hide } from './Hide';
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
	isMainMediaTest?: boolean;
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

export const ImageComponent = ({
	element,
	format,
	hideCaption,
	role,
	isMainMedia,
	starRating,
	title,
	isAvatar,
	isMainMediaTest,
}: Props) => {
	const shouldLimitWidth =
		!isMainMedia &&
		(role === 'showcase' || role === 'supporting' || role === 'immersive');
	const isNotOpinion =
		format.design !== ArticleDesign.Comment &&
		format.design !== ArticleDesign.Editorial;

	// We get the first 'media' height and width. This doesn't match the actual image height and width but that's ok
	// because the image sources and CSS deal with the sizing. What the height and width gives us is a true
	// ratio to apply to the image in the page, so the browser's pre-parser can reserve the space.
	//
	// The default is the 5:3 standard that The Grid suggests, at our wide breakpoint width.
	const imageWidth =
		(element.media &&
			element.media.allImages[0] &&
			element.media.allImages[0].fields.width) ||
		'620';
	const imageHeight =
		(element.media &&
			element.media.allImages[0] &&
			element.media.allImages[0].fields.height) ||
		'372';

	const palette = decidePalette(format);

	const getMaster = (images: Image[]) => {
		return images.find((image) => image.fields.isMaster)?.url;
	};
	const getLargest = (images: Image[]) => {
		const descendingByWidth = (a: Image, b: Image) => {
			return parseInt(b.fields.width) - parseInt(a.fields.width);
		};
		return images.slice().sort(descendingByWidth)[0].url;
	};
	// Legacy images do not have a master so we fallback to the largest available
	const image =
		getMaster(element.media.allImages) ??
		getLargest(element.media.allImages);

	const isSupported = (imageUrl: string) => {
		const supportedImages = ['jpg', 'jpeg', 'png'];
		const extension = imageUrl.split('.').slice(-1)[0];
		return extension && supportedImages.includes(extension.toLowerCase());
	};
	if (!isSupported(image)) {
		// We should only try to render images that are supported by Fastly
		return null;
	}

	if (
		isMainMedia &&
		format.display === ArticleDisplay.Immersive &&
		isNotOpinion
	) {
		return (
			<div
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
				`}
			>
				<Picture
					role={role}
					format={format}
					master={image}
					alt={element.data.alt || ''}
					width={imageWidth}
					height={imageHeight}
					isLazy={!isMainMedia}
					isMainMedia={isMainMedia}
				/>
				{!!title && (
					<ImageTitle title={title} role={role} palette={palette} />
				)}
			</div>
		);
	}

	if (hideCaption) {
		return (
			<div
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
					master={image}
					alt={element.data.alt || ''}
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
			</div>
		);
	}

	return (
		<>
			<div
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
					master={image}
					alt={element.data.alt || ''}
					width={imageWidth}
					height={imageHeight}
					isLazy={!isMainMedia}
					isMainMedia={isMainMedia}
				/>
				{isMainMedia && (
					// Below tablet, main media images show an info toggle at the bottom right of
					// the image which, when clicked, toggles the caption as an overlay
					<Hide
						when="above"
						breakpoint={isMainMediaTest ? 'desktop' : 'tablet'}
					>
						<Row>
							<CaptionToggle>
								<Caption
									captionText={element.data.caption || ''}
									format={format}
									credit={element.data.credit}
									displayCredit={element.displayCredit}
									shouldLimitWidth={shouldLimitWidth}
									isOverlaid={true}
									isMainMedia={isMainMedia}
								/>
							</CaptionToggle>
						</Row>
					</Hide>
				)}
				{typeof starRating === 'number' && (
					<PositionStarRating rating={starRating} />
				)}
				{!!title && (
					<ImageTitle title={title} role={role} palette={palette} />
				)}
			</div>
			{isMainMedia ? (
				<Hide
					when="below"
					breakpoint={isMainMediaTest ? 'desktop' : 'tablet'}
				>
					<Caption
						captionText={element.data.caption || ''}
						format={format}
						credit={element.data.credit}
						displayCredit={element.displayCredit}
						shouldLimitWidth={shouldLimitWidth}
						isMainMedia={isMainMedia}
					/>
				</Hide>
			) : (
				<Caption
					captionText={element.data.caption || ''}
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
