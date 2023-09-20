import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { decidePalette } from '../lib/decidePalette';
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
				palette={decidePalette({
					theme: Pillar.News,
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
				})}
				enableDiscussionSwitch={true}
				commentCount={3}
				user={aUser}
			/>
		</Wrapper>
	);
};
SignedIn.storyName = 'when signed in';

export const Image = () => {
	return (
		<Wrapper>
			<SignedInAs
				palette={decidePalette({
					theme: Pillar.Culture,
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
				})}
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

export const Banned = () => {
	return (
		<Wrapper>
			<SignedInAs
				palette={decidePalette({
					theme: Pillar.Culture,
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
				})}
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

export const NoDisplayName = () => {
	return (
		<Wrapper>
			<SignedInAs
				palette={decidePalette({
					theme: Pillar.News,
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
				})}
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

export const NotSignedIn = () => {
	return (
		<Wrapper>
			<SignedInAs
				palette={decidePalette({
					theme: Pillar.Lifestyle,
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
				})}
				enableDiscussionSwitch={true}
				commentCount={32}
			/>
		</Wrapper>
	);
};
NotSignedIn.storyName = 'when the discussion is open but user is not signed in';

export const DiscussionClosed = () => {
	return (
		<Wrapper>
			<SignedInAs
				palette={decidePalette({
					theme: Pillar.Opinion,
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
				})}
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

export const DiscussionClosedSignedOut = () => {
	return (
		<Wrapper>
			<SignedInAs
				palette={decidePalette({
					theme: Pillar.Sport,
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
				})}
				enableDiscussionSwitch={true}
				commentCount={32}
				isClosedForComments={true}
			/>
		</Wrapper>
	);
};
DiscussionClosedSignedOut.storyName =
	'when the discussion is closed and the user is signed out';

export const DiscussionDisabled = () => {
	return (
		<Wrapper>
			<SignedInAs
				palette={decidePalette({
					theme: Pillar.Opinion,
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
				})}
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

export const DiscussionDisabledSignedOut = () => {
	return (
		<Wrapper>
			<SignedInAs
				palette={decidePalette({
					theme: Pillar.Opinion,
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
				})}
				enableDiscussionSwitch={false}
				commentCount={32}
				isClosedForComments={false}
			/>
		</Wrapper>
	);
};
DiscussionDisabledSignedOut.storyName =
	'with discussion disabled sitewide and the user signed out';
