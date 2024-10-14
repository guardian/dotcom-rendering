import { userEvent, within } from '@storybook/test';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { trails } from '../../fixtures/manual/show-more-trails';
import { ShowMore } from './ShowMore.importable';
import { customMockedFetch } from '../lib/mockRESTCalls';

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

const showMoreSuccessRequest = customMockedFetch([
	{
		mockedMethod: 'GET',
		mockedUrl: `${ajaxUrl}/${pageId}/show-more/${collectionId}.json?dcr=true`,
		mockedStatus: 200,
		mockedBody: trails.slice(0, 6),
	},
]);

const showMoreErrorRequest = customMockedFetch([
	{
		mockedMethod: 'GET',
		mockedUrl: `${ajaxUrl}/${pageId}/show-more/${collectionId}.json?dcr=true`,
		mockedStatus: 400,
		mockedBody: undefined,
	},
]);

export const ShowMoreSuccess = () => {
	global.fetch = showMoreSuccessRequest;

	return ShowMore(defaultProps);
};

ShowMoreSuccess.play = play;
ShowMoreSuccess.storyName = 'ShowMore button, success';

export const ShowMoreError = () => {
	global.fetch = showMoreErrorRequest;

	return ShowMore(defaultProps);
};

ShowMoreError.play = play;
ShowMoreError.storyName = 'ShowMore button, error';
