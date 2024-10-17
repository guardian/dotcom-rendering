import { userEvent, within } from '@storybook/test';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { trails } from '../../fixtures/manual/show-more-trails';
import { customMockFetch } from '../lib/mockRESTCalls';
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
const editionId = 'UK';

const defaultProps = {
	title,
	ajaxUrl,
	pageId,
	collectionId,
	sectionId,
	showAge: false,
	discussionApiUrl,
	editionId,
} satisfies Parameters<typeof ShowMore>[0];

export default {
	component: ShowMore,
	title: 'Components/ShowMore',
};

const mockShowMoreSuccessRequestFetch = customMockFetch([
	{
		mockedMethod: 'GET',
		mockedUrl: `${ajaxUrl}/${pageId}/show-more/${collectionId}.json?dcr=true`,
		mockedStatus: 200,
		mockedBody: trails.slice(0, 6),
	},
]);

const mockShowMoreErrorRequestFetch = customMockFetch([
	{
		mockedMethod: 'GET',
		mockedUrl: `${ajaxUrl}/${pageId}/show-more/${collectionId}.json?dcr=true`,
		mockedStatus: 400,
		mockedBody: undefined,
	},
]);

export const ShowMoreSuccess = () => {
	global.fetch = mockShowMoreSuccessRequestFetch;

	return ShowMore(defaultProps);
};

ShowMoreSuccess.play = play;
ShowMoreSuccess.storyName = 'ShowMore button, success';

export const ShowMoreError = () => {
	global.fetch = mockShowMoreErrorRequestFetch;

	return ShowMore(defaultProps);
};

ShowMoreError.play = play;
ShowMoreError.storyName = 'ShowMore button, error';
