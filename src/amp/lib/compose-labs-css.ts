import { Special } from '@guardian/types';

export const composeLabsCSS = (
	pillar: Theme,
	baseCSS: string,
	labsCSS: string,
): string | string[] =>
	pillar === Special.Labs ? [baseCSS, labsCSS] : baseCSS;
