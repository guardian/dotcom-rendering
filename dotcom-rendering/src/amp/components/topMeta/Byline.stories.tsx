import { Byline } from './Byline';

const guardianBaseURL = 'https://theguardian.com';

export default {
	component: Byline,
	title: 'AMP/Components/topMeta/Byline',
};

export const SingleByline = () => (
	<Byline
		byline="Eva Smith and friends"
		guardianBaseURL={guardianBaseURL}
		tags={[
			{
				id: 'eva-smith',
				type: 'Contributor',
				title: 'Eva Smith',
			},
		]}
	/>
);

SingleByline.story = { name: 'Byline with single contributor tag' };

export const MultipleByline = () => (
	<Byline
		byline="Eva Smith and Duncan Campbell"
		guardianBaseURL={guardianBaseURL}
		tags={[
			{
				id: 'eva-smith',
				type: 'Contributor',
				title: 'Eva Smith',
			},
			{
				id: 'duncan-campbell',
				type: 'Contributor',
				title: 'Duncan Campbell',
			},
		]}
	/>
);

MultipleByline.story = { name: 'Byline with multiple contributors' };

export const MultipleDuplicateByline = () => (
	<Byline
		byline="Duncan Campbell and Duncan Campbell"
		guardianBaseURL={guardianBaseURL}
		tags={[
			{
				id: 'duncan-campbell',
				type: 'Contributor',
				title: 'Duncan Campbell',
			},
			{
				id: 'duncan-campbell-1',
				type: 'Contributor',
				title: 'Duncan Campbell',
			},
		]}
	/>
);

MultipleDuplicateByline.story = {
	name: 'Byline w/ contributors with identical names',
};
