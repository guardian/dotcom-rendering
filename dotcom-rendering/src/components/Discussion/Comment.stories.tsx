import { splitTheme } from '../../../.storybook/decorators/splitThemeDecorator';
import type {
	CommentType,
	Reader,
	ReplyType,
	Staff,
} from '../../lib/discussion';
import { ArticleDesign, ArticleDisplay, Pillar } from '../../lib/format';
import { ok } from '../../lib/result';
import { Comment } from './Comment';

type Props = Parameters<typeof Comment>[0];

const commentData: CommentType = {
	id: '25487686',
	body: `<p>Beau Jos pizza in Idaho Springs is a great place for <a href="https://www.theguardian.com">mountain pizza pies</a>. Order one with extra thick crust and drizzle it with honey. Y'all can try the Challenge if you fancy, and sketch on your napkins so your art can join their walls. This was 15 years ago, but I hope it's still there! As for music, anything from Boulder's own Big Head Todd &amp; the Monsters - 'Broken Hearted Savior' is a good start, with 'Bittersweet' a good road track. I'm jealous!!!</p>`,
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

const commentStaffData: CommentType = {
	...commentData,
	userProfile: {
		...commentData.userProfile,
		badge: [
			{
				name: 'Staff',
			},
		],
	},
};

const commentContributorData: CommentType = {
	...commentData,
	userProfile: {
		...commentData.userProfile,
		badge: [
			{
				name: 'Contributor',
			},
		],
	},
};

const blockedCommentData = {
	...commentData,
	status: 'blocked',
	body: "This comment was removed by a moderator because it didn't abide by our <a href='http://www.theguardian.com/community-standards'>community standards</a>. Replies may also be deleted. For more detail see <a href='http://www.guardian.co.uk/community-faqs'>our FAQs</a>.",
};

const replyCommentData: ReplyType = {
	...commentData,
	responses: undefined,
	responseTo: {
		displayName: 'ArtVandelay',
		commentApiUrl: '',
		isoDateTime: '',
		date: '',
		commentId: '123456',
		commentWebUrl: '',
	},
};

const longReplyCommentData: ReplyType = {
	...commentData,
	responses: undefined,
	responseTo: {
		displayName: 'ArtVandelayWithAVeryLongUserName',
		commentApiUrl: '',
		isoDateTime: '',
		date: '',
		commentId: '123456',
		commentWebUrl: '',
	},
};

const longBothReplyCommentData: ReplyType = {
	...commentData,
	responses: undefined,
	userProfile: {
		...commentData.userProfile,
		displayName: 'AVeryLongUserNameForThisUserToo',
	},
	responseTo: {
		displayName: 'ArtVandelayWithAVeryLongUserName',
		commentApiUrl: '',
		isoDateTime: '',
		date: '',
		commentId: '123456',
		commentWebUrl: '',
	},
};

const commentResponseError = {
	kind: 'error',
	error: 'NetworkError',
} as const;

const user: Reader = {
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

const staffUser: Staff = {
	kind: 'Staff',
	profile: {
		userId: 'abc123',
		displayName: 'Jane Smith',
		webUrl: '',
		apiUrl: '',
		avatar: '',
		secureAvatarUrl: '',
		badge: [{ name: 'Staff' }],
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
	onPick: () => Promise.resolve(commentResponseError),
	onUnpick: () => Promise.resolve(commentResponseError),
	reportAbuse: () => Promise.resolve(ok(true)),
};

const defaultFormat = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme: Pillar.News,
};

export default {
	title: 'Discussion/Comment',
	component: Comment,
	argTypes: {
		setCommentBeingRepliedTo: { action: 'setCommentBeingRepliedTo' },
		toggleMuteStatus: { action: 'toggleMuteStatus' },
		onPermalinkClick: { action: 'onPermalinkClick' },
		setPickError: { action: 'setError' },
		reportAbuse: { action: 'reportAbuse' },
	},
	args: {
		comment: commentData,
		isClosedForComments: false,
		isReply: false,
		isMuted: false,
		wasScrolledTo: false,
		pickError: '',
		isExpanded: true,
	},
};

export const Root = (args: Props) => (
	<Comment {...args} comment={commentData} />
);
Root.storyName = 'A root comment on desktop view';
Root.story = {
	parameters: {
		viewport: { defaultViewport: 'desktop' },
		chromatic: { viewports: [1300] },
	},
};
Root.decorators = [splitTheme([defaultFormat], { orientation: 'vertical' })];

export const RootMobile = Root.bind({});
RootMobile.storyName = 'A root comment on mobile view';
RootMobile.story = {
	parameters: {
		viewport: { defaultViewport: 'mobileMedium' },
		chromatic: { viewports: [375] },
	},
};
RootMobile.decorators = [
	splitTheme(
		[
			{
				...defaultFormat,
				theme: Pillar.Sport,
			},
		],
		{ orientation: 'vertical' },
	),
];

export const ReplyComment = (args: Props) => (
	<Comment {...args} comment={replyCommentData} isReply={true} />
);
ReplyComment.storyName = 'A reply on desktop view';
ReplyComment.story = {
	parameters: {
		viewport: { defaultViewport: 'desktop' },
		chromatic: { viewports: [1300] },
	},
};
ReplyComment.decorators = [
	splitTheme(
		[
			{
				...defaultFormat,
				theme: Pillar.Lifestyle,
			},
		],
		{ orientation: 'vertical' },
	),
];

export const MobileReply = ReplyComment.bind({});
MobileReply.storyName = 'A reply on mobile view';
MobileReply.story = {
	parameters: {
		viewport: { defaultViewport: 'mobileMedium' },
		chromatic: { viewports: [375] },
	},
};
MobileReply.decorators = [
	splitTheme(
		[
			{
				...defaultFormat,
				theme: Pillar.Culture,
			},
		],
		{ orientation: 'vertical' },
	),
];

export const LongMobileReply = (args: Props) => (
	<Comment {...args} comment={longReplyCommentData} />
);

LongMobileReply.storyName = 'A long username reply on mobile view';
LongMobileReply.story = {
	parameters: {
		viewport: { defaultViewport: 'mobileMedium' },
		chromatic: { viewports: [375] },
	},
};
LongMobileReply.decorators = [
	splitTheme(
		[
			{
				...defaultFormat,
				theme: Pillar.Culture,
			},
		],
		{ orientation: 'vertical' },
	),
];

export const LongBothMobileReply = (args: Props) => (
	<Comment {...args} comment={longBothReplyCommentData} />
);
LongBothMobileReply.storyName = 'Both long usernames replying on mobile view';
LongBothMobileReply.story = {
	parameters: {
		viewport: { defaultViewport: 'mobileMedium' },
		chromatic: { viewports: [375] },
	},
};
LongBothMobileReply.decorators = [
	splitTheme(
		[
			{
				...defaultFormat,
				theme: Pillar.Culture,
			},
		],
		{ orientation: 'vertical' },
	),
];

export const PickedComment = (args: Props) => (
	<Comment
		{...args}
		comment={{
			...commentData,
			isHighlighted: true,
		}}
	/>
);
PickedComment.storyName = 'Picked Comment';
PickedComment.decorators = [
	splitTheme(
		[
			{
				...defaultFormat,
				theme: Pillar.Culture,
			},
		],
		{ orientation: 'vertical' },
	),
];

export const StaffUserComment = (args: Props) => (
	<Comment {...args} comment={commentStaffData} />
);
StaffUserComment.storyName = 'Staff User Comment';
StaffUserComment.decorators = [
	splitTheme(
		[
			{
				...defaultFormat,
				theme: Pillar.Opinion,
			},
		],
		{ orientation: 'vertical' },
	),
];

export const ContributorUserComment = (args: Props) => (
	<Comment {...args} comment={commentContributorData} />
);
ContributorUserComment.storyName = 'Contributor User Comment';
ContributorUserComment.decorators = [
	splitTheme(
		[
			{
				...defaultFormat,
				theme: Pillar.Opinion,
			},
		],
		{ orientation: 'vertical' },
	),
];

export const PickedStaffUserComment = (args: Props) => (
	<Comment
		{...args}
		comment={{
			...commentStaffData,
			isHighlighted: true,
		}}
	/>
);
PickedStaffUserComment.storyName = 'with staff and picked badges on desktop';
PickedStaffUserComment.story = {
	parameters: {
		viewport: { defaultViewport: 'desktop' },
		chromatic: { viewports: [1300] },
	},
};
PickedStaffUserComment.decorators = [
	splitTheme([defaultFormat], { orientation: 'vertical' }),
];

export const PickedStaffUserCommentMobile = PickedStaffUserComment.bind({});
PickedStaffUserCommentMobile.storyName =
	'with staff and picked badges on mobile';
PickedStaffUserCommentMobile.story = {
	parameters: {
		viewport: { defaultViewport: 'mobileMedium' },
		chromatic: { viewports: [375] },
	},
};
PickedStaffUserCommentMobile.decorators = [
	splitTheme(
		[
			{
				...defaultFormat,
				theme: Pillar.Sport,
			},
		],
		{ orientation: 'vertical' },
	),
];

export const ContributorUserCommentDesktop = (args: Props) => (
	<Comment
		{...args}
		comment={{
			...commentContributorData,
			isHighlighted: true,
		}}
	/>
);
ContributorUserCommentDesktop.storyName =
	'with contributor and picked badges on desktop';
ContributorUserCommentDesktop.story = {
	parameters: {
		viewport: { defaultViewport: 'desktop' },
		chromatic: { viewports: [1300] },
	},
};
ContributorUserCommentDesktop.decorators = [
	splitTheme([defaultFormat], { orientation: 'vertical' }),
];

export const ContributorUserCommentMobile = ContributorUserCommentDesktop.bind(
	{},
);
ContributorUserCommentMobile.storyName =
	'with contributor and picked badges on mobile';
ContributorUserCommentMobile.story = {
	parameters: {
		viewport: { defaultViewport: 'mobileMedium' },
		chromatic: { viewports: [375] },
	},
};
ContributorUserCommentMobile.decorators = [
	splitTheme(
		[
			{
				...defaultFormat,
				theme: Pillar.Sport,
			},
		],
		{ orientation: 'vertical' },
	),
];

export const LoggedInAsModerator = (args: Props) => (
	<Comment {...args} comment={commentData} user={staffUser} />
);
LoggedInAsModerator.storyName = 'Logged in as moderator';
LoggedInAsModerator.decorators = [
	splitTheme(
		[
			{
				...defaultFormat,
				theme: Pillar.Lifestyle,
			},
		],
		{ orientation: 'vertical' },
	),
];

export const LoggedInAsUser = (args: Props) => (
	<Comment {...args} comment={commentData} user={user} />
);
LoggedInAsUser.storyName = 'Logged in as normal user';
LoggedInAsUser.decorators = [
	splitTheme(
		[
			{
				...defaultFormat,
				theme: Pillar.Lifestyle,
			},
		],
		{ orientation: 'vertical' },
	),
];

export const BlockedComment = (args: Props) => (
	<Comment {...args} comment={blockedCommentData} />
);
BlockedComment.storyName = 'Blocked comment';
BlockedComment.decorators = [
	splitTheme(
		[
			{
				...defaultFormat,
				theme: Pillar.Culture,
			},
		],
		{ orientation: 'vertical' },
	),
];

export const MutedComment = (args: Props) => (
	<Comment {...args} comment={blockedCommentData} isMuted={true} />
);
MutedComment.storyName = 'Muted comment';
MutedComment.decorators = [
	splitTheme(
		[
			{
				...defaultFormat,
				theme: Pillar.Sport,
			},
		],
		{ orientation: 'vertical' },
	),
];

export const ClosedForComments = (args: Props) => (
	<Comment {...args} comment={commentData} isClosedForComments={true} />
);
ClosedForComments.storyName = 'A closed comment on desktop view';
ClosedForComments.story = {
	parameters: {
		viewport: { defaultViewport: 'desktop' },
		chromatic: { viewports: [1300] },
	},
};
ClosedForComments.decorators = [
	splitTheme([defaultFormat], { orientation: 'vertical' }),
];
