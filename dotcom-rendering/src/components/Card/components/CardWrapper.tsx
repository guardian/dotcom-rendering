import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import {
	from,
	palette as sourcePalette,
	space,
} from '@guardian/source/foundations';
import { palette } from '../../../palette';
import type { DCRContainerPalette } from '../../../types/front';
import { ContainerOverrides } from '../../ContainerOverrides';
import { FormatBoundary } from '../../FormatBoundary';

type Props = {
	children: React.ReactNode;
	format: ArticleFormat;
	containerPalette?: DCRContainerPalette;
	showTopBar?: boolean;
	/** The first card in a dynamic package is ”Dynamo” and gets special styling */
	isDynamo?: true;
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

	:hover h3 > span {
		text-decoration: underline;
		text-underline-position: under;
		text-underline-offset: 0.05rem;
	}
`;

/* Styling for top bar */
const baseTopBarStyles = css`
	border-top: 1px solid ${palette('--card-border-top')};
	content: '';
	z-index: 2;
	width: 100%;
	margin-bottom: ${space[2]}px;
`;

const topBarStyles = css`
	:before {
		${baseTopBarStyles}
	}
`;

const topBarDynamoStyles = css`
	:before {
		${baseTopBarStyles}
		${from.phablet} {
			width: 25%;
		}
	}
`;

export const CardWrapper = ({
	children,
	format,
	containerPalette,
	isDynamo,
	showTopBar = true,
	isOnwardContent = false,
}: Props) => {
	return (
		<FormatBoundary format={format}>
			<ContainerOverrides
				containerPalette={containerPalette}
				isDynamo={!!isDynamo}
			>
				<div
					css={[
						baseCardStyles,
						hoverStyles,
						showTopBar &&
							(isDynamo ? topBarDynamoStyles : topBarStyles),
					]}
					// Dynamic styles are better in the style prop
					style={{
						borderRadius: `${isOnwardContent ? space[2] : 0}px`,
						backgroundColor: `${
							isOnwardContent
								? palette('--onward-content-card-background')
								: palette('--card-background')
						}`,
					}}
				>
					{children}
				</div>
			</ContainerOverrides>
		</FormatBoundary>
	);
};
