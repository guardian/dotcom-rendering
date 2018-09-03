import React from 'react';
import { css } from 'react-emotion';
import CloseIcon from '@guardian/pasteup/icons/x.svg';

const closeButton = (foregroundColour: string, backgroundColour: string) => css`
    border-color: ${foregroundColour};
    fill: ${foregroundColour};
    border-width: 1px;
    border-style: solid;
    background-color: ${backgroundColour};
    border-radius: 50%;
    height: 32px;
    width: 32px;
    min-width: 32px;
    padding: 6px;
    cursor: pointer;
    :hover {
        fill: ${backgroundColour};
        background-color: ${foregroundColour};
    }
`;

const CloseButton: React.SFC<{
    foregroundColour: string,
    backgroundColour: string,
}> = ({ foregroundColour, backgroundColour }) => (
    <CloseIcon className={closeButton(foregroundColour, backgroundColour)} />
);

export default CloseButton;
