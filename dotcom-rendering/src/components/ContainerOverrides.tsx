import { css } from '@emotion/react';
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
	const { text, background } = containerPalette
		? decideContainerOverrides(containerPalette)
		: { text: undefined, background: undefined };

	const paletteOverrides = {
		'--card-headline-text': isDynamo
			? text?.dynamoHeadline
			: text?.cardHeadline,
		'--card-footer-text': isDynamo
			? text?.dynamoHeadline
			: text?.cardFooter,
		'--card-kicker-text': isDynamo ? text?.dynamoKicker : text?.cardKicker,
		'--card-background': background?.card,
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
