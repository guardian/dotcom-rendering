import { css } from '@emotion/react';

import { CommentBlockComponent } from '@frontend/web/components/elements/CommentBlockComponent';

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
