// ----- Imports ----- //
import { css, SerializedStyles } from '@emotion/core';
import { spaceToRem, headlineFont } from 'styles';
import { from } from '@guardian/src-foundations/mq';
import { palette } from '@guardian/src-foundations';
import { brandAltBackground } from '@guardian/src-foundations/palette';
import React, { useState, useEffect, useRef } from 'react';
import { nativeClient } from 'native/nativeApi';
import { SvgArrowRightStraight } from "@guardian/src-svgs"
import { ThemeProvider } from 'emotion-theming'
import { Button, buttonReaderRevenue } from '@guardian/src-button'
import { parse } from 'client/parser';
import { renderText } from 'renderer';
import { Pillar } from 'pillar';

const parser = new DOMParser();
const parseEpic = parse(parser);

// ----- Styles ----- //

const EpicStyles = (): SerializedStyles => css`
        width: calc(100% - ${spaceToRem(2)} - ${spaceToRem(2)} - ${spaceToRem(2)} - ${spaceToRem(2)});
        margin: ${spaceToRem(2)};

        ${from.wide} {
            margin: ${spaceToRem(2)} 0;
        }

        clear: both;

        border-top: 1px solid ${brandAltBackground.primary};
        background: ${palette.neutral[97]};
        padding: ${spaceToRem(2)};
        ${body.medium()}
        clear: left;

        h1:first-of-type {
            ${headlineFont}
        }

        button {
            margin: 0 ${spaceToRem(2)} ${spaceToRem(2)} 0;
        }

        .button-container {
            margin-top: ${spaceToRem(9)};
        }

        svg {
            margin-left: ${spaceToRem(2)};
            margin-top: -${spaceToRem(1)};
            vertical-align: middle;
        }

        mark {
            background: ${brandAltBackground.primary};
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

function Epic({ title, body, firstButton, secondButton }: EpicProps): React.ReactElement | null {
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

    const epicBody = parseEpic(body).either(
        _ => [null],
        content => renderText(content, Pillar.news),
    );

    return (
        <div css={EpicStyles} ref={creativeContainer}>
            <h1>{title}</h1>
            {epicBody}
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
