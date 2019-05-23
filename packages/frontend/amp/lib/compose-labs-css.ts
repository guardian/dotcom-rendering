import { cx } from 'emotion';

export const composeLabsCSS = (
    pillar: Pillar,
    baseCSS: string,
    labsCSS: string,
): string => (pillar === 'labs' ? cx(baseCSS, labsCSS) : baseCSS);
