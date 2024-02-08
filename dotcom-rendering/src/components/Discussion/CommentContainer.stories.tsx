import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { splitTheme } from '../../../.storybook/decorators/splitThemeDecorator';
import type { CommentType, Reader } from '../../lib/discussion';
import { ok } from '../../lib/result';
import { CommentContainer } from './CommentContainer';

export default { title: 'Discussion/CommentContainer' };

const commentData: CommentType = {
	id: 25487686,
	body: "<p>Beau Jos pizza in Idaho Springs is a great place for mountain pizza pies. Order one with extra thick crust and drizzle it with honey. Y'all can try the Challenge if you fancy, and sketch on your napkins so your art can join their walls. This was 15 years ago, but I hope it's still there! As for music, anything from Boulder's own Big Head Todd &amp; the Monsters - 'Broken Hearted Savior' is a good start, with 'Bittersweet' a good road track. I'm jealous!!!</p>",
	date: '26 July 2013 4:13pm',
	isoDateTime: '2013-07-26T15:13:20Z',
	status: 'visible',
	webUrl: 'https://discussion.theguardian.com/comment-permalink/25487686',
	apiUrl: 'https://discussion.guardianapis.com/discussion-api/comment/25487686',
	numRecommends: 0,
	isHighlighted: false,
	userProfile: {
		userId: '2762428',
		displayName: 'FrankDeFord',
		webUrl: 'https://profile.theguardian.com/user/id/2762428',
		apiUrl: 'https://discussion.guardianapis.com/discussion-api/profile/2762428',
		avatar: 'https://avatar.guim.co.uk/user/2762428',
		secureAvatarUrl: 'https://avatar.guim.co.uk/user/2762428',
		badge: [],
	},
	responses: [],
	metaData: {
		commentCount: 2,
		staffCommenterCount: 1,
		editorsPickCount: 0,
		blockedCount: 0,
		responseCount: 1,
	},
};

const threadComment: CommentType = {
	id: 25488498,
	body: "<p>It's still there FrankDeFord - and thanks, I will pass that on</p>",
	date: '26 July 2013 4:35pm',
	isoDateTime: '2013-07-26T15:13:20Z',
	status: 'visible',
	webUrl: 'https://discussion.theguardian.com/comment-permalink/25488498',
	apiUrl: 'https://discussion.guardianapis.com/discussion-api/comment/25488498',
	numRecommends: 0,
	isHighlighted: false,
	responseTo: {
		displayName: 'FrankDeFord',
		commentApiUrl:
			'https://discussion.guardianapis.com/discussion-api/comment/25487686',
		isoDateTime: '2013-07-26T15:13:20Z',
		date: '26 July 2013 4:13pm',
		commentId: '25487686',
		commentWebUrl:
			'https://discussion.theguardian.com/comment-permalink/25487686',
	},
	userProfile: {
		userId: '3150446',
		displayName: 'AndyPietrasik',
		webUrl: 'https://profile.theguardian.com/user/id/3150446',
		apiUrl: 'https://discussion.guardianapis.com/discussion-api/profile/3150446',
		avatar: 'https://avatar.guim.co.uk/user/3150446',
		secureAvatarUrl: 'https://avatar.guim.co.uk/user/3150446',
		badge: [
			{
				name: 'Staff',
			},
		],
	},
};

const threadCommentWithLongUsernames: CommentType = {
	id: 25488498,
	body: "<p>It's still there FrankDeFord - and thanks, I will pass that on</p>",
	date: '26 July 2013 4:35pm',
	isoDateTime: '2013-07-26T15:13:20Z',
	status: 'visible',
	webUrl: 'https://discussion.theguardian.com/comment-permalink/25488498',
	apiUrl: 'https://discussion.guardianapis.com/discussion-api/comment/25488498',
	numRecommends: 0,
	isHighlighted: false,
	responseTo: {
		displayName: 'FrankDeFord',
		commentApiUrl:
			'https://discussion.guardianapis.com/discussion-api/comment/25487686',
		isoDateTime: '2013-07-26T15:13:20Z',
		date: '26 July 2013 4:13pm',
		commentId: '25487686',
		commentWebUrl:
			'https://discussion.theguardian.com/comment-permalink/25487686',
	},
	userProfile: {
		userId: '3150446',
		displayName: 'ThisIsAVeryLongUserNameTooLongInFact',
		webUrl: 'https://profile.theguardian.com/user/id/3150446',
		apiUrl: 'https://discussion.guardianapis.com/discussion-api/profile/3150446',
		avatar: 'https://avatar.guim.co.uk/user/3150446',
		secureAvatarUrl: 'https://avatar.guim.co.uk/user/3150446',
		badge: [
			{
				name: 'Staff',
			},
		],
	},
};

