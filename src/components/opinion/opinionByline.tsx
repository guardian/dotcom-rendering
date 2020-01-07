import React from 'react';
import { sidePadding, sans, darkModeCss, basePx } from 'styles';
import { css, SerializedStyles } from '@emotion/core';
import { palette } from '@guardian/src-foundations';
import { formatDate } from 'date';
import { Contributor } from 'capi';
import Follow from 'components/shared/follow';
import { PillarStyles } from 'pillar';

const OpinionBylineStyles = ({ kicker }: PillarStyles): SerializedStyles => css`
    .author {
        margin: ${basePx(1, 0, 2, 0)};

        .follow, a {
            color: ${kicker};
        }

        time, .follow {
            ${sans}
        }

        time {
            font-size: 1.4rem;
            color: ${palette.neutral[46]};
        }
    }
`;

const OpinionBylineDarkStyles = ({ inverted }: PillarStyles): SerializedStyles => darkModeCss`
    background: ${palette.neutral.darkMode};
    color: ${palette.neutral[86]};

    .author {
        .follow, a {
            color: ${inverted};
        }

        time {
            color: ${palette.neutral[60]};
        }
    }
`;

interface OpinionBylineProps {
    pillarStyles: PillarStyles;
    publicationDate: string;
    contributors: Contributor[];
    className: SerializedStyles;
}

const OpinionByline = ({
    pillarStyles,
    publicationDate,
    contributors,
    className,
}: OpinionBylineProps): JSX.Element =>
    <div
        css={[className, OpinionBylineStyles(pillarStyles), OpinionBylineDarkStyles(pillarStyles)]}
    >
        <div css={sidePadding}>
            <div className="author">
                <time>{ formatDate(new Date(publicationDate)) }</time>
                <Follow contributors={contributors} />
            </div>
        </div>
    </div>

export default OpinionByline;
