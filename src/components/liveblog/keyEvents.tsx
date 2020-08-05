import React from 'react';
import { icons, basePx } from 'styles';
import { css, SerializedStyles } from '@emotion/core'
import { neutral } from '@guardian/src-foundations/palette';
import { makeRelativeDate } from 'date';
import { PillarStyles, getPillarStyles } from 'pillarStyles';
import { Pillar } from '@guardian/types/Format';
import { LiveBlock } from 'liveBlock';
import { body, headline } from '@guardian/src-foundations/typography';
import { map, withDefault } from '@guardian/types/option';
import { pipe2 } from 'lib';

const LiveblogKeyEventsStyles = ({ kicker }: PillarStyles): SerializedStyles => css`
    background: ${neutral[100]};
    margin-top: ${basePx(-1)};
    min-height: 42px;
    margin-bottom: ${basePx(4)};
    border-bottom: solid 2px ${neutral[93]};
    padding: ${basePx(1, 1, 0, 1)};
    position: relative;

    h2 {
        color: ${kicker};
        margin: 0;
    }

    ul {
        padding-left: 0;
        padding-left: 5px;
        list-style: none;

        li {
            position: relative;
            padding: 0px 0px 0px 16px;
            transition: color .6s;
            width: 90%;
            padding-bottom: 16px;

            div {
                font-weight: bold;
                margin-bottom: 4px;
                user-select: none;
            }

            button {
                color: ${kicker};
                user-select: none;
                padding: 0;
                border: none;
                ${body.medium()}
                background: none;
                text-align: left;
            }

            &::before {
                background: ${neutral[86]};
                border-radius: 50%;
                content: '';
                display: block;
                height: 10px;
                left: -5px;
                position: absolute;
                top: ${basePx(1)};
                width: 10px;
            }

            &::after {
                background: ${neutral[86]};
                content: '';
                height: 100%;
                left: -1px;
                position: absolute;
                top: 12px;
                width: 1px;
            }

            &:first-of-type {
                &::before {
                    height: 1px;
                    left: -1px;
                    top: 12px;
                    width: ${basePx(1)};
                    border-radius: 0;
                }
            }

            &:last-of-type {
                padding-bottom: 0;

                &::before {
                    height: 1px;
                    left: -1px;
                    top: 12px;
                    width: ${basePx(1)};
                    border-radius: 0;
                }

                &::after {
                    height: 9px;
                    top: 0;
                }
            }
        }
    }

    summary {
        display: block;
        outline: none;

        h2 {
            ${headline.xxxsmall()}
        }

        &::after {
            ${icons}
            content: "\\e002";
            font-size: 16px;
            position: absolute;
            top: ${basePx(1)};
            right: ${basePx(1)};
            width: ${basePx(4)};
            height: ${basePx(4)};
            display: inline-block;
            border-radius: 100%;
            transition-duration: .2s;
            text-align: center;
            line-height: 30px;
            border: 1px solid ${neutral[86]};
            color: ${neutral[7]};
        }
        
        &::-webkit-details-marker {
            display: none;
        }
    }

    details[open] summary::after {
        transform: rotate(180deg);
    }

    button {
        display: block;
    }
`;

interface LiveblogKeyEventsProps {
    pillar: Pillar;
    blocks: LiveBlock[];
}

const LiveblogKeyEvents = ({ pillar, blocks }: LiveblogKeyEventsProps): JSX.Element => {
    const keyEvents = blocks.filter(elem => elem.isKeyEvent).slice(0, 7);
    return (
        <section css={LiveblogKeyEventsStyles(getPillarStyles(pillar))}>
            <details>
                <summary><h2>Key Events ({keyEvents.length})</h2></summary>
                <ul>
                    {keyEvents.map(event => {
                        const relativeDate: JSX.Element | null = pipe2(
                            event.firstPublished,
                            map(date => <time>{makeRelativeDate(date)}</time>),
                            withDefault<JSX.Element | null>(null),
                        );

                        return <li key={event.id}>
                            { relativeDate }
                            <button>{event.title}</button>
                        </li>
                    })}
                </ul>
            </details>
        </section>
    )
}

export default LiveblogKeyEvents;
