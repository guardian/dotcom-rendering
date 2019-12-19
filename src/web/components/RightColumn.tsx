import React from 'react';
import { css, cx } from 'emotion';
import { until } from '@guardian/src-foundations/mq';

const rightColumnContainerStyles = css`
    position: relative; /* so that the content can be flow out of this placeholder */
    height: 0px; /* acts as a placeholder for the real column */
    margin-left: auto; /* justifies self to right side */
    max-width: 300px;

    flex-basis: 300px;
    order: 3;

    ${until.leftCol} {
        order: 0;
        right: -320px;
    }

    ${until.desktop} {
        display: none;
    }
`;

const showcaseLayout = css`
    order: 6;

    ${until.leftCol} {
        order: 4;
    }
`;

const rightColumnStyles = css`
    position: absolute; /* flow out of container */
    width: 100%;
`;

type Props = {
    children: JSXElements;
    layoutType?: LayoutType;
};

export const RightColumn = ({ children, layoutType }: Props) => {
    return (
        <div
            className={cx(
                rightColumnContainerStyles,
                layoutType === 'Showcase' && showcaseLayout,
            )}
        >
            <section className={rightColumnStyles}>{children}</section>
        </div>
    );
};
