// ----- Imports ----- //

import React, { FC, ReactElement, ReactNode } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { textSans, headline } from '@guardian/src-foundations/typography';
import { text, neutral } from '@guardian/src-foundations/palette';
import { remSpace } from '@guardian/src-foundations';
import { Format, Design } from '@guardian/types/Format';

import { PillarStyles, getPillarStyles } from 'pillarStyles';
import { Option } from 'types/option';
import { renderTextElement, getHref } from 'renderer';
import Anchor from 'components/anchor';


// ----- Subcomponents ----- //

interface TriangleProps {
    format: Format;
}

const triangleStyles = ({ kicker }: PillarStyles): SerializedStyles => css`
    fill: ${kicker};
    height: 0.8em;
    padding-right: ${remSpace[1]};
`;

const Triangle: FC<TriangleProps> = ({ format }: TriangleProps) => {
    switch (format.design) {
        case Design.Media:
            return null;
        default:
            return (
                <svg
                    css={triangleStyles(getPillarStyles(format.pillar))}
                    viewBox="0 0 10 9"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <polygon points="0,9 5,0 10,9 0,9" />
                </svg>
            );
    }
}

interface CreditProps {
    credit: Option<string>;
    format: Format;
}

const Credit: FC<CreditProps> = ({ format, credit }: CreditProps) =>
    credit.fmap<ReactElement | null>(cred => {
        switch (format.design) {
            case Design.Media:
                return <p>{cred}</p>;
            default:
                return <> {cred}</>;
        }
    }).withDefault(null);

const captionHeadingStyles = css`
    ${headline.xxxsmall()}
    color: ${neutral[86]};
    margin: 0 0 ${remSpace[3]};

    em {
        ${textSans.xsmall({ italic: true, fontWeight: 'bold'})}
    }
`;

const anchorStyles = css`
    color: ${neutral[86]};
`;

const captionElement = (format: Format) => (node: Node, key: number): ReactNode => {
    const text = node.textContent ?? '';
    const children = Array.from(node.childNodes).map(captionElement(format));
    switch (node.nodeName) {
        case 'STRONG':
            return <h2 css={captionHeadingStyles} key={key}>{children}</h2>;
        case 'BR':
            return null;
        case 'EM':
            return <em key={key}>{children}</em>
        case 'A':
            return (
                <Anchor
                    href={getHref(node).withDefault('')}
                    className={anchorStyles}
                    format={format}
                >
                    {children}
                </Anchor>
            );
        case '#text':
            return text;
        default:
            return renderTextElement(format)(node, key);
    }
}

const renderCaption = (doc: DocumentFragment, format: Format): ReactNode[] =>
    Array.from(doc.childNodes).map(captionElement(format));


// ----- Component ----- //

interface Props {
    format: Format;
    caption: Option<DocumentFragment>;
    credit: Option<string>;
}

const styles = css`
    ${textSans.xsmall()}
    padding-top: ${remSpace[2]};
    color: ${text.supporting};
`;

const mediaStyles = css`
    color: ${neutral[86]};
`;

const getStyles = (format: Format): SerializedStyles => {
    switch (format.design) {
        case Design.Media:
            return css(styles, mediaStyles);
        default:
            return styles;
    }
}

const FigCaption: FC<Props> = ({ format, caption, credit }: Props) =>
    caption.fmap<ReactElement | null>(cap =>
        <figcaption css={getStyles(format)}>
            <Triangle format={format} />
            {renderCaption(cap, format)}
            <Credit format={format} credit={credit} />
        </figcaption>
    ).withDefault(null);


// ----- Exports ----- //

export default FigCaption;
