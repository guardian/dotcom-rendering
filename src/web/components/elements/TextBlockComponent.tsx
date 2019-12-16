import React from 'react';
import { css } from 'emotion';

import { body } from '@guardian/src-foundations/typography';

import { unescapeData } from '@root/src/lib/escapeData';

import { DropCap } from '@frontend/web/components/DropCap';
// tslint:disable:react-no-dangerous-html

type Props = {
    html: string;
    pillar: Pillar;
    designType: DesignType;
    dropCap?: boolean;
};

const isLetter = (letter: string) => {
    return letter.toLowerCase() !== letter.toUpperCase();
};

const stripPTags = (html: string, prefix: string, suffix: string) => {
    return html.slice(prefix.length, html.length - suffix.length);
};

const isLongEnough = (html: string) => {
    return html.length > 199;
};

const decideDropCap = (html: string) => {
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

const Text = ({
    wrappedInPTags,
    html,
}: {
    wrappedInPTags: boolean;
    html: string;
}): JSX.Element => {
    const para = css`
        margin-bottom: 16px;
        ${body.medium()};
    `;

    const innerPara = css`
        p {
            ${para}
        }
    `;

    if (wrappedInPTags) {
        return (
            <p
                className={para}
                dangerouslySetInnerHTML={{
                    __html: unescapeData(html),
                }}
            />
        );
    }
    return (
        <span
            className={innerPara}
            dangerouslySetInnerHTML={{
                __html: unescapeData(html),
            }}
        />
    );
};

export const TextBlockComponent: React.FC<Props> = ({
    html,
    pillar,
    designType,
    dropCap,
}: Props) => {
    const prefix = '<p>';
    const suffix = '</p>';

    // Ideally we want to want to avoid an unnecessary 'span' wrapper,
    // which also will cause issues with ads (spacefinder rules). React
    // requires a wrapping element for dangerouslySetInnerHTML so we
    // strip the original p markup and rewrap. The fallback case is
    // added for safety but should never happen. If it does happen
    // though it will cause issues with commercial JS which expects
    // paras to be top-level.
    const wrappedInPTags = html.startsWith(prefix) && html.endsWith(suffix);
    let htmlToSet;

    if (wrappedInPTags) {
        htmlToSet = stripPTags(html, prefix, suffix);
    } else {
        htmlToSet = html;
    }

    const firstLetter = decideDropCap(htmlToSet);
    const remainingLetters = firstLetter
        ? htmlToSet.substr(firstLetter.length)
        : htmlToSet;
    if (dropCap && firstLetter && isLongEnough(remainingLetters)) {
        return (
            <>
                <DropCap
                    letter={firstLetter}
                    pillar={pillar}
                    designType={designType}
                />
                <Text wrappedInPTags={wrappedInPTags} html={remainingLetters} />
            </>
        );
    }

    return <Text wrappedInPTags={wrappedInPTags} html={htmlToSet} />;
};
