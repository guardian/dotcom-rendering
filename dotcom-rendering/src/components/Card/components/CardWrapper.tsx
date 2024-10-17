import { css } from '@emotion/react';
import {
	palette as sourcePalette,
	space,
	until,
} from '@guardian/source/foundations';
import type { ArticleFormat } from '../../../lib/articleFormat';
import { palette } from '../../../palette';
import type { DCRContainerPalette } from '../../../types/front';
import { ContainerOverrides } from '../../ContainerOverrides';
import { FormatBoundary } from '../../FormatBoundary';

type Props = {
	children: React.ReactNode;
	format: ArticleFormat;
	containerPalette?: DCRContainerPalette;
	showTopBarDesktop?: boolean;
	showTopBarMobile?: boolean;
	isOnwardContent?: boolean;
};

const baseCardStyles = css`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	/* We absolutely position the faux link
		so this is required here */
	position: relative;

	/* Target Safari 10.1 */
	/* https://www.browserstack.com/guide/create-browser-specific-css */
	@media not all and (min-resolution: 0.001dpcm) {
		@supports (-webkit-appearance: none) and
			(not (stroke-color: transparent)) {
			display: grid;
			grid-auto-rows: min-content;
			align-content: start;
		}
	}

	/* a tag specific styles */
	color: inherit;
	text-decoration: none;
`;

const hoverStyles = css`
	:hover .image-overlay {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		left: 0;
		background-color: ${sourcePalette.neutral[7]};
		opacity: 0.1;
	}

	/* Only underline the headline element we want to target (not kickers/sublink headlines) */
	:hover .card-headline .show-underline {
		text-decoration: underline;
	}
`;

/** When we hover on sublinks, we want to prevent the general hover styles applying */
const sublinkHoverStyles = css`
	:has(ul.sublinks:hover) {
		.card-headline .show-underline {
			text-decoration: none;
		}
	}
`;

const desktopTopBarStyles = css`
	:before {
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
		${desktopTopBarStyles}
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
	containerPalette,
	showTopBarDesktop = true,
	showTopBarMobile = false,
	isOnwardContent = false,
}: Props) => {
	return (
		<FormatBoundary format={format}>
			<ContainerOverrides containerPalette={containerPalette}>
				<div
					css={[
						baseCardStyles,
						hoverStyles,
						sublinkHoverStyles,
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
