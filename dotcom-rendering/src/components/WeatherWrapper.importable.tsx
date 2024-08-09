import type { EditionId } from '../lib/edition';
import { useApi } from '../lib/useApi';
import { parseWeatherData } from '../types/weather';
import { Weather, WeatherPlaceholder } from './Weather';

const appendPartnerCodeToUrl = (
	url: string | undefined,
): string | undefined => {
	// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-unnecessary-condition -- We're on the client so we don't know if URL.canParse is available
	if (!url || (!!window.URL.canParse && !URL.canParse(url))) {
		return undefined;
	}

	const link = new URL(url);
	link.searchParams.append('partner', 'web_guardian_adc');

	return link.href;
};

type Props = {
	ajaxUrl: string;
	edition: EditionId;
};

export const WeatherWrapper = ({ ajaxUrl, edition }: Props) => {
	const { data, error } = useApi(`${ajaxUrl}/weather.json`);

	if (error) {
		window.guardian.modules.sentry.reportError(error, 'weather');
	}

	const result = parseWeatherData(data);

	if (result.kind === 'error' && result.error === 'ParsingError') {
		window.guardian.modules.sentry.reportError(
			Error('Invalid weather data'),
			'weather',
		);
	}

	return result.kind === 'error' ? (
		<WeatherPlaceholder />
	) : (
		<Weather
			location={result.value.location}
			now={result.value.weather}
			forecast={result.value.forecast}
			edition={edition}
			link={appendPartnerCodeToUrl(result.value.weather.link)}
		/>
	);
};
