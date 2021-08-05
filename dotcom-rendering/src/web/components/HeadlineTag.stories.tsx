import { css } from '@emotion/react';

import { Special, Pillar, Design, Display } from '@guardian/types';

import { HeadlineTag } from './HeadlineTag';
import { decidePalette } from '../lib/decidePalette';

export default {
	component: HeadlineTag,
	title: 'Components/HeadlineTag',
};

export const defaultStory = () => {
	return (
		<HeadlineTag
			tagText="Tag name"
			palette={decidePalette({
				design: Design.Article,
				display: Display.Standard,
				theme: Pillar.Culture,
			})}
		/>
	);
};
defaultStory.story = { name: 'default' };

export const longTagNameStory = () => {
	return (
		<HeadlineTag
			tagText="Slightly longer tag name"
			palette={decidePalette({
				design: Design.Article,
				display: Display.Standard,
				theme: Pillar.News,
			})}
		/>
	);
};
longTagNameStory.story = { name: 'With a longer tag name' };

export const wrappedTagNameStory = () => {
	return (
		<div
			css={css`
				max-width: 400px;
			`}
		>
			<HeadlineTag
				tagText="Very long tag name with enough text to wrap to a second line"
				palette={decidePalette({
					design: Design.Article,
					display: Display.Standard,
					theme: Special.Labs,
				})}
			/>
		</div>
	);
};
wrappedTagNameStory.story = { name: 'With wrapped tag name' };
