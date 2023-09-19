import { ThemeProvider } from '@emotion/react';
import { PurchaseScreenReason } from '@guardian/bridget/PurchaseScreenReason';
import {
	Button,
	buttonThemeReaderRevenue,
	SvgArrowRightStraight,
} from '@guardian/source-react-components';
import libDebounce from 'lodash.debounce';
import { useEffect, useRef, useState } from 'react';
import { getAcquisitionsClient } from '../lib/bridgetApi';

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

export function EpicContent({
	title,
	body,
	firstButton,
	secondButton,
}: EpicProps): React.ReactElement | null {
	const [impressionSeen, setImpressionSeen] = useState(false);
	const epicContainer = useRef() as React.MutableRefObject<HTMLDivElement>;

	useEffect(() => {
		const handleSeenEpic = libDebounce(() => {
			if (
				!impressionSeen &&
				isElementPartiallyInViewport(epicContainer)
			) {
				void getAcquisitionsClient().epicSeen();
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
		<div ref={epicContainer}>
			<h1 dangerouslySetInnerHTML={{ __html: title }}></h1>
			<div dangerouslySetInnerHTML={{ __html: body }}></div>
			<div className="button-container">
				<ThemeProvider theme={buttonThemeReaderRevenue}>
					{epicButton(firstButton, () =>
						getAcquisitionsClient().launchPurchaseScreen(
							PurchaseScreenReason.epic,
						),
					)}
					{secondButton
						? epicButton(secondButton, () =>
								getAcquisitionsClient().launchPurchaseScreen(
									PurchaseScreenReason.epic,
								),
						  )
						: null}
				</ThemeProvider>
			</div>
		</div>
	);
}
