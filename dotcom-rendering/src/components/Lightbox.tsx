import { css, Global } from '@emotion/react';
import { timeAgo } from '@guardian/libs';
import {
	brandAltBackground,
	from,
	headline,
	neutral,
	space,
	textSans,
	until,
	visuallyHidden,
} from '@guardian/source-foundations';
import {
	Hide,
	Link,
	SvgArrowLeftStraight,
	SvgArrowRightStraight,
	SvgCross,
} from '@guardian/source-react-components';
import { StarRating } from '@guardian/source-react-components-development-kitchen';
import { getZIndex } from '../lib/getZIndex';
import type { EnhancedImageForLightbox } from '../types/content';
import { Caption } from './Caption';
import { getLargest, getMaster } from './ImageComponent';
import { Picture } from './Picture';

type Props = {
	format: ArticleFormat;
	images: EnhancedImageForLightbox[];
};

const lightboxStyles = css`
	width: 100vw;
	height: 100%;
	border: none;
	max-width: 100vw;
	max-height: 100vh;
	padding: 0;
	background-color: ${neutral[10]};

	&.hide-info {
		/* Always hide the info aside when the hide-info class exists on the lightbox element */
		aside {
			display: none;
		}
		${until.tablet} {
			/* Also hide the nav controls when on mobile */
			nav {
				visibility: hidden;
			}
		}
	}

	button.active {
		background-color: ${neutral[46]};
	}

	button.reveal {
		visibility: visible;
	}
`;

const containerStyles = css`
	display: flex;
	height: 100%;
	flex-direction: row;
	${until.tablet} {
		flex-direction: column;
	}
`;

const navStyles = css`
	display: flex;
	flex-direction: column;
	${until.tablet} {
		flex-direction: row;
		position: absolute;
		z-index: 1;
		width: 100%;
	}
	${from.tablet} {
		padding-top: ${space[1]}px;
		padding-left: ${space[4]}px;
		padding-right: ${space[4]}px;
		height: 100vh;
	}
	color: white;
	${until.tablet} {
		border-bottom: 1px solid ${neutral[20]};
	}
	${from.tablet} {
		border-left: 1px solid ${neutral[20]};
	}
	background-color: ${neutral[7]};
`;

const ulStyles = css`
	display: flex;
	height: 100%;
	scroll-snap-type: x mandatory;
	overflow-x: scroll;
	scroll-behavior: auto;
	overscroll-behavior: contain;
	${from.tablet} {
		margin-left: ${space[5]}px;
	}
	/**
	 * Hide scrollbars
	 * See: https://stackoverflow.com/a/38994837
	 *
	 * Removing the scrollbars here is okay because we offer multiple other methods for
	 * navigation which are obvious and accessible to readers
	 */
	::-webkit-scrollbar {
		display: none; /* Safari and Chrome */
	}
	scrollbar-width: none; /* Firefox */
`;

const liStyles = css`
	width: 100%;
	flex-shrink: 0;
	scroll-snap-align: start;
`;

const imageStyles = (orientation: 'landscape' | 'portrait') => {
	switch (orientation) {
		case 'portrait': {
			return css`
				img {
					object-fit: contain;
					object-position: top;
					${until.tablet} {
						object-position: center;
					}
					width: auto;
					max-width: 100%;
					margin-left: auto;
					margin-right: auto;
					height: calc(100vh - 90px);
					${from.tablet} {
						margin-top: ${space[3]}px;
						height: calc(100vh - 24px);
					}
				}
			`;
		}
		case 'landscape':
		default: {
			return css`
				img {
					object-fit: contain;
					object-position: top;
					${until.tablet} {
						object-position: center;
					}
					width: 100%;
					height: auto;
					margin-left: auto;
					margin-right: auto;
					margin-top: ${space[3]}px;
					max-height: calc(100vh - 90px);
					${from.tablet} {
						max-height: calc(100vh - 24px);
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
		border-top: 1px solid ${neutral[20]};
	}
	${from.tablet} {
		border-left: 1px solid ${neutral[20]};
	}
	background-color: ${neutral[7]};

	padding-left: ${space[3]}px;
	padding-right: ${space[3]}px;
	padding-top: ${space[3]}px;
	padding-bottom: ${space[3]}px;

	${from.tablet} {
		padding-left: ${space[5]}px;
		padding-right: ${space[5]}px;
	}
`;

const figureStyles = css`
	display: flex;
	position: relative;
	height: 100%;
	justify-content: space-between;

	${until.tablet} {
		flex-direction: column;
	}
	${from.tablet} {
		flex-direction: row;
	}
`;

const buttonStyles = css`
	svg {
		fill: ${neutral[100]};
		margin-top: 3px;
	}
	margin-top: ${space[2]}px;
	margin-bottom: ${space[2]}px;
	${until.tablet} {
		margin-left: ${space[2]}px;
	}
	border-radius: 50%;
	height: 44px;
	width: 44px;
	border: none;
	cursor: pointer;
	transition: background-color 0.2s;
	background-color: ${neutral[20]};
	:hover {
		background-color: ${neutral[46]};
	}
`;

const closeButtonStyles = css`
	${until.tablet} {
		position: absolute;
		right: ${space[2]}px;
	}
	svg {
		height: 24px;
		width: 24px;
	}
`;

const arrowButtonStyles = css`
	svg {
		height: 24px;
		width: 24px;
	}
	${from.tablet} {
		svg {
			height: 32px;
			width: 32px;
		}
	}
`;

const infoButtonStyles = css`
	svg {
		height: 24px;
		width: 24px;
	}
`;

const SvgInfo = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="9"
		height="24"
		viewBox="0 0 9 24"
	>
		<path
			fill={neutral[100]}
			d="M.3 22L3.9 9.1H1.3l.4-1.4 5.6-.9.3.3-4.4 14.8H6L5.6 23c-.9.4-2.8.9-4.1.9-1.1 0-1.7-.5-1.2-1.9zM5.5 2C5.5.9 6.4.1 7.3.1c1 0 1.6.7 1.6 1.5 0 1.1-.9 1.9-1.8 1.9-1 .1-1.6-.6-1.6-1.5z"
		/>
	</svg>
);

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
				color: ${neutral[86]};
				${until.tablet} {
					margin-bottom: ${space[2]}px;
				}
			`}
			aria-hidden="true"
			data-cy="lightbox-selected"
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
					color: ${neutral[97]};
				`}
			>
				{countOfImages}
			</span>
		</span>
	);
};

