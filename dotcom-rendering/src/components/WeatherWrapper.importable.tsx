import { useEffect } from 'react';
import type { EditionId } from '../lib/edition';
import { useApi } from '../lib/useApi';
import { parseWeatherData } from '../types/weather';
import { Weather, WeatherPlaceholder } from './Weather';

const appendPartnerCodeToUrl = (
	url: string | undefined,
): string | undefined => {
	if (!url) return undefined;

	try {
		const link = new URL(url);
		link.searchParams.append('partner', 'web_guardian_adc');
		return link.href;
	} catch {
		return undefined;
	}
};

type Props = {
	ajaxUrl: string;
	edition: EditionId;
};

export const WeatherWrapper = ({ ajaxUrl, edition }: Props) => {
	const { data, error } = useApi(`${ajaxUrl}/weather.json`);
	const result = parseWeatherData(data);

	useEffect(() => {
		if (error) {
			window.guardian.modules.sentry.reportError(error, 'weather');
		}
	}, [error]);

	useEffect(() => {
		if (result.kind === 'error' && result.error === 'ParsingError') {
			window.guardian.modules.sentry.reportError(
				Error('Invalid weather data'),
				'weather',
			);
		}
	}, [result]);

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
