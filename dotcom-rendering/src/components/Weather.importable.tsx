import { useWeather } from '../lib/useWeather';
import type { FEFrontConfigType } from '../types/front';
import { WeatherWidget } from './WeatherWidget';

type Props = {
	ajaxUrl: string;
	edition: FEFrontConfigType['edition'];
};

export const Weather = ({ ajaxUrl, edition }: Props) => {
	const { data, error } = useWeather(ajaxUrl);

	if (error) {
		window.guardian.modules.sentry.reportError(error, 'weather');
	}

	return !data ? null : (
		<WeatherWidget
			location={data.location}
			now={data.weather}
			forecast={data.forecast}
			edition={edition}
		/>
	);
};
