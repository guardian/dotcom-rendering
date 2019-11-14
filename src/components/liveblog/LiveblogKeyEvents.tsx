import React from 'react';
import { icons, basePx } from 'styles';
import { css, SerializedStyles } from '@emotion/core'
import { palette } from '@guardian/src-foundations';
import { Block } from 'types/capi-thrift-models';
import { makeRelativeDate } from 'utils/date';
import { PillarStyles } from 'types/Pillar';

const LiveblogKeyEventsStyles = ({ kicker }: PillarStyles): SerializedStyles => css`
    background: ${palette.neutral[100]};
    margin-top: -8px;
    min-height: 42px;
    margin-bottom: 32px;
    border-bottom: solid 2px ${palette.neutral[93]};
    padding: 8px 8px 0 8px;
    position: relative;

    h3 {
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

            a {
                color: ${kicker};
                user-select: none;
            }

            &::before {
                background: ${palette.neutral[86]};
                border-radius: 50%;
                content: '';
                display: block;
                height: 10px;
                left: -5px;
                position: absolute;
                top: 8px;
                width: 10px;
            }

            &::after {
                background: ${palette.neutral[86]};
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
                    width: 8px;
                    border-radius: 0;
                }
            }

            &:last-of-type {
                padding-bottom: 0;

                &::before {
                    height: 1px;
                    left: -1px;
                    top: 12px;
                    width: 8px;
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
        line-height: 30px;
        text-align: center;
        border: 1px solid ${palette.neutral[86]};
        color: ${palette.neutral[7]};
        width: ${basePx(4)};
        height: ${basePx(4)};
        display: inline-block;
        position: absolute;
        top: ${basePx(1)};
        right: ${basePx(1)};
        border-radius: 100%;
        z-index: 2;
        font-size: 2.8rem;
        transition-duration: .2s;

        span {
            font-size: 0;
        }

		&::before {
			${icons}
			content: "\\e002";
			font-size: 16px;
        }
        
        &::-webkit-details-marker {
			display: none;
		}
    }

    details[open] summary {
        transform: rotate(180deg);
    }

    a {
        display: block;
    }
`;

interface LiveblogKeyEventsProps {
    pillarStyles: PillarStyles;
    bodyElements: Block[];
}

const LiveblogKeyEvents = ({ pillarStyles, bodyElements }: LiveblogKeyEventsProps): JSX.Element => {
    const keyEvents = bodyElements.filter(elem => elem.attributes.keyEvent as boolean).slice(0, 7);
    return (
        <section css={LiveblogKeyEventsStyles(pillarStyles)}>
            <h3>Key events ({keyEvents.length})</h3>
            <details>
                <summary><span>Tap to see key events</span></summary>
                <ul>
                    {keyEvents.map((event, index) => {
                        const relativeDate = makeRelativeDate(event.firstPublishedDate);
                        const time = relativeDate ? <time>{relativeDate}</time> : null;
                        return <li key={index}>
                            { time }
                            <a>{event.title}</a>
                        </li>
                    })}
                </ul>
            </details>
        </section>
    )
}

export default LiveblogKeyEvents;
