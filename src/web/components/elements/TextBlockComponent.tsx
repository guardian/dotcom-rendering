import React from 'react';
import { css } from 'emotion';
import HTMLParser from 'html-react-parser';

import { body } from '@guardian/src-foundations/typography';
import { sanitise } from '@frontend/lib/sanitise-html';

import { unescapeData } from '@root/src/lib/escapeData';
import { unwrapHtml } from '@root/src/model/unwrapHtml';
import { RewrappedComponent } from '@root/src/web/components/elements/RewrappedComponent';

import { DropCap } from '@frontend/web/components/DropCap';

type Props = {
    html: string;
    pillar: Pillar;
    designType: DesignType;
    display: Display;
    isFirstParagraph: boolean;
    forceDropCap?: boolean;
};

const isLetter = (letter: string) => {
    return letter.toLowerCase() !== letter.toUpperCase();
};

const isLongEnough = (html: string) => {
    return html.length > 199;
};

const decideDropCapLetter = (html: string) => {
    const first = html.substr(0, 1);
    if (first === '“') {
        const second = html.substr(1, 1);

        if (!isLetter(second)) {
            return false;
        }
        return `${first}${second}`;
    }

    return isLetter(first) && first;
};

const shouldShowDropCap = ({
    designType,
    display,
    isFirstParagraph,
    forceDropCap,
}: {
    designType: DesignType;
    display: Display;
    isFirstParagraph: boolean;
    forceDropCap?: boolean;
}) => {
    // Sometimes paragraphs other than the 1st one can have drop caps
    if (forceDropCap) return true;
    // Otherwise, we're only interested in marking the first para as a drop cap
    if (!isFirstParagraph) return false;
    // If immersive, we show drop caps for the first para
    if (display === 'immersive') return true;
    // The first para has a drop cap for these design types
    switch (designType) {
        case 'Feature':
        case 'Comment':
        case 'Review':
        case 'Interview':
        case 'PhotoEssay':
        case 'Recipe':
            return true;
        case 'Article':
        case 'Media':
        case 'Live':
        case 'SpecialReport':
        case 'MatchReport':
        case 'GuardianView':
        case 'GuardianLabs':
        case 'Quiz':
        case 'AdvertisementFeature':
        case 'Analysis':
            return false;
    }
};

const sanitiserOptions = {
    // Defaults: https://www.npmjs.com/package/sanitize-html#what-are-the-default-options
    allowedTags: false, // Leave tags from CAPI alone
    allowedAttributes: false, // Leave attributes from CAPI alone
    transformTags: {
        a: (tagName: string, attribs: {}) => ({
            tagName, // Just return anchors as is
            attribs: {
                ...attribs, // Merge into the existing attributes
                ...{
                    'data-link-name': 'in body link', // Add the data-link-name for Ophan to anchors
                },
            },
        }),
    },
};

export const TextBlockComponent: React.FC<Props> = ({
    html,
    pillar,
    designType,
    display,
    forceDropCap,
    isFirstParagraph,
}: Props) => {
    const { willUnwrap: isUnwrapped, unwrappedHtml } = unwrapHtml({
        prefix: '<p>',
        suffix: '</p>',
        html,
    });

    const paraStyles = css`
        margin-bottom: 16px;
        ${body.medium()};
    `;

    const firstLetter = decideDropCapLetter(unwrappedHtml);
    const remainingLetters = firstLetter
        ? unwrappedHtml.substr(firstLetter.length)
        : unwrappedHtml;

    if (
        shouldShowDropCap({
            designType,
            display,
            isFirstParagraph,
            forceDropCap,
        }) &&
        firstLetter &&
        isLongEnough(remainingLetters)
    ) {
        // Components that use `dangerouslySetInnerHTML` cannot have children.
        // As we want `DropCap` to be rendered adjacently to raw HTML we need
        // to parse the HTML ourselves as a child node to the component
        return (
            <p className={paraStyles}>
                <DropCap
                    letter={firstLetter}
                    pillar={pillar}
                    designType={designType}
                />
                {HTMLParser(
                    unescapeData(sanitise(remainingLetters, sanitiserOptions)),
                )}
            </p>
        );
    }

    return (
        <RewrappedComponent
            isUnwrapped={isUnwrapped}
            html={sanitise(unwrappedHtml, sanitiserOptions)}
            elCss={paraStyles}
            tagName="p"
        />
    );
};
