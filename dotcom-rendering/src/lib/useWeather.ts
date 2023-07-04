import type { ApiResponse } from './useApi';
import { useApi } from './useApi';

// We get 24 forecasts from the API, each one 1hr offset from the last one
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
 * Ensures that the given task is only run once and only after all items in waitFor are defined
 * @param {Function} task - The task to execute once
 * @param {Array} waitFor - An array of variables that must be defined before the task is executed
 * */
export const useWeather = (
	ajaxUrl: string,
	edition: string,
): ApiResponse<WeatherApiData> => {
	return useApi<WeatherApiData>(
		`${ajaxUrl}/weather.json?_edition=${edition}`,
	);
};
