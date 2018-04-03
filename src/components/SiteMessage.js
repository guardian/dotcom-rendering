// @flow
import styled from 'preact-emotion';
import { transparentize } from 'polished';

import pallete from 'pasteup/palette';
import CloseButton from 'components/buttons/Close';

const Overlay = styled('div')(({ foregroundColor, backgroundColor }) => ({
    backgroundColor: transparentize(0.03, backgroundColor),
    color: foregroundColor,
    fill: foregroundColor,
    width: ' 100%',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    display: 'flex',
    justifyContent: 'space-between',
}));

export default function({
    children,
    foregroundColor = 'white',
    backgroundColor = pallete.neutral[1],
}) {
    return (
        <Overlay
            foregroundColor={foregroundColor}
            backgroundColor={backgroundColor}
        >
            {children}
            <CloseButton
                foregroundColor={foregroundColor}
                backgroundColor={backgroundColor}
            />
        </Overlay>
    );
}
