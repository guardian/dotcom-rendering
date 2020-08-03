import React from 'react';
import { pillarColours } from 'pillarStyles';
import { Pillar } from '@guardian/types/Format';
import { SvgPlus } from "@guardian/src-icons"
import { ThemeProvider } from 'emotion-theming'
import { Button } from '@guardian/src-button'

interface Props {
    pillar: Pillar;
    onLoadMore: () => Promise<void>;
}

const LiveblogLoadMore = ({ pillar, onLoadMore }: Props): JSX.Element => {
    const theme = {
        button: {
            textPrimary: pillarColours[pillar].soft,
            backgroundPrimary: pillarColours[pillar].kicker,
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Button onClick={onLoadMore} iconSide="left" icon={<SvgPlus />}>
                View more updates
            </Button>
        </ThemeProvider>
    )
}

export default LiveblogLoadMore;
