import React from 'react';
import { css } from 'emotion';
import { ImageComponent } from '@frontend/web/components/elements/ImageComponent';

import { wide, tablet, leftCol } from '@guardian/src-foundations';

const imageCss = {
    inline: css`
        margin-top: 16px;
        margin-bottom: 12px;
    `,

    supporting: css`
        ${tablet} {
            position: relative;
            float: left;
            width: 300px;
            margin-top: 6px;
            margin-bottom: 12px;
            margin-right: 20px;
            line-height: 0;
        }
        ${leftCol} {
            margin-left: -160px;
        }
        ${wide} {
            width: 380px;
            margin-left: -240px;
        }
    `,

    // TODO: immersive is pending review of different article types
    immersive: css``,

    // TODO: showcase is only a partial implementation as sometimes showcase images
    //       appear differently based on where they appear in the article
    //       See top image for: https://www.theguardian.com/stage/2019/oct/01/hammed-animashaun-nick-hytner-dream-master-harold-and-the-boys-national-theatre-london
    showcase: css`
        position: relative;
        margin-top: 16px;
        margin-bottom: 12px;
        ${leftCol} {
            position: relative;
            margin-bottom: 16px;
            margin-left: -160px;
        }
        ${wide} {
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
        ${tablet} {
            margin-right: 20px;
        }
        ${wide} {
            margin-left: -160px;
        }
        ${wide} {
            margin-left: -240px;
        }
        ${leftCol} {
            margin-left: -160px;
        }
        ${leftCol} {
            position: relative;
        }
        ${tablet} {
            width: 140px;
        }
    `,

    // TODO:
    halfWidth: css``,
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

export const ImageBlockComponent: React.FC<{
    element: ImageBlockElement;
    pillar: Pillar;
}> = ({ element, pillar }) => {
    const { role } = element;
    return (
        <div className={decidePosition(role)}>
            <ImageComponent element={element} pillar={pillar} />
        </div>
    );
};
