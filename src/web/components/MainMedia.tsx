import React from 'react';
import { css, cx } from 'emotion';
import { palette } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';
import { until } from '@guardian/src-foundations/mq';
import { MainImageComponent } from '@root/src/web/components/elements/MainImageComponent';

const captionFont = css`
    ${textSans.xsmall()};
    color: ${palette.neutral[46]};
`;

const mainMediaStyles = css`
    padding-left: 10px;
    margin-bottom: 14px;
    min-height: 1px;
    /*
    Thank you IE11, broken in stasis for all eternity.

    https://github.com/philipwalton/flexbugs/issues/75#issuecomment-161800607
    */

    order: 6;
    flex-basis: 620px;

    ${until.leftCol} {
        padding-left: 0;
        flex-basis: 100%;
    }

    ${until.tablet} {
        margin: 0;
        order: -1;
        padding-left: 0;

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

const showcaseLayout = css`
    max-width: calc(100% - 230px);

    order: 4;
    flex-basis: calc(100% - 230px);

    ${until.wide} {
        max-width: calc(100% - 151px);
        flex-basis: calc(100% - 151px);
    }

    ${until.leftCol} {
        max-width: 100%;
        flex-basis: 100%;
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
    layoutType?: LayoutType;
}> = ({ elements, pillar, hideCaption, layoutType = 'Standard' }) => (
    <div
        className={cx(
            mainMediaStyles,
            layoutType === 'Showcase' && showcaseLayout,
        )}
    >
        {elements.map((element, i) =>
            renderElement(element, pillar, i, hideCaption),
        )}
    </div>
);