const commentDataWithLongThread: CommentType = {
	id: 25487686,
	body: "<p>Beau Jos pizza in Idaho Springs is a great place for mountain pizza pies. Order one with extra thick crust and drizzle it with honey. Y'all can try the Challenge if you fancy, and sketch on your napkins so your art can join their walls. This was 15 years ago, but I hope it's still there! As for music, anything from Boulder's own Big Head Todd &amp; the Monsters - 'Broken Hearted Savior' is a good start, with 'Bittersweet' a good road track. I'm jealous!!!</p>",
	date: '26 July 2013 4:13pm',
	isoDateTime: '2013-07-26T15:13:20Z',
	status: 'visible',
	webUrl: 'https://discussion.theguardian.com/comment-permalink/25487686',
	apiUrl: 'https://discussion.guardianapis.com/discussion-api/comment/25487686',
	numRecommends: 0,
	isHighlighted: false,
	userProfile: {
		userId: '2762428',
		displayName: 'FrankDeFord',
		webUrl: 'https://profile.theguardian.com/user/id/2762428',
		apiUrl: 'https://discussion.guardianapis.com/discussion-api/profile/2762428',
		avatar: 'https://avatar.guim.co.uk/user/2762428',
		secureAvatarUrl: 'https://avatar.guim.co.uk/user/2762428',
		badge: [],
	},
	responses: [],
	metaData: {
		commentCount: 6,
		staffCommenterCount: 1,
		editorsPickCount: 0,
		blockedCount: 0,
		responseCount: 5,
	},
};

const commentResponseError = {
	kind: 'error',
	error: 'NetworkError',
} as const;

const aUser: Reader = {
	kind: 'Reader',
	profile: {
		userId: 'abc123',
		displayName: 'Jane Smith',
		webUrl: '',
		apiUrl: '',
		avatar: '',
		secureAvatarUrl: '',
		badge: [],
		privateFields: {
			canPostComment: true,
			isPremoderated: false,
			hasCommented: true,
		},
	},
	onComment: () => Promise.resolve(commentResponseError),
	onReply: () => Promise.resolve(commentResponseError),
	onRecommend: () => Promise.resolve(true),
	addUsername: () => Promise.resolve(ok(true)),
	reportAbuse: () => Promise.resolve(ok(true)),
};

const commentDataThreaded: CommentType = {
	...commentData,
	...{
		responses: [threadComment],
	},
};

const commentDataThreadedWithLongThread: CommentType = {
	...commentDataWithLongThread,
	...{
		responses: [threadComment],
	},
};

const commentDataThreadedWithLongUserNames: CommentType = {
	...commentData,
	...{
		responses: [threadCommentWithLongUsernames],
	},
};

const format = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme: Pillar.News,
};

export const defaultStory = () => (
	<CommentContainer
		comment={commentData}
		isClosedForComments={false}
		shortUrl="randomShortURL"
		user={aUser}
		threads="collapsed"
		setCommentBeingRepliedTo={(comment) => {}}
		mutes={[]}
		toggleMuteStatus={() => {}}
		onPermalinkClick={() => {}}
		showPreview={false}
		setShowPreview={() => {}}
		isCommentFormActive={false}
		setIsCommentFormActive={() => {}}
		error={''}
		setError={() => {}}
		pickError={''}
		setPickError={() => {}}
		userNameMissing={false}
		setUserNameMissing={() => {}}
		previewBody=""
		setPreviewBody={() => {}}
		body={''}
		setBody={() => {}}
		reportAbuse={() => Promise.resolve(ok(true))}
	/>
);
defaultStory.storyName = 'default';
defaultStory.decorators = [
	splitTheme(
		[
			{
				...format,
				theme: Pillar.Sport,
			},
		],
		{ orientation: 'vertical' },
	),
];

