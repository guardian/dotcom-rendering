import React from 'react';
import { css } from 'emotion';
import { headline, textSans } from '@guardian/pasteup/typography';
import { palette } from '@guardian/pasteup/palette';
import { AmpSubscriptionGoogle } from '@frontend/amp/components/elements/AmpSubscriptionGoogle';
import { EpicBlockComponent } from '@frontend/amp/components/elements/EpicBlockComponent';

// styles
const container = css`
    position: relative;
    border-top: 0.0625rem solid ${palette.highlight.main};
    background-color: ${palette.neutral[97]};
    margin-top: 1.5rem;
    padding: 0.25rem 0.3125rem 0.75rem;
`;

export const Epic: React.FC<{ content: EpicContent }> = ({ content }) => {
    return (
        <div amp-access="showEpic">
            <div className={container}>
                {content.map(EpicBlockComponent)}
                <AmpSubscriptionGoogle />
            </div>
        </div>
    );
};
