// @flow
import styled from 'react-emotion';
import CloseIcon from '@guardian/pasteup/icons/x.svg';

const CloseButton = styled(CloseIcon)(
    ({ foregroundcolor: foregroundColor, backgroundColor }) => ({
        borderColor: foregroundColor,
        fill: foregroundColor,
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor,
        borderRadius: '50%',
        height: 32,
        width: 32,
        minWidth: 32,
        padding: 6,
        cursor: 'pointer',
        ':hover': {
            fill: backgroundColor,
            backgroundColor: foregroundColor,
        },
    }),
);

export default CloseButton;
