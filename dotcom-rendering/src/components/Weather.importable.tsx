// import { useApi } from '../lib/useApi';
// import { isObject, isString, storage } from '@guardian/libs';
// import { useEffect, useState } from 'react';

// using test data from the storybook for now
import storybookData from './Weather.stories';
import type { WeatherWidgetProps } from './WeatherWidget';
import { WeatherWidget } from './WeatherWidget';

// interface APILocation {
// 	city: string;
// 	country: string;
// 	id: `${number}`;
// }

// type Location = Omit<APILocation, 'country'>;

// interface WeatherResponse {
// 	html: string;
// 	refreshStatus: boolean;
// }

// const isValidLocation = (location: unknown): location is Location =>
// 	isObject(location) && isString(location.id) && isString(location.city);

// const apiOrigin = 'https://api.nextgen.guardianapps.co.uk';

type WeatherProps = {
	weatherapiurl: string;
	edition: string;
};

const { args: testData } = storybookData;

export const Weather = ({ weatherapiurl, edition }: WeatherProps) => {
	// const apiURL = apiOrigin + weatherapiurl;

	// const [location, setLocation] = useState(
	// 	storage.local.get('gu.prefs.weather-location') as Location | null,
	// );
	// const [weather, setWeather] = useState<WeatherResponse>();

	// if (!location) {
	// 	void fetch(apiURL + '.json')
	// 		.then((response) => response.json())
	// 		.then((apiLocation) => {
	// 			if (isValidLocation(apiLocation)) {
	// 				const newLocation = {
	// 					city: apiLocation.city,
	// 					id: apiLocation.id,
	// 				};
	// 				setLocation(newLocation);
	// 				storage.local.set('gu.prefs.weather-location', location);
	// 			}
	// 		});
	// }

	// useEffect(() => {
	// 	// console.log('in useEffect', location);
	// 	if (location) {
	// 		void fetch(apiURL + `/${location.id}` + '.json')
	// 			.then((response) => response.json())
	// 			.then((apiWeather: WeatherResponse) => {
	// 				// console.log(apiWeather);

	// 				setWeather(apiWeather);
	// 			});
	// 	}
	// }, [apiURL, location]);

	return <WeatherWidget {...(testData as WeatherWidgetProps)} />;
};
