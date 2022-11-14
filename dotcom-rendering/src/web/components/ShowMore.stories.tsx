import fetchMock from 'fetch-mock';
import { trails } from '../../../fixtures/manual/show-more-trails';
import { ShowMore } from './ShowMore.importable';

const containerTitle = 'Opinion';
const path = 'uk/lifestyle';
const containerId = '5011-3940-8793-33a9';
const baseUrl = 'https://api.nextgen.guardianapps.co.uk';

export default {
	component: ShowMore,
	title: 'Components/ShowMore',
};

export const ShowMoreSuccess = () => {
	fetchMock
		.restore()
		.get(`${baseUrl}/${path}/show-more/${containerId}.json?dcr=true`, {
			status: 200,
			body: trails.slice(0, 6),
		});

	return ShowMore({
		containerTitle,
		path,
		containerId,
		showAge: false,
		baseUrl,
	});
};

ShowMoreSuccess.story = { name: 'ShowMore button, success' };

export const ShowMoreError = () => {
	fetchMock
		.restore()
		.get(`${baseUrl}/${path}/show-more/${containerId}.json?dcr`, {
			status: 404,
			body: null,
		});

	return ShowMore({
		containerTitle,
		path,
		containerId,
		showAge: false,
		baseUrl,
	});
};

ShowMoreError.story = { name: 'ShowMore button, error' };
