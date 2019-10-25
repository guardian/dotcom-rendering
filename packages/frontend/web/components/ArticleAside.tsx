import React from 'react';
import { css } from 'emotion';

import { from } from '@guardian/src-utilities';
import { AdSlot } from '@frontend/web/components/AdSlot';
import { namedAdSlotParameters } from '@frontend/model/advertisement';

const secondaryColumn = css`
    position: absolute;
    top: 0;
    right: 0;
    margin-right: 20px;
    width: 300px;
    margin-left: 20px;
    margin-top: 6px;

    min-height: 300px;
    display: none;

    ${from.desktop} {
        display: block;
    }
`;

const adSlotWrapper = css`
    position: static;
    height: 1059px;
`;

const stickyAdSlot = css`
    position: sticky;
    top: 0;
`;

type Props = {
    config: ConfigType;
};
export const ArticleAside = ({ config }: Props) => {
    return (
        <div className={secondaryColumn}>
            <div className={adSlotWrapper}>
                <AdSlot
                    asps={namedAdSlotParameters('right')}
                    config={config}
                    className={stickyAdSlot}
                />
            </div>
        </div>
    );
};
