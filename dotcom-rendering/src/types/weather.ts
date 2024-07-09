import type { Output } from 'valibot';
import {
	nullable,
	number,
	object,
	optional,
	safeParse,
	string,
	transform,
	tuple,
	unknown,
} from 'valibot';
import type { Result } from '../lib/result';
import { error, ok } from '../lib/result';

const weatherDataSchema = object({
	description: string(),
	icon: number(),
	link: nullable(string(), ''),
	dateTime: nullable(string()),
	temperature: object({
		metric: number(),
		imperial: number(),
	}),
});
export type WeatherData = Output<typeof weatherDataSchema>;

const weatherApiDataSchema = object({
	location: object({
		id: string(),
		city: string(),
		country: string(),
	}),
	weather: weatherDataSchema,
	/**
	 * Our weather API returns 24 forecast.
	 * Each forecast is 1 hour offset from the previous forecast, and the first forecast is 1 hour offset from now.
	 */
	forecast: transform(
		tuple([
			unknown(),
			unknown(),
			unknown(),
			weatherDataSchema,
			unknown(),
			unknown(),
			weatherDataSchema,
			unknown(),
			unknown(),
			weatherDataSchema,
			unknown(),
			unknown(),
			weatherDataSchema,
		]),
		(forecast) => ({
			'3h': forecast[3],
			'6h': forecast[6],
			'9h': forecast[9],
			'12h': forecast[12],
		}),
	),
});
export type WeatherApiData = Output<typeof weatherApiDataSchema>;

export const parseWeatherData = (
	data: unknown,
): Result<'Loading' | 'ParsingError', WeatherApiData> => {
	const result = safeParse(optional(weatherApiDataSchema), data);
	if (!result.success) return error('ParsingError');
	return result.output ? ok(result.output) : error('Loading');
};
