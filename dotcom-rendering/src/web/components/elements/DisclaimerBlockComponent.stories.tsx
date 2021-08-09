import { css } from '@emotion/react';

import { DisclaimerBlockComponent } from './DisclaimerBlockComponent';

export default {
	component: DisclaimerBlockComponent,
	title: 'Components/DisclaimerBlockComponent',
};

const containerStyles = css`
	max-width: 620px;
	margin: 20px;
`;

export const defaultStory = () => {
	return (
		<div css={containerStyles}>
			<DisclaimerBlockComponent
				html={
					'<p><sup>This is a disclaimer and it could have <a href="#">link text in it</a>.</sup></p>'
				}
			/>
		</div>
	);
};
defaultStory.story = { name: 'Default Disclaimer' };

export const OpinionStory = () => {
	return (
		<div css={containerStyles}>
			<DisclaimerBlockComponent
				html={
					'<p><sup>This is an Opinion disclaimer and it could have <a href="#">link text in it</a>.</sup></p>'
				}
			/>
		</div>
	);
};
OpinionStory.story = { name: 'Opinion Disclaimer' };
