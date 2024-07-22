import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { containerDeclarations } from '../lib/decideContainerOverrides';
import type { DCRContainerPalette } from '../types/front';
import { useConfig } from './ConfigContext';

type Props = {
	children: React.ReactNode;
	containerPalette?: DCRContainerPalette;
};

/** @see https://developer.mozilla.org/en-US/docs/Web/CSS/display-box#contents */
const displayContents = css`
	display: contents;
`;

/**
 * Add CSS custom property overrides for palette colours in a given container
 */
export const ContainerOverrides = ({ containerPalette, children }: Props) => {
	const { darkModeAvailable } = useConfig();

	const [isStorybook, setIsStorybook] = useState(false);
	useEffect(() => {
		if (!('STORIES' in window)) return;
		setIsStorybook(true);
	}, []);

	if (!containerPalette) return children;

	return (
		<div
			data-container-palette={containerPalette}
			css={[
				displayContents,
				containerDeclarations(containerPalette, 'light'),
				darkModeAvailable &&
					css`
						@media (prefers-color-scheme: dark) {
							${containerDeclarations(containerPalette, 'dark')}
						}
					`,
				isStorybook &&
					css`
						[data-color-scheme='light'] & {
							${containerDeclarations(containerPalette, 'light')}
						}

						[data-color-scheme='dark'] & {
							${containerDeclarations(containerPalette, 'dark')}
						}
					`,
			]}
		>
			{children}
		</div>
	);
};
