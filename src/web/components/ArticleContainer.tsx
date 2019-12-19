import React from 'react';
import { css } from 'emotion';
import { until } from '@guardian/src-foundations/mq';

import { Flex } from '@root/src/web/components/Flex';

const articleContainerStyles = css`
    padding: 0 20px;
    position: relative;

    ${until.leftCol} {
        width: 640px;
        padding-right: 0;
    }

    ${until.desktop} {
        width: 100%;
        padding: 0 20px;
    }

    ${until.phablet} {
        padding: 0;
    }
`;

type Props = {
    children: JSXElements;
    layoutType?: LayoutType;
};

export const ArticleContainer = ({
    children,
    layoutType = 'Standard',
}: Props) => (
    <article className={articleContainerStyles}>
        <Flex wrap="wrap" justify="flex-start">
            {React.Children.map(children, child =>
                React.cloneElement(child, { layoutType }),
            )}
        </Flex>
    </article>
);
