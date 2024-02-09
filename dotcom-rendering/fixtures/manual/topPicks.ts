import type { GetDiscussionSuccess } from '../../src/lib/discussion';

export const topPicks = {
	status: 'ok',
	currentPage: 1,
	pages: 1,
	pageSize: 50,
	orderBy: 'oldest',
	discussion: {
		key: '/p/39f5z',
		webUrl: 'https://www.theguardian.com/science/grrlscientist/2012/aug/07/3',
		apiUrl: 'https://discussion.guardianapis.com/discussion-api/discussion//p/39f5z',
		commentCount: 496,
		topLevelCommentCount: 405,
		isClosedForComments: false,
		isClosedForRecommendation: false,
		isThreaded: true,
		title: 'Mystery bird: black-and-red broadbill, Cymbirhynchus macrorhynchos story',
		comments: [
			{
				id: 37678414,
				body: '<p>This is how <code>code</code> looks. And this is how <del>strikethrough</del> looks</p><p><strong>strong</strong></p><p><i>italic</i></p><p><blockquote><p>blockquote</p></blockquote></p><p><a href="http://www.mydomain.com">link to mydomain.com</a></p><p>And this is what get withareallyreallyreallylonglonglongwordthatissupersuperlonglikelonnnnngggggggggImeanreallylong</p></p>',
				date: '02 July 2014 11:20am',
				isoDateTime: '2014-07-02T10:20:56Z',
				status: 'visible',
				webUrl: 'https://discussion.theguardian.com/comment-permalink/37678414',
				apiUrl: 'https://discussion.guardianapis.com/discussion-api/comment/37678414',
				numRecommends: 0,
				isHighlighted: false,
				userProfile: {
					userId: '2310959',
					displayName: 'jamesgorrie',
					webUrl: 'https://profile.theguardian.com/user/id/2310959',
					apiUrl: 'https://discussion.guardianapis.com/discussion-api/profile/2310959',
					avatar: 'https://avatar.guim.co.uk/user/2310959',
					secureAvatarUrl: 'https://avatar.guim.co.uk/user/2310959',
					badge: [
						{
							name: 'Staff',
						},
					],
				},
			},
			{
				id: 37772513,
				body: '<p>Lovely chickens! <a href="http://www.mydomain.com">https://www.supersupersuperlongdomainnameImeanitneverstopsatallevereveritmakesyouwonderiftheremightbealimittothesethings.com</a></p>',
				date: '04 July 2014 1:57pm',
				isoDateTime: '2014-07-04T12:57:48Z',
				status: 'visible',
				webUrl: 'https://discussion.theguardian.com/comment-permalink/37772513',
				apiUrl: 'https://discussion.guardianapis.com/discussion-api/comment/37772513',
				numRecommends: 1,
				isHighlighted: false,
				userProfile: {
					userId: '2310959',
					displayName: 'jamesgorrie',
					webUrl: 'https://profile.theguardian.com/user/id/2310959',
					apiUrl: 'https://discussion.guardianapis.com/discussion-api/profile/2310959',
					avatar: 'https://avatar.guim.co.uk/user/2310959',
					secureAvatarUrl: 'https://avatar.guim.co.uk/user/2310959',
					badge: [
						{
							name: 'Staff',
						},
					],
				},
			},
		],
	},
} satisfies GetDiscussionSuccess;
