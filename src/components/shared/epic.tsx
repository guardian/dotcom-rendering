// ----- Imports ----- //
import { css, SerializedStyles } from '@emotion/core';
import { basePx } from 'styles';
import { from } from '@guardian/src-foundations/mq';
import { palette } from '@guardian/src-foundations';
import React, { useState, useEffect, useRef } from 'react';
import { nativeClient } from 'native/nativeApi';

// ----- Styles ----- //

const EpicStyles = (): SerializedStyles => css`
        margin: ${basePx(1)};
        ${from.tablet} {
            margin: ${basePx(1, 0)};
        }
        clear: both;

        border-top: 1px solid ${palette.brandYellow[300]};
        background: ${palette.neutral[97]};
        width: 100%;
        padding: 12px;
        font-family: "Guardian Headline", "Guardian Text Egyptian Web", Georgia, serif;
        clear: left;

        h1:first-of-type {
            font-size: 20px;
            font-weight: 900;
            font-family: "Guardian Egyptian Web", "Guardian Headline", "Guardian Text Egyptian Web", Georgia, serif;
            margin-bottom: 12px;
            line-height: 1.4;
        }

        button {
            display: inline-block;
            background-image: none;
            color: ${palette.neutral[7]};
            background: ${palette.brandYellow[300]});
            border-radius: 100px;
            margin: 0 12px 12px 0;
            padding: 6px 6px 4px 15px;
            font-size: 16px;
            font-weight: 900;
            font-family: "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
            line-height: 26px;
        }

        .button-container {
            margin-top: 24px;
        }

        svg {
            margin-left: 6px;
            margin-top: -4px;
            vertical-align: middle;
        }

        mark {
            background: ${palette.brandYellow[300]};
            padding: 4px 0;
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
                // call into native layer to confirm epic has been seen
                setImpressionSeen(true);
            }
        }, 100);
        window.addEventListener('scroll', handleSeenEpic);
        return (): void => {
            window.removeEventListener('scroll', handleSeenEpic);
        }
    }, [impressionSeen]);

    const epicButton = (text: string, action: () => void): JSX.Element =>
        <button onClick={action}>
            {text}
            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="5 5 20 20">
                <path fill="#121212" d="M22.8 14.6L15.2 7l-.7.7 5.5 6.6H6v1.5h14l-5.5 6.6.7.7 7.6-7.6v-.9"/>
            </svg>
        </button>

    return (
        <div css={EpicStyles} ref={creativeContainer}>
            <h1>{title}</h1>
            <div>{body}</div>
            <div className="button-container">
                {epicButton(firstButton, () => nativeClient.launchFrictionScreen())}
                {
                    secondButton
                        ? epicButton(secondButton, () => nativeClient.launchFrictionScreen())
                        : null
                }
            </div>
        </div>
    )
}


// ----- Exports ----- //

export default Epic;
