import React from 'react';
import { css } from 'emotion';
import { palette } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/__experimental__typography';
import { until } from '@guardian/src-foundations/mq';
import { MainImageComponent } from '@root/src/web/components/elements/MainImageComponent';

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
                <MainImageComponent
                    key={i}
                    element={element}
                    pillar={pillar}
                    hideCaption={hideCaption}
                />
            );
        default:
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
