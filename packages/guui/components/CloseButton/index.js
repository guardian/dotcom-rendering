// @flow
import { css } from 'react-emotion';
import CloseIcon from '@guardian/pasteup/icons/x.svg';

const closeButton = (foregroundColor, backgroundColor) => css`
    border-color: ${foregroundColor};
    fill: ${foregroundColor};
    border-width: 1px;
    border-style: solid;
    background-color: ${backgroundColor};
    border-radius: 50%;
    height: 32px;
    width: 32px;
    min-width: 32px;
    padding: 6px;
    cursor: pointer;
    :hover {
        fill: ${backgroundColor};
        background-color: ${foregroundColor};
    }
`;

type Props = {
    foregroundColor: string,
    backgroundColor: string,
};

const CloseButton = ({ foregroundColor, backgroundColor }: Props) => (
    <CloseIcon className={closeButton(foregroundColor, backgroundColor)} />
);

export default CloseButton;
