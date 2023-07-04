import type { ApiResponse } from './useApi';
import { useApi } from './useApi';

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
	forecast: [WeatherData, WeatherData, WeatherData, WeatherData];
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
