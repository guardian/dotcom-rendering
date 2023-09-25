import { ThemeProvider } from '@emotion/react';
import { PurchaseScreenReason } from '@guardian/bridget/PurchaseScreenReason';
import {
	Button,
	buttonThemeReaderRevenue,
	SvgArrowRightStraight,
} from '@guardian/source-react-components';
import { useEffect, useState } from 'react';
import { getAcquisitionsClient } from '../lib/bridgetApi';
import { useIsInView } from '../lib/useIsInView';

interface EpicProps {
	title: string;
	body: string;
	firstButton: string;
	secondButton?: string;
}

export function EpicContent({
	title,
	body,
	firstButton,
	secondButton,
}: EpicProps): React.ReactElement | null {
	const [impressionSeen, setImpressionSeenRef] = useIsInView({
		debounce: true,
	});
	const [reportedImpressionSeen, setReportedImpressionSeen] = useState(false);

	useEffect(() => {
		if (impressionSeen && !reportedImpressionSeen) {
			void getAcquisitionsClient().epicSeen();
			setReportedImpressionSeen(true);
		}
	}, [impressionSeen, reportedImpressionSeen, setReportedImpressionSeen]);

	const EpicButton = ({ text }: { text: string }) => (
		<Button
			onClick={() =>
				void getAcquisitionsClient().launchPurchaseScreen(
					PurchaseScreenReason.epic,
				)
			}
			iconSide="right"
			icon={<SvgArrowRightStraight />}
		>
			{text}
		</Button>
	);

	return (
		<div ref={setImpressionSeenRef}>
			<h1 dangerouslySetInnerHTML={{ __html: title }}></h1>
			<div dangerouslySetInnerHTML={{ __html: body }}></div>
			<div className="button-container">
				<ThemeProvider theme={buttonThemeReaderRevenue}>
					<EpicButton text={firstButton} />
					{!!secondButton && <EpicButton text={secondButton} />}
				</ThemeProvider>
			</div>
		</div>
	);
}
