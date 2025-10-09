import { isWithinTwelveHours } from '../lib/formatTime';
import { palette } from '../palette';
import { CardAge } from './Card/components/CardAge';

type Props = {
	showClock: boolean;
	serverTime?: number;
	webPublicationDate: string;
};

export const FeatureCardCardAge = ({
	showClock,
	serverTime,
	webPublicationDate,
}: Props) => {
	const withinTwelveHours = isWithinTwelveHours(webPublicationDate);
	if (withinTwelveHours) {
		return (
			<CardAge
				webPublication={{
					date: webPublicationDate,
					isWithinTwelveHours: true,
				}}
				showClock={showClock}
				serverTime={serverTime}
				isTagPage={false}
				colour={palette('--feature-card-footer-text')}
			/>
		);
	}

	return null;
};
