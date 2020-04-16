import React from 'react';
import { css } from 'emotion';

import { text } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import { until } from '@guardian/src-foundations/mq';

import { ImageComponent } from '@root/src/web/components/elements/ImageComponent';
import { YouTubeComponent } from '@root/src/web/components/elements/YouTubeComponent';

const captionFont = css`
    ${textSans.xsmall()};
    color: ${text.supporting};
`;

const mainMedia = css`
    min-height: 1px;
    /*
    Thank you IE11, broken in stasis for all eternity.

    https://github.com/philipwalton/flexbugs/issues/75#issuecomment-161800607
    */

    ${until.tablet} {
        margin: 0;
        order: -1;

        figcaption {
            display: none;
        }
    }

    ${until.phablet} {
        margin-left: -20px;
        margin-right: -20px;
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
    adTargeting?: AdTargeting,
    starRating?: number,
) {
    switch (element._type) {
        case 'model.dotcomrendering.pageElements.ImageBlockElement':
            return (
                <ImageComponent
                    key={i}
                    element={element}
                    pillar={pillar}
                    hideCaption={hideCaption}
                    isMainMedia={true}
                    role={element.role}
                    starRating={starRating}
                />
            );
        case 'model.dotcomrendering.pageElements.YoutubeBlockElement':
            return (
                <YouTubeComponent
                    key={i}
                    element={element}
                    pillar={pillar}
                    hideCaption={hideCaption}
                    // eslint-disable-next-line jsx-a11y/aria-role
                    role="inline"
                    adTargeting={adTargeting}
                    isMainMedia={true}
                />
            );
        default:
            // eslint-disable-next-line no-console
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
    adTargeting?: AdTargeting;
    starRating?: number;
}> = ({ elements, pillar, hideCaption, adTargeting, starRating }) => (
    <div className={mainMedia}>
        {elements.map((element, i) =>
            renderElement(
                element,
                pillar,
                i,
                hideCaption,
                adTargeting,
                starRating,
            ),
        )}
    </div>
);
