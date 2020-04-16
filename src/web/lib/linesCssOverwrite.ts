import { css } from 'emotion';

import { neutralBorder } from '@root/src/lib/pillars';
import { remSpace } from '@guardian/src-foundations';

export const linesCssOverwrite = (pillar: Pillar) => css`
    background-image: repeating-linear-gradient(
        to bottom,
        ${neutralBorder(pillar)},
        ${neutralBorder(pillar)} 1px,
        transparent 1px,
        transparent ${remSpace[1]}
    );
`;
