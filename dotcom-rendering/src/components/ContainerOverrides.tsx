import { css } from '@emotion/react';
import { palette as sourcePalette } from '@guardian/source/foundations';
import { decideContainerOverrides } from '../lib/decideContainerOverrides';
import type { palette } from '../palette';
import type { DCRContainerPalette } from '../types/front';

type Props = {
	children: React.ReactNode;
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
export const ContainerOverrides = ({ containerPalette, children }: Props) => {
	const { text, background, border } = containerPalette
		? decideContainerOverrides(containerPalette)
		: {
				text: undefined,
				background: undefined,
				border: undefined,
		  };

	const paletteOverrides = {
		'--front-container-title': text?.container,
		'--front-container-background': background?.container,
		// '--card-border': border?.card,
		'--front-container-border': border?.container,
		'--card-background': background?.card,
		'--card-headline-trail-text': text?.cardHeadline,
		'--card-footer-text': text?.cardFooter,
		'--card-kicker-text': text?.cardKicker,
		'--kicker-text-live': text?.liveKicker,
		'--kicker-background-live': background?.liveKicker,
		'--kicker-pulsing-dot-live': background?.pulsingDot,
		'--byline': text?.cardByline,
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
