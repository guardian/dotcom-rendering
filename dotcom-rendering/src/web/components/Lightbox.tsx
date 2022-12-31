import { css, Global } from '@emotion/react';
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
	SvgArrowLeftStraight,
	SvgArrowRightStraight,
	SvgCross,
} from '@guardian/source-react-components';
import { StarRating } from '@guardian/source-react-components-development-kitchen';
import type { ImageBlockElement } from '../../types/content';
import { Caption } from './Caption';
import { getImageDimensions, getLargest, getMaster } from './ImageComponent';
import { Picture } from './Picture';

type Props = {
	format: ArticleFormat;
	images?: ImageBlockElement[];
};

const dialogStyles = css`
	width: 100vw;
	height: 100vh;
	border: none;
	max-width: 100vw;
	max-height: 100vh;
	padding: 0;
	background-color: ${neutral[10]};
	::backdrop {
		background-color: ${neutral[10]};
	}

	ul.hide-info aside {
		display: none;
	}

	button.selected {
		background-color: ${neutral[46]};
	}
`;

const containerStyles = css`
	display: flex;
	height: 100%;
	flex-direction: row-reverse;
	${until.tablet} {
		flex-direction: column;
	}
`;

const navStyles = css`
	display: flex;
	flex-direction: column;
	${until.tablet} {
		flex-direction: row;
	}
	${from.tablet} {
		padding-top: ${space[3]}px;
		height: 100vh;
	}
	color: white;
	${until.tablet} {
		border-bottom: 0.0625rem solid ${neutral[20]};
	}
	${from.tablet} {
		border-left: 0.0625rem solid ${neutral[20]};
	}
	background-color: ${neutral[7]};
`;

const ulStyles = css`
	display: flex;
	height: 100%;
	scroll-snap-type: x mandatory;
	overflow-x: scroll;
	scroll-behavior: auto;
	${from.tablet} {
		margin-left: ${space[5]}px;
	}
`;

const liStyles = css`
	width: 100%;
	flex-shrink: 0;
	scroll-snap-align: start;
`;

const imageStyles = (orientation: 'horizontal' | 'portrait') => {
	switch (orientation) {
		case 'portrait': {
			return css`
				img {
					object-fit: contain;
					object-position: top;
					width: auto;
					max-width: 100%;
					margin-left: auto;
					margin-right: auto;
					margin-top: ${space[3]}px;
					${from.tablet} {
						margin-top: ${space[5]}px;
					}
					${until.tablet} {
						height: calc(100vh - 90px);
					}
					${from.tablet} {
						height: calc(100vh - 24px);
					}
				}
				picture {
					flex-grow: 1;
					${from.tablet} {
						margin-right: ${space[5]}px;
					}
				}
			`;
		}
		case 'horizontal':
		default: {
			return css`
				img {
					object-fit: contain;
					width: 100%;
					height: auto;
					margin-left: auto;
					margin-right: auto;
					margin-top: ${space[3]}px;
					${from.tablet} {
						margin-top: ${space[5]}px;
					}
					${until.tablet} {
						max-height: calc(100vh - 90px);
					}
					${from.tablet} {
						max-height: calc(100vh - 24px);
					}
				}
				picture {
					flex-grow: 1;
					${from.tablet} {
						margin-right: ${space[5]}px;
					}
				}
			`;
		}
	}
};

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
		border-top: 0.0625rem solid ${neutral[20]};
	}
	${from.tablet} {
		border-left: 0.0625rem solid ${neutral[20]};
	}
	background-color: ${neutral[7]};

	padding-left: ${space[3]}px;
	padding-right: ${space[3]}px;
	padding-top: ${space[3]}px;
	padding-bottom: ${space[3]}px;

	${from.tablet} {
		padding-top: ${space[5]}px;
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
	}
	margin: ${space[2]}px;
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
		height: 32px;
		width: 32px;
	}
`;

const infoButtonStyles = css`
	svg {
		height: 24px;
		width: 24px;
	}
`;

const lowlightStyles = css`
	${textSans.xsmall()};
	color: ${neutral[86]};
`;

const highlightedStyles = css`
	${textSans.xsmall()};
	color: ${neutral[97]};
`;

const SvgInfo = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="9"
		height="24"
		viewBox="0 0 9 24"
	>
		<path
			fill="#FFF"
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
				}
				${textSans.xsmall()};
				color: ${neutral[86]};
				${until.tablet} {
					margin-bottom: ${space[2]}px;
				}
			`}
		>
			<span css={highlightedStyles} className="selected">
				{initialPosition}
			</span>
			<span
				css={css`
					margin-left: 1px;
					margin-right: 1px;
				`}
			>
				/
			</span>
			<span css={lowlightStyles}>{countOfImages}</span>
		</span>
	);
};

export const Lightbox = ({ format, images }: Props) => {
	if (!images?.length) return null;

	return (
		<>
			<Global
				styles={css`
					/*
						Remove the article scrollbar whilst the lightbox is open so readers
						have the same scroll position when they return to the page.
					*/
					html:has(dialog#gu-lightbox[open]) {
						overflow: hidden;
					}
					/*
						We're using html.lightbox-open here because Firefox doesn't support has().
						This css (and the associated javascript to add and remove the lightbox-open
						class) can be deleted once it does.
						See: https://developer.mozilla.org/en-US/docs/Web/CSS/:has
					*/
					html.lightbox-open {
						overflow: hidden;
					}
				`}
			/>
			<dialog css={dialogStyles} id="gu-lightbox" aria-modal="true">
				<div css={containerStyles}>
					<nav css={navStyles}>
						<button
							type="button"
							css={[buttonStyles, closeButtonStyles]}
							className="close"
							title="Close [ESC or Q]"
						>
							<SvgCross />
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
							css={[buttonStyles, arrowButtonStyles]}
							className="previous"
							title="Previous image [←]"
						>
							<SvgArrowLeftStraight />
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
							css={[buttonStyles, arrowButtonStyles]}
							className="next"
							title="Next image [→]"
							// eslint-disable-next-line jsx-a11y/no-autofocus -- because it's a dialog and we need to decide this
							autoFocus={true}
						>
							<SvgArrowRightStraight />
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
							css={[buttonStyles, infoButtonStyles]}
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
					<ul css={ulStyles}>
						{images.map((image, index) => {
							// Legacy images do not have a master so we fallback to the largest available
							const master: string | undefined =
								getMaster(image.media.allImages) ??
								getLargest(image.media.allImages);

							if (!master) return null;

							const dimensions = getImageDimensions(image);
							const width = dimensions.width;
							const height = dimensions.height;

							const orientation =
								parseInt(width) > parseInt(height)
									? 'horizontal'
									: 'portrait';

							return (
								<li
									id={`img-${index + 1}`}
									className="active"
									// eslint-disable-next-line react/no-array-index-key -- because we know this key is unique
									key={`${master}-${index}`}
									data-index={index + 1}
									data-element-id={image.elementId}
									css={[liStyles, imageStyles(orientation)]}
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
											master={master}
											format={format}
											isLightbox={true}
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
													image.data.caption ||
													image.data.alt
												}
												credit={image.data.credit}
												displayCredit={
													image.displayCredit
												}
											/>
										</aside>
									</figure>
								</li>
							);
						})}
					</ul>
				</div>
			</dialog>
		</>
	);
};
