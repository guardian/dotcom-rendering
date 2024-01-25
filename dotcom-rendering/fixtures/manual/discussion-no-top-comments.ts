import type { DiscussionResponse } from '../../src/types/discussion';

export const discussionNoTopComments = {
	status: 'ok',
	currentPage: 1,
	pages: 0,
	pageSize: 100,
	orderBy: 'oldest',
	discussion: {
		apiUrl: 'https://discussion.guardianapis.com/discussion-api/discussion//p/4v8kk',
		commentCount: 0,
		isClosedForComments: true,
		isClosedForRecommendation: true,
		topLevelCommentCount: 0,
		isThreaded: true,
		key: '/p/4v8kk',
		title: 'Stevie Nicks to release double album of songs from her past',
		webUrl: 'https://www.theguardian.com/music/2014/jul/25/stevie-nicks-ro-release-double-album-of-songs-from-her-past',
		comments: [],
	},
} satisfies DiscussionResponse;
