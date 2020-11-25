import React from 'react';
import { css, cx } from 'emotion';
import { ImageComponent } from '@root/src/web/components/elements/ImageComponent';

import { from } from '@guardian/src-foundations/mq';
import { Display } from '@root/src/lib/display';
import { decidePosition } from '@root/src/lib/decidePosition';

type Props = {
    display: Display;
    designType: DesignType;
    element: ImageBlockElement;
    pillar: Pillar;
    hideCaption?: boolean;
    title?: string;
};

const decideSpacing = (role: RoleType) => {
    switch (role) {
        case 'supporting':
            return css`
                ${from.tablet} {
                    margin-top: 6px;
                    margin-bottom: 12px;
                }
            `;
        case 'thumbnail':
            return css`
                margin-bottom: 0;
                margin-top: 6px;
            `;
        case 'halfWidth':
        case 'immersive':
        case 'showcase':
        case 'inline':
        default:
            return css`
                margin-top: 12px;
                margin-bottom: 12px;
            `;
    }
};

export const ImageBlockComponent = ({
    display,
    designType,
    element,
    pillar,
    hideCaption,
    title,
}: Props) => {
    const { role } = element;
    return (
        <div className={cx(decidePosition(role), decideSpacing(role))}>
            <ImageComponent
                display={display}
                designType={designType}
                element={element}
                pillar={pillar}
                hideCaption={hideCaption}
                role={role}
                title={title}
            />
        </div>
    );
};
