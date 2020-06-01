// ----- Imports ----- //

import React, { FC, ReactElement, ReactNode } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { textSans, headline } from '@guardian/src-foundations/typography';
import { text, neutral } from '@guardian/src-foundations/palette';
import { remSpace, palette } from '@guardian/src-foundations';
import { Format, Design } from '@guardian/types/Format';

import { getPillarStyles } from 'pillarStyles';
import { Option } from 'types/option';
import { renderTextElement, getHref } from 'renderer';
import Anchor from 'components/anchor';
import { darkModeCss } from 'styles';


// ----- Subcomponents ----- //

interface TriangleProps {
    format: Format;
}

const triangleStyles = (colour: string, inverted?: string): SerializedStyles => css`
    fill: ${colour};
    height: 0.8em;
    padding-right: ${remSpace[1]};
    ${inverted ? darkModeCss`fill: ${inverted};` : ''}
`;

const triangleSvg = (colour: string, inverted?: string): ReactElement =>
    <svg
        css={triangleStyles(colour, inverted)}
        viewBox="0 0 10 9"
        xmlns="http://www.w3.org/2000/svg"
    >
        <polygon points="0,9 5,0 10,9 0,9" />
    </svg>

const Triangle: FC<TriangleProps> = ({ format }: TriangleProps) => {
    switch (format.design) {
        case Design.Media:
            return null;
        case Design.AdvertisementFeature:
            return triangleSvg(palette.labs[300]);
        default: {
            const { kicker, inverted } = getPillarStyles(format.pillar);
            return triangleSvg(kicker, inverted);
        }
    }
}

interface CreditProps {
    credit: Option<string>;
    format: Format;
}

const creditStyles = css`
    ${textSans.xsmall()}
    margin: ${remSpace[1]} 0;
`;

const Credit: FC<CreditProps> = ({ format, credit }: CreditProps) =>
    credit.fmap<ReactElement | null>(cred => {
        switch (format.design) {
            case Design.Media:
                return <p css={creditStyles}>{cred}</p>;
            default:
                return <> {cred}</>;
        }
    }).withDefault(null);

const captionHeadingStyles = css`
    ${headline.xxxsmall()}
    color: ${neutral[86]};
    margin: 0 0 ${remSpace[3]};
    display: inline;
`;

const anchorStyles = css`
    color: ${neutral[86]};
`;

const captionElement = (format: Format) => (node: Node, key: number): ReactNode => {
    const text = node.textContent ?? '';
    const children = Array.from(node.childNodes).map(captionElement(format));
    switch (node.nodeName) {
        case 'STRONG':
            return (format.design === Design.Media)
                ? <h2 css={captionHeadingStyles} key={key}>{children}</h2>
                : <>{children}</>
        case 'BR':
            return null;
        case 'EM':
            return <em css={ textSans.xsmall({ fontStyle: 'italic', fontWeight: 'bold'})} key={key}>{children}</em>
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
            return <span>{ text }</span>;
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

    h2 + span {
        display: block;
        ${textSans.xsmall()}
        margin: ${remSpace[1]} 0;
    }
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
