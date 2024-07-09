import type { Tuple } from '../lib/tuple';

export type WeatherData = {
	description: string;
	icon: number;
	link?: string;
	dateTime?: string;
	temperature: {
		metric: number;
		imperial: number;
	};
};

/**
 * Our weather API returns 24 forecast.
 * Each forecast is 1 hour offset from the previous forecast, and the first forecast is 1 hour offset from now.
 */
type WeatherForecast = [...Tuple<WeatherData, 12>, ...Tuple<WeatherData, 12>];

export type WeatherApiData = {
	location: {
		id: string;
		city: string;
		country: string;
	};
	weather: WeatherData;
	forecast: WeatherForecast;
};
