// ----- Imports ----- //
import { css, SerializedStyles } from '@emotion/core';
import { basePx, headlineFont } from 'styles';
import { from } from '@guardian/src-foundations/mq';
import { palette, brandAlt } from '@guardian/src-foundations';
import React, { useState, useEffect, useRef } from 'react';
import { nativeClient } from 'native/nativeApi';
import { SvgArrowRightStraight } from "@guardian/src-svgs"
import { ThemeProvider } from 'emotion-theming'
import { Button, buttonReaderRevenue } from '@guardian/src-button'


// ----- Styles ----- //

const EpicStyles = (): SerializedStyles => css`
        width: calc(100% - ${basePx(4)});
        margin: ${spaceToRem(2)};

        ${from.wide} {
            margin: ${basePx(1, 0)};
        }

        clear: both;

        border-top: 1px solid ${brandAlt[400]};
        background: ${palette.neutral[97]};
        padding: ${basePx(1)};
        font-family: 'Guardian Text Egyptian Web';
        clear: left;

        h1:first-of-type {
            ${headlineFont}
        }

        button {
            margin: ${basePx(0, 1, 1, 0)};
        }

        .button-container {
            margin-top: 3rem;
        }

        svg {
            margin-left: 8px;
            margin-top: -4px;
            vertical-align: middle;
        }

        mark {
            background: ${brandAlt[400]};
            padding: .1rem .125rem;
        }
`;


// ----- Component ----- //

interface EpicProps {
    title: string;
    body: string;
    firstButton: string;
    secondButton: string | undefined;
}

const isElementPartiallyInViewport = (el: React.MutableRefObject<HTMLDivElement>): boolean => {
    const rect = el.current.getBoundingClientRect();
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    const windowWidth = (window.innerWidth || document.documentElement.clientWidth);
    const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
    const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);
    return (vertInView && horInView);
}

const debounce = (fn: () => void, time: number): () => void => {
    let timeout: NodeJS.Timeout;
    return function(...args: []): void {
        const functionCall = (): void => fn(...args);
        clearTimeout(timeout);
        timeout = setTimeout(functionCall, time);
    }
}

function Epic({ title, body, firstButton, secondButton }: EpicProps): JSX.Element | null {
    const [impressionSeen, setImpressionSeen] = useState(false);    
    const creativeContainer = useRef() as React.MutableRefObject<HTMLDivElement>;;

    useEffect(() => {
        const handleSeenEpic = debounce(() => {
            if (!impressionSeen && isElementPartiallyInViewport(creativeContainer)) {
                nativeClient.epicSeen();
                setImpressionSeen(true);
            }
        }, 100);
        window.addEventListener('scroll', handleSeenEpic);
        return (): void => {
            window.removeEventListener('scroll', handleSeenEpic);
        }
    }, [impressionSeen]);

    const epicButton = (text: string, action: () => void): JSX.Element =>
        <Button onClick={action} iconSide="right" icon={<SvgArrowRightStraight />}>
	        {text}
        </Button>

    return (
        <div css={EpicStyles} ref={creativeContainer}>
            <h1>{title}</h1>
            <div dangerouslySetInnerHTML={{__html: body}}></div>
            <div className="button-container">
                <ThemeProvider theme={buttonReaderRevenue}>
                    {epicButton(firstButton, () => nativeClient.launchFrictionScreen())}
                    {secondButton
                        ? epicButton(secondButton, () => nativeClient.launchFrictionScreen())
                        : null}
                </ThemeProvider>
            </div>
        </div>
    )
}


// ----- Exports ----- //

export default Epic;
