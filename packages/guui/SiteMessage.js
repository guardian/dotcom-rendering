// @flow
import { styled } from '@guardian/guui';
import { transparentize } from 'polished';

import pallete from '@guardian/pasteup/palette';
import CloseButton from '@guardian/guui/buttons/Close';

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

type Props = {
    children: React.Node,
    foregroundColor: string,
    backgroundColor: string,
};

export default function({
    children,
    foregroundColor = 'white',
    backgroundColor = pallete.neutral[1],
}: Props) {
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
