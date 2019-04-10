import React from 'react';
import { css } from 'emotion';
import CloseIcon from '@guardian/pasteup/icons/x.svg';
import { palette, Appearances } from '@guardian/pasteup/palette';

type contrastKeys = keyof Appearances['contrasts'];

const closeButton = (contrast: contrastKeys) => css`
    border-color: ${palette.contrasts[contrast].foreground};
    fill: ${palette.contrasts[contrast].foreground};
    border-width: 1px;
    border-style: solid;
    background-color: ${palette.contrasts[contrast].background};
    border-radius: 50%;
    height: 32px;
    width: 32px;
    min-width: 32px;
    padding: 6px;
    cursor: pointer;
    :hover {
        fill: ${palette.contrasts[contrast].background};
        background-color: ${palette.contrasts[contrast].foreground};
    }
`;

export const CloseButton: React.FC<{
    contrast: contrastKeys;
}> = ({ contrast }) => <CloseIcon className={closeButton(contrast)} />;
