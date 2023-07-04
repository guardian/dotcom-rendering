import type { ApiResponse } from './useApi';
import { useApi } from './useApi';

/**
 * Our weather API returns 24 forecast.
 * Each forecast is 1 hour offset from the previous forecast, and the first forecast is 1 hour offset from Now.
 */
export type WeatherForecast = [
	WeatherData,
	WeatherData,
	WeatherData,
	WeatherData,
	WeatherData,
	WeatherData,
	WeatherData,
	WeatherData,
	WeatherData,
	WeatherData,
	WeatherData,
	WeatherData,
	WeatherData,
	WeatherData,
	WeatherData,
	WeatherData,
	WeatherData,
	WeatherData,
	WeatherData,
	WeatherData,
	WeatherData,
	WeatherData,
	WeatherData,
	WeatherData,
];

export type WeatherData = {
	description: string;
	icon: number;
	link?: string;
	temperature: {
		metric: number;
		imperial: number;
	};
};

export type WeatherApiData = {
	location: {
		id: string;
		city: string;
		country: string;
	};
	weather: WeatherData;
	forecast: WeatherForecast;
};

/**
 * Wrapper around useApi to fetch weather data
 * @param {Function} ajaxUrl - base API url to fetch weather data from
 **/
export const useWeather = (ajaxUrl: string): ApiResponse<WeatherApiData> =>
	useApi<WeatherApiData>(`${ajaxUrl}/weather.json`);
