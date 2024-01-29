import type { GetDiscussionSuccess } from '../../src/types/discussion';

export const discussionWithNoComments = {
	status: 'ok',
	currentPage: 1,
	pages: 0,
	pageSize: 100,
	orderBy: 'oldest',
	discussion: {
		key: '/p/39f5x',
		webUrl: 'https://www.theguardian.com/science/grrlscientist/2012/aug/07/3',
		apiUrl: 'https://discussion.guardianapis.com/discussion-api/discussion//p/39f5x',
		commentCount: 0,
		topLevelCommentCount: 0,
		isClosedForComments: false,
		isClosedForRecommendation: false,
		isThreaded: true,
		title: 'Mystery bird: black-and-red broadbill, Cymbirhynchus macrorhynchos story',
		comments: [],
	},
} satisfies GetDiscussionSuccess;
