import React from 'react';
import { css } from 'emotion';
import { ImageComponent } from '@root/src/web/components/elements/ImageComponent';

import { from, until } from '@guardian/src-foundations/mq';

type Props = {
    display: Display;
    designType: DesignType;
    element: ImageBlockElement;
    pillar: Pillar;
    hideCaption?: boolean;
    title?: string;
};

const imageCss = {
    inline: css`
        margin-top: 12px;
        margin-bottom: 12px;
    `,

    supporting: css`
        ${from.tablet} {
            position: relative;
            float: left;
            width: 300px;
            margin-top: 6px;
            margin-bottom: 12px;
            margin-right: 20px;
            line-height: 0;
        }
        ${from.leftCol} {
            margin-left: -160px;
        }
        ${from.wide} {
            width: 380px;
            margin-left: -240px;
        }
    `,

    immersive: css`
        margin-top: 12px;
        margin-bottom: 12px;

        ${until.tablet} {
            margin-left: -20px;
            margin-right: -20px;
        }
        ${until.mobileLandscape} {
            margin-left: -10px;
            margin-right: -10px;
        }
        ${from.tablet} {
            margin-left: -20px;
            margin-right: -100px;
        }
        ${from.desktop} {
            margin-left: -20px;
            margin-right: -340px;
        }
        ${from.leftCol} {
            margin-left: -160px;
            margin-right: -320px;
        }
        ${from.wide} {
            margin-left: -240px;
            margin-right: -400px;
        }
    `,

    showcase: css`
        position: relative;
        margin-top: 12px;
        margin-bottom: 12px;
        ${from.leftCol} {
            margin-bottom: 12px;
            margin-left: -160px;
        }
        ${from.wide} {
            margin-left: -240px;
        }
    `,

    thumbnail: css`
        float: left;
        clear: left;
        margin-bottom: 0;
        width: 120px;
        margin-right: 20px;
        margin-top: 6px;
        ${from.tablet} {
            width: 140px;
        }
        ${from.wide} {
            margin-left: -240px;
        }
        ${from.leftCol} {
            position: relative;
            margin-left: -160px;
        }
    `,

    halfWidth: css`
        margin-top: 12px;
        margin-bottom: 12px;
        width: 50%;
        float: left;
        clear: left;
        margin-right: 16px;
    `,
};

const decidePosition = (role: RoleType) => {
    switch (role) {
        case 'inline':
            return imageCss.inline;
        case 'supporting':
            return imageCss.supporting;
        case 'immersive':
            return imageCss.immersive;
        case 'showcase':
            return imageCss.showcase;
        case 'thumbnail':
            return imageCss.thumbnail;
        case 'halfWidth':
            return imageCss.halfWidth;
        default:
            return imageCss.inline;
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
        <div className={decidePosition(role)}>
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
