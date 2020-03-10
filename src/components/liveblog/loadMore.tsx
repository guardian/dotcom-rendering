import React from 'react';
import { Pillar } from 'pillar';
import { SvgPlus } from "@guardian/src-svgs"
// import { ThemeProvider } from 'emotion-theming'
import { Button } from '@guardian/src-button'

interface Props {
    pillar: Pillar;
    onLoadMore: () => void;
}

const LiveblogLoadMore = ({ pillar, onLoadMore }: Props): JSX.Element => {
    return (
        <Button onClick={onLoadMore} iconSide="left" icon={<SvgPlus />}>
            View more updates
        </Button>
    )
}

export default LiveblogLoadMore;
