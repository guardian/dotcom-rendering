import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { SignedInAs } from './SignedInAs';

const aUser = {
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
};

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			width: 220px;
			padding: 20px;
		`}
	>
		{children}
	</div>
);

export default {
	component: SignedInAs,
	title: 'Components/SignedInAs',
};

export const SignedIn = () => {
	return (
		<Wrapper>
			<SignedInAs
				enableDiscussionSwitch={true}
				commentCount={3}
				user={aUser}
			/>
		</Wrapper>
	);
};
SignedIn.storyName = 'when signed in';
SignedIn.decorators = [
	splitTheme([
		{
			theme: Pillar.News,
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
		},
	]),
];

export const Image = () => {
	return (
		<Wrapper>
			<SignedInAs
				enableDiscussionSwitch={true}
				commentCount={32}
				user={{
					...aUser,
					secureAvatarUrl: 'https://avatar.guim.co.uk/user/101885881',
				}}
			/>
		</Wrapper>
	);
};
Image.storyName = 'when signed in with an avatar set';
Image.decorators = [
	splitTheme([
		{
			theme: Pillar.Culture,
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
		},
	]),
];

export const Banned = () => {
	return (
		<Wrapper>
			<SignedInAs
				enableDiscussionSwitch={true}
				commentCount={32}
				user={{
					...aUser,
					privateFields: {
						...aUser.privateFields,
						canPostComment: false,
					},
				}}
			/>
		</Wrapper>
	);
};
Banned.storyName = 'when user is banned';
Banned.decorators = [
	splitTheme([
		{
			theme: Pillar.Culture,
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
		},
	]),
];

export const NoDisplayName = () => {
	return (
		<Wrapper>
			<SignedInAs
				enableDiscussionSwitch={true}
				commentCount={32}
				user={{
					...aUser,
					displayName: '',
				}}
			/>
		</Wrapper>
	);
};
NoDisplayName.storyName = 'before a display name has been set';
NoDisplayName.decorators = [
	splitTheme([
		{
			theme: Pillar.News,
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
		},
	]),
];

export const NotSignedIn = () => {
	return (
		<Wrapper>
			<SignedInAs enableDiscussionSwitch={true} commentCount={32} />
		</Wrapper>
	);
};
NotSignedIn.storyName = 'when the discussion is open but user is not signed in';
NotSignedIn.decorators = [
	splitTheme([
		{
			theme: Pillar.Lifestyle,
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
		},
	]),
];

export const DiscussionClosed = () => {
	return (
		<Wrapper>
			<SignedInAs
				enableDiscussionSwitch={true}
				commentCount={32}
				isClosedForComments={true}
				user={aUser}
			/>
		</Wrapper>
	);
};
DiscussionClosed.storyName =
	'when the discussion is closed and the user is signed in';
DiscussionClosed.decorators = [
	splitTheme([
		{
			theme: Pillar.Opinion,
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
		},
	]),
];

export const DiscussionClosedSignedOut = () => {
	return (
		<Wrapper>
			<SignedInAs
				enableDiscussionSwitch={true}
				commentCount={32}
				isClosedForComments={true}
			/>
		</Wrapper>
	);
};
DiscussionClosedSignedOut.storyName =
	'when the discussion is closed and the user is signed out';
DiscussionClosedSignedOut.decorators = [
	splitTheme([
		{
			theme: Pillar.Sport,
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
		},
	]),
];

export const DiscussionDisabled = () => {
	return (
		<Wrapper>
			<SignedInAs
				enableDiscussionSwitch={false}
				commentCount={32}
				isClosedForComments={false}
				user={aUser}
			/>
		</Wrapper>
	);
};
DiscussionDisabled.storyName =
	'with discussion disabled sitewide and the user signed in';
DiscussionDisabled.decorators = [
	splitTheme([
		{
			theme: Pillar.Opinion,
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
		},
	]),
];

export const DiscussionDisabledSignedOut = () => {
	return (
		<Wrapper>
			<SignedInAs
				enableDiscussionSwitch={false}
				commentCount={32}
				isClosedForComments={false}
			/>
		</Wrapper>
	);
};
DiscussionDisabledSignedOut.storyName =
	'with discussion disabled sitewide and the user signed out';
DiscussionDisabledSignedOut.decorators = [
	splitTheme([
		{
			theme: Pillar.Opinion,
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
		},
	]),
];

export const Apps = () => {
	return (
		<Wrapper>
			<SignedInAs
				enableDiscussionSwitch={false}
				commentCount={32}
				isClosedForComments={false}
			/>
		</Wrapper>
	);
};
Apps.parameters = { config: { renderingTarget: 'Apps' } };
Apps.decorators = [
	splitTheme(
		[
			{
				theme: Pillar.News,
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
			},
			{
				theme: Pillar.Culture,
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
			},
			{
				theme: Pillar.Sport,
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
			},
			{
				theme: Pillar.Opinion,
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
			},
		],
		{
			orientation: 'vertical',
		},
	),
];
