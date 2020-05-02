import React from 'react';
import { css } from 'emotion';

import { body } from '@guardian/src-foundations/typography';
import { sanitise } from '@frontend/lib/sanitise-html';

import { unwrapHtml } from '@root/src/model/unwrapHtml';
import { RewrappedComponent } from '@root/src/web/components/elements/RewrappedComponent';

import { DropCap } from '@frontend/web/components/DropCap';

type Props = {
    html: string;
    pillar: Pillar;
    designType: DesignType;
    isFirstParagraph: boolean;
    dropCap?: boolean;
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
    isFirstParagraph,
    dropCap,
}: {
    designType: DesignType;
    isFirstParagraph: boolean;
    dropCap?: boolean;
}) => {
    if (dropCap) return true; // Sometimes paragraphs other than the 1st one can have drop caps
    // Otherwise, we're only interested in marking the first para as a drop cap
    if (!isFirstParagraph) return false;
    // And only if one of these design types
    switch (designType) {
        case 'Feature':
        case 'Comment':
        case 'Review':
        case 'Interview':
        case 'Immersive':
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
    dropCap,
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
        shouldShowDropCap({ designType, isFirstParagraph, dropCap }) &&
        firstLetter &&
        isLongEnough(remainingLetters)
    ) {
        return (
            <>
                <DropCap
                    letter={firstLetter}
                    pillar={pillar}
                    designType={designType}
                />
                <RewrappedComponent
                    isUnwrapped={isUnwrapped}
                    html={sanitise(remainingLetters, sanitiserOptions)}
                    elCss={paraStyles}
                    tagName="p"
                />
            </>
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
