import React, {FC, ReactElement, ReactNode} from 'react';
import { Item } from 'item';
import { MainMedia, MainMediaKind } from 'headerMedia';
import {pipe2} from "../lib";
import {map, Option, withDefault} from 'types/option';
import {Design, Format} from "@guardian/types/Format";
import {css} from "@emotion/core";
import {headline, textSans} from "@guardian/src-foundations/typography";
import Anchor from "./anchor";
import {getHref, renderTextElement} from "../renderer";
import {neutral} from "@guardian/src-foundations/palette";
import {remSpace} from "@guardian/src-foundations";

interface Props {
    item : Item;
    caption: Option<DocumentFragment>;
    credit: Option<string>;
}

const credit = (mainmedia: MainMedia): ReactElement | null => {
    switch (mainmedia.kind) {
        case MainMediaKind.Image:
            return pipe2(
                mainmedia.image.credit,
                map(credit=><p>{credit}</p>),
                withDefault<ReactElement | null>(null),
            )
        case MainMediaKind.Video:
        default:
            return null
    }
}

const captionHeadingStyles = css`
    ${headline.xxxsmall()}
    color: ${neutral[86]};
    margin: 0 0 ${remSpace[3]};
    display: block;
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
            return <em css={ css`${textSans.xsmall({ fontStyle: 'italic', fontWeight: 'bold'})}` } key={key}>{children}</em>
        case 'A':
            return (
                <Anchor
                    href={withDefault('')(getHref(node))}
                    className={
                        format.design === Design.Media ? css`color: ${neutral[86]};` : undefined
                    }
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

const ImmersiveCaption: FC<Props> = (caption, credit, props) =>
    pipe2(
        caption,
        map(cap =>
            {renderCaption(cap, format)}
            {credit(props.item.mainMedia)}
        ),
        withDefault<ReactElement | null>(null),
    );
    // pipe2(props.item.mainMedia, map(credit), withDefault<ReactElement | null>(null),)

export default ImmersiveCaption;