export const Lightbox = ({ format, images }: Props) => {
	if (images.length == null || images.length === 0) return null;

	return (
		<>
			<Global
				styles={css`
					html.lightbox-open {
						overflow: hidden;

						#gu-lightbox {
							position: fixed;
							${getZIndex('lightbox')};
						}
					}
				`}
			/>
			<div
				css={lightboxStyles}
				id="gu-lightbox"
				aria-modal="true"
				role="dialog"
				hidden={true}
			>
				<div css={containerStyles}>
					<ul
						id="lightbox-images"
						css={ulStyles}
						aria-label="All images"
					>
						{images.map((image, index) => {
							// Legacy images do not have a master so we fallback to the largest available
							const master =
								getMaster(image.media.allImages) ??
								getLargest(image.media.allImages);

							if (!master) return null;

							const width = master.fields.width;
							const height = master.fields.height;

							const orientation =
								parseInt(width) > parseInt(height)
									? 'landscape'
									: 'portrait';

							return (
								<li
									// eslint-disable-next-line react/no-array-index-key -- because we know this key is unique
									key={`${master.url}-${index}`}
									data-index={index + 1}
									data-element-id={image.elementId}
									css={[
										liStyles,
										imageStyles(orientation),
										pictureStyles,
									]}
								>
									<figure css={figureStyles}>
										<Picture
											// Using the role of immersive here indicates the intentions for lightbox
											// images but it's moot because the `isLightbox` prop overrides the decision
											// around what size sources to use
											role="immersive"
											alt={image.data.alt ?? ''}
											// Height and width are only used here so the browser has a ratio to work with
											// when laying out the page. The actual size of the image is based on the
											// viewport
											height={height}
											width={width}
											master={master.url}
											format={format}
											isLightbox={true}
											orientation={orientation}
										/>
										<aside css={asideStyles}>
											{!!image.title && (
												<h2
													css={css`
														width: 100%;
														${headline.xsmall({
															fontWeight: 'light',
														})}
														color: ${neutral[100]};
														margin-bottom: ${space[1]}px;
														${from.tablet} {
															margin-bottom: ${space[2]}px;
														}
													`}
												>
													{image.title}
												</h2>
											)}
											{typeof image.starRating ===
												'number' && (
												<div
													css={css`
														display: inline-block;
														background-color: ${brandAltBackground.primary};
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
														rating={
															image.starRating
														}
													/>
												</div>
											)}
											<Hide from="tablet">
												<Selection
													countOfImages={
														images.length
													}
													initialPosition={index + 1}
												/>
											</Hide>
											<Caption
												format={format}
												isLightbox={true}
												captionText={
													image.lightbox?.caption ??
													image.data.alt
												}
												credit={image.lightbox?.credit}
												displayCredit={
													image.displayCredit
												}
											/>
											{!!image.blockId &&
												image.firstPublished !==
													undefined && (
													<Link
														href={`?page=with:block-${image.blockId}#block-${image.blockId}`}
														priority="secondary"
														cssOverrides={css`
															${textSans.xsmall()};
															color: ${neutral[60]};
															:hover {
																color: ${neutral[86]};
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
																Original post
																published{' '}
															</span>
															{timeAgo(
																image.firstPublished,
															)}
														</time>
													</Link>
												)}
										</aside>
									</figure>
								</li>
							);
						})}
					</ul>
					<nav css={navStyles}>
						<button
							type="button"
							css={[buttonStyles, closeButtonStyles]}
							className="close"
							title="Close [ESC or Q]"
						>
							<SvgCross isAnnouncedByScreenReader={false} />
							<span
								css={css`
									${visuallyHidden}
								`}
							>
								Close dialogue
							</span>
						</button>
						<Hide until="tablet">
							<Selection countOfImages={images.length} />
						</Hide>
						<button
							type="button"
							css={[
								buttonStyles,
								arrowButtonStyles,
								css`
									order: 1;
									${until.tablet} {
										order: 2;
									}
								`,
							]}
							className="next"
							title="Next image [→]"
						>
							<SvgArrowRightStraight
								isAnnouncedByScreenReader={false}
							/>
							<span
								css={css`
									${visuallyHidden}
								`}
							>
								Next image
							</span>
						</button>
						<button
							type="button"
							css={[
								buttonStyles,
								arrowButtonStyles,
								css`
									order: 2;
									${until.tablet} {
										order: 1;
									}
								`,
							]}
							className="previous"
							title="Previous image [←]"
						>
							<SvgArrowLeftStraight
								isAnnouncedByScreenReader={false}
							/>
							<span
								css={css`
									${visuallyHidden}
								`}
							>
								Previous image
							</span>
						</button>
						<button
							type="button"
							css={[
								buttonStyles,
								infoButtonStyles,
								css`
									order: 3;
								`,
							]}
							className="info"
							title="Toggle caption [i]"
						>
							<SvgInfo />
							<span
								css={css`
									${visuallyHidden}
								`}
							>
								Toggle caption
							</span>
						</button>
					</nav>
				</div>
			</div>
		</>
	);
};
