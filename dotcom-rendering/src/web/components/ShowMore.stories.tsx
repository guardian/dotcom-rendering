import fetchMock from 'fetch-mock';
import { trails } from '../../../fixtures/manual/show-more-trails';
import { ShowMore } from './ShowMore.importable';

const containerTitle = 'Opinion';
const path = 'uk/lifestyle';
const containerId = '5011-3940-8793-33a9';

export default {
	component: ShowMore,
	title: 'Components/ShowMore',
};

export const ShowMoreSuccess = () => {
	fetchMock
		.restore()
		.get(
			`https://api.nextgen.guardianapps.co.uk/${path}/show-more/${containerId}.json?dcr=true`,
			{
				status: 200,
				body: trails.slice(0, 6),
			},
		);

	return ShowMore({
		containerTitle,
		path,
		containerId,
		showAge: false,
	});
};

ShowMoreSuccess.story = { name: 'ShowMore button, success' };

export const ShowMoreError = () => {
	fetchMock
		.restore()
		.get(
			`https://api.nextgen.guardianapps.co.uk/${path}/show-more/${containerId}.json?dcr`,
			{
				status: 404,
				body: null,
			},
		);

	return ShowMore({
		containerTitle,
		path,
		containerId,
		showAge: false,
	});
};

ShowMoreError.story = { name: 'ShowMore button, error' };
