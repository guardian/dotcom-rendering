// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css, ThemeProvider } from '@emotion/react';
import { PurchaseScreenReason } from '@guardian/bridget/PurchaseScreenReason';
import { Button, buttonReaderRevenue } from '@guardian/src-button';
import { remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import {
	brandAlt,
	brandAltBackground,
	neutral,
} from '@guardian/src-foundations/palette';
import { body, headline } from '@guardian/src-foundations/typography';
import { SvgArrowRightStraight } from '@guardian/src-icons';
import { acquisitionsClient } from 'native/nativeApi';
import { useEffect, useRef, useState } from 'react';
import { darkModeCss } from 'styles';

// ----- Styles ----- //

const styles: SerializedStyles = css`
	${from.wide} {
		margin: ${remSpace[2]} 0;
	}

	border-top: 1px solid ${brandAltBackground.primary};
	background: ${neutral[97]};
	padding: ${remSpace[2]};
	${body.medium()}
	clear: left;

	h1:first-of-type {
		margin-top: 0;
		${headline.xsmall()}
	}

	button {
		margin: 0 ${remSpace[2]} ${remSpace[2]} 0;
	}

	.button-container {
		margin-top: ${remSpace[9]};
	}

	mark {
		background: ${brandAltBackground.primary};
		padding: 0.1rem 0.125rem;
	}
`;

const darkStyles: SerializedStyles = darkModeCss`
    color: ${neutral[93]};
    background-color: ${neutral[20]};
    border-top: 1px solid ${brandAlt[200]};

    mark {
        background: ${brandAlt[200]};
    }

    .button-container button {
        background: ${brandAlt[200]};
    }
`;

// ----- Component ----- //

interface EpicProps {
	title: string;
	body: string;
	firstButton: string;
	secondButton?: string;
}

const isElementPartiallyInViewport = (
	el: React.MutableRefObject<HTMLDivElement>,
): boolean => {
	const rect = el.current.getBoundingClientRect();
	const windowHeight =
		window.innerHeight || document.documentElement.clientHeight;
	const windowWidth =
		window.innerWidth || document.documentElement.clientWidth;
	const vertInView = rect.top <= windowHeight && rect.top + rect.height >= 0;
	const horInView = rect.left <= windowWidth && rect.left + rect.width >= 0;
	return vertInView && horInView;
};

const debounce = (fn: () => void, time: number): (() => void) => {
	let timeout: NodeJS.Timeout;
	return function (...args: []): void {
		const functionCall = (): void => fn(...args);
		clearTimeout(timeout);
		timeout = setTimeout(functionCall, time);
	};
};

function Epic({
	title,
	body,
	firstButton,
	secondButton,
}: EpicProps): React.ReactElement | null {
	const [impressionSeen, setImpressionSeen] = useState(false);
	const epicContainer = useRef() as React.MutableRefObject<HTMLDivElement>;

	useEffect(() => {
		const handleSeenEpic = debounce(() => {
			if (
				!impressionSeen &&
				isElementPartiallyInViewport(epicContainer)
			) {
				void acquisitionsClient.epicSeen();
				setImpressionSeen(true);
			}
		}, 100);
		window.addEventListener('scroll', handleSeenEpic);
		return (): void => {
			window.removeEventListener('scroll', handleSeenEpic);
		};
	}, [impressionSeen]);

	const epicButton = (
		text: string,
		action: () => Promise<void>,
	): JSX.Element => (
		<Button
			onClick={action}
			iconSide="right"
			icon={<SvgArrowRightStraight />}
		>
			{text}
		</Button>
	);

	return (
		<div css={[styles, darkStyles]} ref={epicContainer}>
			<h1 dangerouslySetInnerHTML={{ __html: title }}></h1>
			<div dangerouslySetInnerHTML={{ __html: body }}></div>
			<div className="button-container">
				<ThemeProvider theme={buttonReaderRevenue}>
					{epicButton(firstButton, () =>
						acquisitionsClient.launchPurchaseScreen(
							PurchaseScreenReason.epic,
						),
					)}
					{secondButton
						? epicButton(secondButton, () =>
								acquisitionsClient.launchPurchaseScreen(
									PurchaseScreenReason.epic,
								),
						  )
						: null}
				</ThemeProvider>
			</div>
		</div>
	);
}

// ----- Exports ----- //

export default Epic;
