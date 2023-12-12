import { css } from '@emotion/react';
import { palette as sourcePalette } from '@guardian/source-foundations';
import { decideContainerOverrides } from '../lib/decideContainerOverrides';
import type { palette } from '../palette';
import type { DCRContainerPalette } from '../types/front';

type Props = {
	children: React.ReactNode;
	isDynamo: boolean;
	containerPalette?: DCRContainerPalette;
};

/** @see https://developer.mozilla.org/en-US/docs/Web/CSS/display-box#contents */
const displayContents = css`
	display: contents;
`;

type ColourName = Parameters<typeof palette>[0];

/**
 * Add CSS custom property overrides for palette colours in a given container
 */
export const ContainerOverrides = ({
	containerPalette,
	isDynamo,
	children,
}: Props) => {
	const { text, background, topBar, border } = containerPalette
		? decideContainerOverrides(containerPalette)
		: {
				text: undefined,
				background: undefined,
				topBar: undefined,
				border: undefined,
		  };

	const paletteOverrides = {
		'--card-headline-trail-text': isDynamo
			? text?.dynamoHeadline
			: text?.cardHeadline,
		'--card-footer-text': isDynamo
			? text?.dynamoHeadline
			: text?.cardFooter,
		'--card-kicker-text': isDynamo ? text?.dynamoKicker : text?.cardKicker,
		'--card-background': isDynamo ? 'transparent' : background?.card,
		'--byline': text?.cardByline,
		'--card-border-top': isDynamo ? text?.dynamoKicker : topBar?.card,
		'--carousel-text': text?.container,
		'--carousel-title-highlight': text?.container,
		'--carousel-border': border?.lines,
		'--carousel-dot': sourcePalette.neutral[93],
		'--carousel-dot-hover': sourcePalette.neutral[86],
		'--carousel-active-dot': background?.carouselDot,
		'--carousel-arrow': border?.carouselArrow,
		'--carousel-arrow-background': background?.carouselArrow,
		'--carousel-arrow-background-hover': background?.carouselArrowHover,
	} satisfies Partial<Record<ColourName, string>>;

	return (
		<div
			data-container-palette={containerPalette}
			css={[displayContents]}
			style={paletteOverrides}
		>
			{children}
		</div>
	);
};
