import React from 'react';
import { css } from 'emotion';
import { Display, Design, Pillar } from '@guardian/types';
import { decidePalette } from '@root/src/web/lib/decidePalette';
import { DisclaimerBlockComponent } from '@frontend/web/components/elements/DisclaimerBlockComponent';

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
		<div className={containerStyles}>
			<DisclaimerBlockComponent
				html={
					'<p><sup>This is a disclaimer and it could have <a href="#">link text in it</a>.</sup></p>'
				}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.News,
				})}
			/>
		</div>
	);
};
defaultStory.story = { name: 'default' };
