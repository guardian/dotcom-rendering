// @flow
import { styled } from '@guardian/guui';
import pallete from '@guardian/pasteup/palette';
import { headline } from '@guardian/pasteup/fonts';

import SiteMessage from '@guardian/guui/SiteMessage';

const Content = styled('div')({
    fontFamily: headline,
    lineHeight: 1.3,
    flexBasis: 630,
    paddingRight: 20,
    strong: {
        fontWeight: 700,
    },
});

type Props = {
    children: React$Node,
};

export default function Epic({ children }: Props) {
    return (
        <SiteMessage
            foregroundcolor={pallete.neutral[2]}
            backgroundcolor={pallete.yellow.medium}
        >
            <Content>{children}</Content>
        </SiteMessage>
    );
}
