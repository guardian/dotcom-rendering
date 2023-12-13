import { css } from '@emotion/react';
import type { CommentType } from '../../types/discussion';
import { CommentReplyPreview, Preview } from './CommentReplyPreview';

export default { title: 'Discussion/CommentReplyPreview' };

const singleLineParagraph =
	'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>';

const singleBlockParagraph =
	'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec ullamcorper ante. Nunc vitae quam eros. Donec velit turpis, posuere ut cursus sed, tristique non libero. Donec molestie metus nunc, dapibus ultrices est luctus id. Fusce fringilla metus posuere imperdiet lobortis. Proin ut egestas lorem. Etiam scelerisque dolor felis, ac fermentum ex accumsan id. Ut dignissim et orci vel lobortis. Phasellus feugiat dictum varius. Praesent eu dui ante. Duis in tempor libero, et consectetur lacus. Nunc venenatis libero nec aliquam vulputate. Etiam volutpat accumsan enim ut mollis.</p>';

const multiLBlockParagraph = `
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec ullamcorper ante. Nunc vitae quam eros. Donec velit turpis, posuere ut cursus sed, tristique non libero. Donec molestie metus nunc, dapibus ultrices est luctus id. Fusce fringilla metus posuere imperdiet lobortis. Proin ut egestas lorem. Etiam scelerisque dolor felis, ac fermentum ex accumsan id. Ut dignissim et orci vel lobortis. Phasellus feugiat dictum varius. Praesent eu dui ante. Duis in tempor libero, et consectetur lacus. Nunc venenatis libero nec aliquam vulputate. Etiam volutpat accumsan enim ut mollis.</p>

  <p>Ut molestie feugiat ligula, at suscipit est eleifend eget. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec faucibus leo eros, faucibus maximus nisi semper sit amet. Nam eu finibus nibh. Quisque venenatis lacus non velit sagittis ultrices. Duis eget elit congue, molestie odio ut, gravida est. Aliquam erat volutpat. Duis feugiat dolor nulla, non elementum lorem finibus id. Duis non nibh justo. Phasellus dapibus pulvinar nulla, vel euismod magna dapibus ut. Vivamus iaculis eros in nisl ultrices fringilla. Cras ex libero, tristique ornare interdum id, porta a mauris. Praesent nulla enim, rhoncus quis lectus sed, viverra sollicitudin mauris.</p>
`;

const commentBeingRepliedTo: CommentType = {
	id: 25487686,
	body: multiLBlockParagraph,
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

const padding = css`
	padding: 15px;
`;

export const Default = () => (
	<CommentReplyPreview commentBeingRepliedTo={commentBeingRepliedTo} />
);
Default.storyName = 'default';

export const SingleLinePreview = () => (
	<div css={padding}>
		<Preview
			commentBeingRepliedTo={{
				...commentBeingRepliedTo,
				body: singleLineParagraph,
			}}
			setDisplayReplyComment={() => {}}
			displayReplyComment={true}
		/>
	</div>
);
SingleLinePreview.storyName = 'Single line';

export const SingleBlockPreview = () => (
	<div css={padding}>
		<Preview
			commentBeingRepliedTo={{
				...commentBeingRepliedTo,
				body: singleBlockParagraph,
			}}
			setDisplayReplyComment={() => {}}
			displayReplyComment={true}
		/>
	</div>
);
SingleBlockPreview.storyName = 'Single Block';

export const MultiBlockPreview = () => (
	<div css={padding}>
		<Preview
			commentBeingRepliedTo={{
				...commentBeingRepliedTo,
				body: multiLBlockParagraph,
			}}
			setDisplayReplyComment={() => {}}
			displayReplyComment={true}
		/>
	</div>
);
MultiBlockPreview.storyName = 'Multi Block';
