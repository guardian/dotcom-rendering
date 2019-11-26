import React from 'react';
import { css } from 'emotion';
import { palette } from '@guardian/src-foundations';
import { headline, textSans } from '@guardian/src-foundations/typography';

const standfirstStyles = css`
    li {
        ${textSans.medium()};
        margin-bottom: 6px;
        padding-left: 20px;

        p {
            display: inline;
        }
    }

    li:before {
        display: inline-block;
        content: '';
        border-radius: 6px;
        height: 12px;
        width: 12px;
        margin-right: 8px;
        background-color: ${palette.neutral[86]};
        margin-left: -20px;
    }

    p {
        margin-bottom: 8px;
    }

    li {
        ${headline.xxxsmall()};
    }
`;

// type SizeType = 'xxxsmall' | 'small' | 'medium';
// type WeightType = 'light' | 'regular' | 'medium' | 'bold';

type Props = {
    pillar: Pillar;
    standfirst: string;
};

export const Standfirst = ({ pillar, standfirst }: Props) => (
    <div // tslint:disable-line:react-no-dangerous-html
        className={standfirstStyles}
        dangerouslySetInnerHTML={{
            __html: standfirst,
        }}
    />
);
