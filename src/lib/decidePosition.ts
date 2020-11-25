import { css } from 'emotion';

import { from, until } from '@guardian/src-foundations/mq';

const roleCss = {
    supporting: css`
        ${from.tablet} {
            position: relative;
            float: left;
            width: 300px;
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
        ${from.leftCol} {
            margin-left: -160px;
        }
        ${from.wide} {
            margin-left: -240px;
        }
    `,

    thumbnail: css`
        float: left;
        clear: left;
        width: 120px;
        margin-right: 20px;
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
        width: 50%;
        float: left;
        clear: left;
        margin-right: 16px;
    `,
};

export const decidePosition = (role: RoleType) => {
    switch (role) {
        case 'inline':
            return css``;
        case 'supporting':
            return roleCss.supporting;
        case 'immersive':
            return roleCss.immersive;
        case 'showcase':
            return roleCss.showcase;
        case 'thumbnail':
            return roleCss.thumbnail;
        case 'halfWidth':
            return roleCss.halfWidth;
        default:
            return css``;
    }
};
