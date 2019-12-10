import React from 'react';
import { css } from 'emotion';

import { until } from '@guardian/src-foundations/mq';

type Props = {
    children: JSXElements;
    percentage?: CardPercentageType;
};

export const ImageWrapper = ({ children, percentage }: Props) => {
    return (
        <div
            className={css`
                flex-basis: ${percentage && percentage};
                ${until.tablet} {
                    /* Until tablet, images are always left and this value pairs with the flex 3 used for content */
                    flex: 1;
                }

                img {
                    width: 100%;
                    display: block;
                }
            `}
        >
            {children}
        </div>
    );
};
