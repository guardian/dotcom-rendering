import type { EditionId } from '../lib/edition';
import { useApi } from '../lib/useApi';
import type { WeatherApiData } from '../types/weather';
import { Weather, WeatherPlaceholder } from './Weather';

const appendPartnerCodeToUrl = (
	url: string | undefined,
): string | undefined => {
	if (!url || !URL.canParse(url)) {
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
	const { data, error } = useApi<WeatherApiData>(`${ajaxUrl}/weather.json`);

	if (error) {
		window.guardian.modules.sentry.reportError(error, 'weather');
	}

	return !data ? (
		<WeatherPlaceholder />
	) : (
		<Weather
			location={data.location}
			now={data.weather}
			forecast={data.forecast}
			edition={edition}
			link={appendPartnerCodeToUrl(data.weather.link)}
		/>
	);
};