export const threadedComment = () => (
	<CommentContainer
		comment={commentDataThreaded}
		isClosedForComments={false}
		shortUrl="randomShortURL"
		user={aUser}
		threads="collapsed"
		setCommentBeingRepliedTo={(comment) => {}}
		mutes={[]}
		toggleMuteStatus={() => {}}
		onPermalinkClick={() => {}}
		showPreview={false}
		setShowPreview={() => {}}
		isCommentFormActive={false}
		setIsCommentFormActive={() => {}}
		error={''}
		setError={() => {}}
		pickError={''}
		setPickError={() => {}}
		userNameMissing={false}
		setUserNameMissing={() => {}}
		previewBody=""
		setPreviewBody={() => {}}
		body={''}
		setBody={() => {}}
		reportAbuse={() => Promise.resolve(ok(true))}
	/>
);
threadedComment.storyName = 'threaded';
threadedComment.decorators = [
	splitTheme(
		[
			{
				...format,
				theme: Pillar.Lifestyle,
			},
		],
		{ orientation: 'vertical' },
	),
];

export const threadedCommentWithShowMore = () => (
	<CommentContainer
		comment={commentDataThreadedWithLongThread}
		isClosedForComments={false}
		shortUrl="randomShortURL"
		user={aUser}
		threads="collapsed"
		setCommentBeingRepliedTo={(comment) => {}}
		mutes={[]}
		toggleMuteStatus={() => {}}
		onPermalinkClick={() => {}}
		showPreview={false}
		setShowPreview={() => {}}
		isCommentFormActive={false}
		setIsCommentFormActive={() => {}}
		error={''}
		setError={() => {}}
		pickError={''}
		setPickError={() => {}}
		userNameMissing={false}
		setUserNameMissing={() => {}}
		previewBody=""
		setPreviewBody={() => {}}
		body={''}
		setBody={() => {}}
		reportAbuse={() => Promise.resolve(ok(true))}
	/>
);
threadedCommentWithShowMore.storyName = 'threaded with show more button';
threadedCommentWithShowMore.decorators = [
	splitTheme(
		[
			{
				...format,
				theme: Pillar.Lifestyle,
			},
		],
		{ orientation: 'vertical' },
	),
];

export const threadedCommentWithLongUsernames = () => (
	<CommentContainer
		comment={commentDataThreadedWithLongUserNames}
		isClosedForComments={false}
		shortUrl="randomShortURL"
		user={aUser}
		threads="collapsed"
		setCommentBeingRepliedTo={(comment) => {}}
		mutes={[]}
		toggleMuteStatus={() => {}}
		onPermalinkClick={() => {}}
		showPreview={false}
		setShowPreview={() => {}}
		isCommentFormActive={false}
		setIsCommentFormActive={() => {}}
		error={''}
		setError={() => {}}
		pickError={''}
		setPickError={() => {}}
		userNameMissing={false}
		setUserNameMissing={() => {}}
		previewBody=""
		setPreviewBody={() => {}}
		body={''}
		setBody={() => {}}
		reportAbuse={() => Promise.resolve(ok(true))}
	/>
);
threadedCommentWithLongUsernames.storyName = 'threaded with long usernames';
threadedCommentWithLongUsernames.decorators = [
	splitTheme(
		[
			{
				...format,
				theme: Pillar.Lifestyle,
			},
		],
		{ orientation: 'vertical' },
	),
];

export const threadedCommentWithLongUsernamesMobile = () => (
	<CommentContainer
		comment={commentDataThreadedWithLongUserNames}
		isClosedForComments={false}
		shortUrl="randomShortURL"
		user={aUser}
		threads="collapsed"
		setCommentBeingRepliedTo={(comment) => {}}
		mutes={[]}
		toggleMuteStatus={() => {}}
		onPermalinkClick={() => {}}
		showPreview={false}
		setShowPreview={() => {}}
		isCommentFormActive={false}
		setIsCommentFormActive={() => {}}
		error={''}
		setError={() => {}}
		pickError={''}
		setPickError={() => {}}
		userNameMissing={false}
		setUserNameMissing={() => {}}
		previewBody=""
		setPreviewBody={() => {}}
		body={''}
		setBody={() => {}}
		reportAbuse={() => Promise.resolve(ok(true))}
	/>
);
threadedCommentWithLongUsernamesMobile.storyName =
	'threaded with long usernames on mobile display';
threadedCommentWithLongUsernamesMobile.story = {
	parameters: {
		viewport: { defaultViewport: 'mobileMedium' },
		chromatic: { viewports: [375] },
	},
};
threadedCommentWithLongUsernamesMobile.decorators = [
	splitTheme(
		[
			{
				...format,
				theme: Pillar.Lifestyle,
			},
		],
		{ orientation: 'vertical' },
	),
];
