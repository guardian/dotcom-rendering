import React from 'react';
import { PillarStyles } from '../../styles';
import { css, SerializedStyles } from '@emotion/core'
import { palette } from '@guardian/src-foundations/palette';

const LiveblogKeyEventsStyles = ({ kicker }: PillarStyles): SerializedStyles => css`
    background: ${palette.neutral[100]};
    margin-top: -8px;
    margin-bottom: 32px;
    border-bottom: solid 2px ${palette.neutral[93]};
    padding: 8px 8px 0 8px;
    position: relative;

    h3 {
        color: ${kicker};
        margin: 0;
    }

    .open {
        border: 1px solid ${palette.neutral[86]};
        border-radius: 50%;
        height: 32px;
        position: absolute;
        right: 8px;
        top: 8px;
        width: 32px;
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
            }

            a {
                color: ${kicker};
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
`;

const placeholderEvents = [
    'One',
    'Two',
    'Three',
    'Four',
    'Five'
]

const LiveblogKeyEvents = ({ pillarStyles }: { pillarStyles: PillarStyles }): JSX.Element => {
    return (
        <section css={LiveblogKeyEventsStyles(pillarStyles)}>
            <h3>Key events (7)</h3>
            <div className="open"></div>
            <ul>
                {placeholderEvents.map((event, index) => {
                    return <li key={index}>
                        <div>15m ago</div>
                        <a>{event}</a>
                    </li>
                })}
            </ul>
        </section>
    )
}

export default LiveblogKeyEvents;
