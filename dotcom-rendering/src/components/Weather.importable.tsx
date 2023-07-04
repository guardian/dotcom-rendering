import { useApi } from '../lib/useApi';
import type { FEFrontConfigType } from '../types/front';
import { Weather } from './Weather';

type WeatherData = {
	weatherText: string;
	weatherIcon: number;
	weatherLink?: string;
	temperature: {
		metric: number;
		imperial: number;
	};
	link?: string;
};

type WeatherApiData = {
	location: {
		id: string;
		city: string;
		country: string;
	};
	weather: WeatherData;
	forecast: [WeatherData, WeatherData, WeatherData, WeatherData];
};

type Props = { edition: FEFrontConfigType['edition'] };

export const WeatherImportable = ({ edition }: Props) => {
	const { /*loading,*/ data /*error*/ } = useApi<WeatherApiData>(
		'http://api.nextgen.guardianapps.co.uk/weather',
	);

	return !data ? null : (
		<Weather
			location={data.location}
			now={data.weather}
			forecast={data.forecast}
			edition={edition}
		/>
	);
};
