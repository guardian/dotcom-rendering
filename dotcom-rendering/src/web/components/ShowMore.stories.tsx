import { userEvent, within } from '@storybook/testing-library';
import fetchMock from 'fetch-mock';
import { trails } from '../../../fixtures/manual/show-more-trails';
import { ShowMore } from './ShowMore.importable';

/**
 * Clicks the 'show more' button so that Chromatic can capture it the component
 * in its 'open' state.
 */
const play = ({ canvasElement }: { canvasElement: HTMLElement }) => {
	const canvas = within(canvasElement);
	userEvent.click(canvas.getByRole('button'));
};

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

ShowMoreSuccess.play = play;
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

ShowMoreError.play = play;
ShowMoreError.story = { name: 'ShowMore button, error' };
