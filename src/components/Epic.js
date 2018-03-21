// @flow
import styled from 'preact-emotion';
import pallete from 'pasteup/palette';
import { headline } from 'pasteup/fonts';

import SiteMessage from 'components/SiteMessage';

const yellow = pallete.yellow.medium;
const black = pallete.neutral[2];

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
        <SiteMessage foregroundColor={black} backgroundColor={yellow}>
            <Content>{children}</Content>
        </SiteMessage>
    );
}
