import { userEvent, within } from '@storybook/testing-library';
import fetchMock from 'fetch-mock';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { trails } from '../../fixtures/manual/show-more-trails';
import { ShowMore } from './ShowMore.importable';

/**
 * Clicks the 'show more' button so that Chromatic can capture it the component
 * in its 'open' state.
 */
const play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
	const canvas = within(canvasElement);
	await userEvent.click(canvas.getByRole('button'));
};

const title = 'Opinion';
const pageId = 'uk/lifestyle';
const collectionId = '5011-3940-8793-33a9';
const ajaxUrl = 'https://api.nextgen.guardianapps.co.uk';
const sectionId = 'container-id';

const defaultProps = {
	title,
	ajaxUrl,
	pageId,
	collectionId,
	sectionId,
	showAge: false,
	discussionApiUrl,
} satisfies Parameters<typeof ShowMore>[0];

export default {
	component: ShowMore,
	title: 'Components/ShowMore',
};

export const ShowMoreSuccess = () => {
	fetchMock
		.restore()
		.get(`${ajaxUrl}/${pageId}/show-more/${collectionId}.json?dcr=true`, {
			status: 200,
			body: trails.slice(0, 6),
		})
		.spy('end:.hot-update.json');

	return ShowMore(defaultProps);
};

ShowMoreSuccess.play = play;
ShowMoreSuccess.storyName = 'ShowMore button, success';

export const ShowMoreError = () => {
	fetchMock
		.restore()
		.get(`${ajaxUrl}/${pageId}/show-more/${collectionId}.json?dcr`, {
			status: 404,
			body: null,
		})
		.spy('end:.hot-update.json');

	return ShowMore(defaultProps);
};

ShowMoreError.play = play;
ShowMoreError.storyName = 'ShowMore button, error';
