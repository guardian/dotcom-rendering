import { isWithinTwelveHours } from '../lib/formatTime';
import { palette } from '../palette';
import { CardAge } from './Card/components/CardAge';

type Props = {
	showClock: boolean;
	serverTime?: number;
	webPublicationDate: string;
	storylinesStyle?: boolean;
};

export const FeatureCardCardAge = ({
	showClock,
	serverTime,
	webPublicationDate,
	storylinesStyle,
}: Props) => {
	const withinTwelveHours = isWithinTwelveHours(webPublicationDate);
	if (withinTwelveHours || storylinesStyle) {
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
