import React from 'react';
import { css } from 'emotion';

import { palette } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';
import { until } from '@guardian/src-foundations/mq';

import { ImageComponent } from '@root/src/web/components/elements/ImageComponent';
import { YouTubeComponent } from '@root/src/web/components/elements/YouTubeComponent';

const captionFont = css`
    ${textSans.xsmall()};
    color: ${palette.neutral[46]};
`;

const mainMedia = css`
    min-height: 1px;
    /*
    Thank you IE11, broken in stasis for all eternity.

    https://github.com/philipwalton/flexbugs/issues/75#issuecomment-161800607
    */

    margin-bottom: 14px;

    ${until.tablet} {
        margin: 0;
        order: -1;

        figcaption {
            display: none;
        }
    }

    img {
        flex: 0 0 auto; /* IE */
        width: 100%;
        height: 100%;
    }

    figcaption {
        ${captionFont};
    }
`;

function renderElement(
    element: CAPIElement,
    pillar: Pillar,
    i: number,
    hideCaption?: boolean,
) {
    switch (element._type) {
        case 'model.dotcomrendering.pageElements.ImageBlockElement':
            return (
                <ImageComponent
                    key={i}
                    element={element}
                    pillar={pillar}
                    hideCaption={hideCaption}
                    role={element.role}
                />
            );
        case 'model.dotcomrendering.pageElements.YoutubeBlockElement':
            return (
                <YouTubeComponent
                    key={i}
                    element={element}
                    pillar={pillar}
                    hideCaption={hideCaption}
                    // tslint:disable-next-line react-a11y-role
                    role="inline"
                />
            );
        default:
            // tslint:disable-next-line no-console
            console.warn(
                `The following main media element is not supported by DCR ${element._type}`,
            );
            return null;
    }
}

export const MainMedia: React.FC<{
    elements: CAPIElement[];
    pillar: Pillar;
    hideCaption?: boolean;
}> = ({ elements, pillar, hideCaption }) => (
    <div className={mainMedia}>
        {elements.map((element, i) =>
            renderElement(element, pillar, i, hideCaption),
        )}
    </div>
);
