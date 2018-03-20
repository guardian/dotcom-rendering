// @flow
import styled from 'preact-emotion';
import { transparentize } from 'polished';
import pallete from 'pasteup/palette';
import { headline } from 'pasteup/fonts';

import CloseButton from 'components/buttons/Close';

const yellow = pallete.yellow.medium;
const black = pallete.neutral[2];

const Overlay = styled('div')({
    backgroundColor: transparentize(0.03, yellow),
    width: ' 100%',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    display: 'flex',
    justifyContent: 'space-between',
});

const Content = styled('div')({
    fontFamily: headline,
    lineHeight: 1.3,
    flexBasis: 630,
    paddingRight: 20,
    strong: {
        fontWeight: 700,
    },
});

export default function Epic({ children }) {
    return (
        <Overlay>
            <Content>{children}</Content>
            <CloseButton foregroundColor={black} backgroundColor={yellow} />
        </Overlay>
    );
}
