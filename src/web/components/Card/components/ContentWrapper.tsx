import React from 'react';
import { css, cx } from 'emotion';

import { until } from '@guardian/src-foundations/mq';

const sizingStyles = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const coverageStyles = (percentage?: string) => {
    return percentage
        ? css`
              flex-basis: ${percentage};
              ${until.tablet} {
                  flex-basis: 75%;
              }
          `
        : css`
              flex-grow: 1;
              ${until.tablet} {
                  /* This value pairs with the flex 1 used if there is an image */
                  flex: 3;
              }
          `;
};

type Props = {
    children: JSXElements;
    percentage?: CardPercentageType;
};

export const ContentWrapper = ({ children, percentage }: Props) => (
    <div className={cx(sizingStyles, coverageStyles(percentage))}>
        {children}
    </div>
);
