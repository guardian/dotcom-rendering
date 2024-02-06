import { css } from '@emotion/react';
import { log, timeAgo } from '@guardian/libs';
import {
	from,
	headline,
	palette,
	space,
	textSans,
	until,
	visuallyHidden,
} from '@guardian/source-foundations';
import { Hide, Link } from '@guardian/source-react-components';
import { StarRating } from '@guardian/source-react-components-development-kitchen';
import { useEffect, useState } from 'react';
import type { ImageForLightbox } from '../types/content';
import { LightboxCaption } from './LightboxCaption';
import { LightboxLoader } from './LightboxLoader';
import { Picture } from './Picture';

type Props = {
	format: ArticleFormat;
	images: ImageForLightbox[];
};

const liStyles = css`
	width: 100%;
	flex-shrink: 0;
	scroll-snap-align: start;
`;

const imageStyles = (orientation: 'landscape' | 'portrait') => {
	const baseImgStyles = css`
		object-fit: contain;
		object-position: top;
		${until.tablet} {
			object-position: center;
		}
		margin-left: auto;
		margin-right: auto;
		${from.tablet} {
			margin-top: 1vh;
		}
	`;
	switch (orientation) {
		case 'portrait': {
			return css`
				img {
					${baseImgStyles}
					width: auto;
					max-width: 100%;
					height: 100vh;
					${from.tablet} {
						height: 98vh;
					}
				}
			`;
		}
		case 'landscape':
		default: {
			return css`
				img {
					${baseImgStyles}
					width: 100%;
					height: auto;
					max-height: 100vh;
					${from.tablet} {
						max-height: 98vh;
					}
				}
			`;
		}
	}
};

const pictureStyles = css`
	picture {
		${until.tablet} {
			display: flex;
			align-items: center;
		}
		flex-grow: 1;
		${from.tablet} {
			margin-right: ${space[5]}px;
		}
	}
`;

const asideStyles = css`
	${until.tablet} {
		width: 100%;
		margin-top: ${space[3]}px;
		position: absolute;
		bottom: 0;
		left: 0;
	}
	${from.tablet} {
		min-width: 300px;
		max-width: 300px;
	}
	${until.tablet} {
		border-top: 1px solid ${palette.neutral[20]};
	}
	${from.tablet} {
		border-left: 1px solid ${palette.neutral[20]};
	}
	background-color: ${palette.neutral[7]};

	padding: ${space[3]}px;

	${from.tablet} {
		padding-left: ${space[5]}px;
		padding-right: ${space[5]}px;
	}
`;

const figureStyles = css`
	display: flex;
	position: relative;
	width: 100%;
	height: 100%;
	justify-content: space-between;

	flex-direction: column;

	${from.tablet} {
		flex-direction: row;
	}
`;

const Selection = ({
	countOfImages,
	initialPosition = 1,
}: {
	countOfImages: number;
	initialPosition?: number;
}) => {
	return (
		<span
			css={css`
				display: block;
				${from.tablet} {
					text-align: center;
					padding-top: 2.25rem;
					margin-bottom: ${space[1]}px;
				}
				${textSans.xsmall()};
				color: ${palette.neutral[86]};
				${until.tablet} {
					margin-bottom: ${space[2]}px;
				}
			`}
			aria-hidden="true"
			data-testid="lightbox-selected"
		>
			<span className="selected">{initialPosition}</span>
			<span
				css={css`
					margin-left: 1px;
					margin-right: 1px;
				`}
			>
				/
			</span>
			<span
				css={css`
					color: ${palette.neutral[97]};
				`}
			>
				{countOfImages}
			</span>
		</span>
	);
};

export const LightboxImages = ({ format, images }: Props) => {
	const [loaded, setLoaded] = useState(new Set<number>());

	useEffect(() => {
		log('dotcom', '💡 images loaded:', loaded);
	}, [loaded]);

	return (
		<>
			{images.map((image, index) => {
				const orientation =
					image.width > image.height ? 'landscape' : 'portrait';

				const onLoad = () =>
					setLoaded((set) => {
						const previousSize = set.size;
						set.add(image.position);
						const newSize = set.size;
						return previousSize !== newSize ? new Set(set) : set;
					});

				return (
					<li
						// eslint-disable-next-line react/no-array-index-key -- because we know this key is unique
						key={`${image.masterUrl}-${index}`}
						data-index={image.position}
						data-element-id={image.elementId}
						css={[
							liStyles,
							imageStyles(orientation),
							pictureStyles,
						]}
					>
						<figure css={figureStyles}>
							{!loaded.has(image.position) && <LightboxLoader />}
							<Picture
								// Using the role of immersive here indicates the intentions for lightbox
								// images but it's moot because the `isLightbox` prop overrides the decision
								// around what size sources to use
								role="immersive"
								alt={image.alt ?? ''}
								// Height and width are only used here so the browser has a ratio to work with
								// when laying out the page. The actual size of the image is based on the
								// viewport
								height={image.height}
								width={image.width}
								master={image.masterUrl}
								format={format}
								isLightbox={true}
								orientation={orientation}
								onLoad={onLoad}
								loading="lazy"
							/>
							<aside css={asideStyles}>
								{!!image.title && (
									<h2
										css={css`
											width: 100%;
											${headline.xsmall({
												fontWeight: 'light',
											})}
											color: ${palette.neutral[100]};
											margin-bottom: ${space[1]}px;
											${from.tablet} {
												margin-bottom: ${space[2]}px;
											}
										`}
									>
										{image.title}
									</h2>
								)}
								{typeof image.starRating === 'number' && (
									<div
										css={css`
											display: inline-block;
											background-color: ${palette
												.brandAlt[400]};
											margin-bottom: ${space[2]}px;
											${from.tablet} {
												margin-bottom: ${space[3]}px;
											}
											figcaption {
												height: 0;
											}
										`}
									>
										<StarRating
											size="medium"
											rating={image.starRating}
										/>
									</div>
								)}
								<Hide from="tablet">
									<Selection
										countOfImages={images.length}
										initialPosition={image.position}
									/>
								</Hide>
								<LightboxCaption
									captionText={image.caption}
									format={format}
									credit={image.credit}
									displayCredit={image.displayCredit}
								/>
								{!!image.blockId &&
									image.firstPublished !== undefined && (
										<Link
											href={`?page=with:block-${image.blockId}#block-${image.blockId}`}
											priority="secondary"
											cssOverrides={css`
												${textSans.xsmall()};
												color: ${palette.neutral[60]};
												:hover {
													color: ${palette
														.neutral[86]};
												}
											`}
										>
											<time
												dateTime={new Date(
													image.firstPublished,
												).toISOString()}
												title="View original post"
											>
												<span
													css={css`
														${visuallyHidden}
													`}
												>
													Original post published{' '}
												</span>
												{timeAgo(image.firstPublished)}
											</time>
										</Link>
									)}
							</aside>
						</figure>
					</li>
				);
			})}
		</>
	);
};
