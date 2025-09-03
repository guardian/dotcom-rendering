import { css } from '@emotion/react';
import { from, space, until } from '@guardian/source/foundations';
import type { ArticleFormat } from '../../../lib/articleFormat';
import { palette } from '../../../palette';
import type { DCRContainerPalette } from '../../../types/front';
import { ContainerOverrides } from '../../ContainerOverrides';
import { FormatBoundary } from '../../FormatBoundary';

type Props = {
	children: React.ReactNode;
	format: ArticleFormat;
	showTopBarDesktop: boolean;
	showTopBarMobile: boolean;
	isOnwardContent: boolean;
	containerPalette?: DCRContainerPalette;
};

const baseCardStyles = css`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	/* We absolutely position the faux link so this is required here */
	position: relative;

	/*
	 * Target Safari 10.1 to 14.0
	 * https://www.browserstack.com/guide/create-browser-specific-css
	 * Flexbox with gap is not supported until Safari 14.1
	 */
	@media not all and (min-resolution: 0.001dpcm) {
		@supports (-webkit-appearance: none) and (not (display: flex; gap: 1em)) {
			display: grid;
			grid-auto-rows: min-content;
			align-content: start;
		}
	}

	/* <a /> tag specific styles */
	color: inherit;
	text-decoration: none;
`;

const hoverStyles = css`
	:hover .image-overlay {
		width: 100%;
		height: 100%;
		background-color: ${palette('--card-background-hover')};
	}

	/* Only underline the headline element we want to target (not kickers/sublink headlines) */
	:hover .card-headline .show-underline {
		text-decoration: underline;
	}

	/** We want to prevent the general hover styles applying when
	    a click won't result in navigating to the main article */
	:has(
			ul.sublinks:hover,
			.loop-video-container:hover,
			.slideshow-carousel:hover
		) {
		.card-headline .show-underline {
			text-decoration: none;
		}
		.image-overlay {
			background-color: transparent;
		}
	}
`;

const topBarStyles = css`
	::before {
		border-top: 1px solid ${palette('--card-border-top')};
		content: '';
		z-index: 2;
		width: 100%;
		padding-bottom: ${space[2]}px;
		background-color: unset;
	}
`;
const mobileTopBarStyles = css`
	${until.tablet} {
		${topBarStyles}
	}
`;
const desktopTopBarStyles = css`
	${from.tablet} {
		${topBarStyles}
	}
`;

const onwardContentStyles = css`
	border-radius: ${space[2]}px;
	overflow: hidden;

	:hover .image-overlay {
		border-radius: ${space[2]}px;
	}
`;

export const CardWrapper = ({
	children,
	format,
	showTopBarDesktop,
	showTopBarMobile,
	isOnwardContent,
	containerPalette,
}: Props) => {
	return (
		<FormatBoundary format={format}>
			<ContainerOverrides containerPalette={containerPalette}>
				<div
					css={[
						baseCardStyles,
						hoverStyles,
						showTopBarDesktop && desktopTopBarStyles,
						showTopBarMobile && mobileTopBarStyles,
						isOnwardContent && onwardContentStyles,
					]}
				>
					{children}
				</div>
			</ContainerOverrides>
		</FormatBoundary>
	);
};
