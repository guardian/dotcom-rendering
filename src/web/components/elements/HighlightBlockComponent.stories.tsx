import { css } from 'emotion';

import { HighlightBlockComponent } from '@frontend/web/components/elements/HighlightBlockComponent';

const htmlwithBlockquotes =
	'<blockquote>We’ve now got evidence that under <a href="https://www.theguardian.com/politics/boris-johnson">Boris Johnson</a> the NHS is on the table and will be up for sale. He tried to cover it up in a secret agenda but today it’s been exposed.</blockquote>';

const htmlwithPTags =
	'<p>We’ve now got evidence that under <a href="https://www.theguardian.com/politics/boris-johnson">Boris Johnson</a> the NHS is on the table and will be up for sale. He tried to cover it up in a secret agenda but today it’s been exposed.</p>';

export default {
	component: HighlightBlockComponent,
	title: 'Components/HighlightBlockComponent',
};

const containerStyles = css`
	max-width: 620px;
	margin: 20px;
`;

export const defaultStory = () => {
	return (
		<div className={containerStyles}>
			<HighlightBlockComponent html={htmlwithBlockquotes} />
		</div>
	);
};
defaultStory.story = { name: 'default' };

export const blockquoteStory = () => {
	return (
		<div className={containerStyles}>
			<HighlightBlockComponent html={htmlwithPTags} />
		</div>
	);
};
defaultStory.story = { name: 'default' };
