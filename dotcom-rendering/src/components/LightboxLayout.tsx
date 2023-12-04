import { css, Global } from '@emotion/react';
import {
	from,
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
import { getZIndex } from '../lib/getZIndex';

type Props = {
	imageCount: number;
};

const lightboxStyles = css`
	width: 100%;
	height: 100%;
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
	width: 100%;
	scroll-snap-type: x mandatory;
	overflow-x: scroll;
	overflow-y: hidden;
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
					color: ${neutral[97]};
				`}
			>
				{countOfImages}
			</span>
		</span>
	);
};

export const LightboxLayout = ({ imageCount }: Props) => {
	return (
		<>
			<Global
				styles={css`
					html.lightbox-open {
						#gu-lightbox {
							position: fixed;
							${getZIndex('lightbox')};
						}

						body {
							/* This ensures the menu and sidebars on iPhones have the same background as lightbox */
							background-color: ${neutral[10]};
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
					></ul>
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
							<Selection countOfImages={imageCount} />
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
