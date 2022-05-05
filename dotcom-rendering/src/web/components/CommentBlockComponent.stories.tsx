import { css } from '@emotion/react';

import { CommentBlockComponent } from './CommentBlockComponent';

export default {
	component: CommentBlockComponent,
	title: 'Components/CommentBlockComponent',
};

export const defaultStory = () => {
	return (
		<div
			css={css`
				padding: 20px;
			`}
		>
			<CommentBlockComponent
				profileURL="http://www.theguardian.com/discussion/user/id/13107777"
				profileName="Stieve"
				dateTime="30 January 2017 11:13pm"
				avatarURL="https://avatar.guim.co.uk/user/13107777"
				body="<p>I agree with many of the comments below. Capaldi is right for the role of The Doctor but it seems almost that the writing and/or settings are too small for him. Danny Pink was the most pathetic character in the show's entire history! I've not seen all of the present series but I do think they've wasted their opportunity with Mr Capaldi who can really pull off both the silliness and the profoundity.</p>"
				permalink="http://www.theguardian.com/music/2016/apr/21/readers-recommend-songs-about-climate-change#comment-72957994"
			/>
		</div>
	);
};
defaultStory.story = { name: 'default' };

export const embeddedBlockquoteStory = () => {
	const bodyContent = `
		<blockquote>
			<p>
				Children and youth are striking to demand action. But many of not most are
				themselves involved in one of the most damaging practices towards earth's
				climate, I mean consuming massive amounts of meat and diary in their diets.
			</p>
			<p>What is their thought on this regard ?</p>
		</blockquote>
		<p>
			Are they? I see young people leading on this. There's been a massive surge
			towards veganism by young people, which has resulted in a sevenfold increase
			in the UK within 5 years. Quite remarkable. And it should be recognised.
		</p>
	`;
	return (
		<div
			css={css`
				padding: 20px;
			`}
		>
			<CommentBlockComponent
				profileURL="https://profile.theguardian.com/user/id/1395989"
				profileName="George Monbiot"
				dateTime="15 March 2019 11:00am"
				avatarURL="https://avatar.guim.co.uk/user/1395989"
				body={bodyContent}
				permalink="https://www.theguardian.com/commentisfree/live/2019/mar/15/webchat-share-questions-for-george-monbiot-and-climate-strike-activists?dcr&page=with:block-5c8b9709e4b0cf92e5a57a5f#block-5c8b9709e4b0cf92e5a57a5f"
			/>
		</div>
	);
};
embeddedBlockquoteStory.story = {
	name: 'Comment block which contains a blockquote',
};
