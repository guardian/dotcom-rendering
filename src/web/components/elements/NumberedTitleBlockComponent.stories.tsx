import React from 'react';

import { NumberedTitleBlockComponent } from './NumberedTitleBlockComponent';

export default {
	component: NumberedTitleBlockComponent,
	title: 'Components/NumberedTitleBlockComponent',
};

export const Simple = () => (
	<div>
		<NumberedTitleBlockComponent
			position={1}
			html={'<h2>Simple text</h2>'}
			format={{
				theme: 'NewsPillar',
				design: 'ArticleDesign',
				display: 'StandardDisplay',
			}}
		/>
	</div>
);
Simple.story = { name: 'Simple' };

export const Strong = () => (
	<div>
		<NumberedTitleBlockComponent
			position={1}
			html={'<h2><strong>Strong text</strong></h2>'}
			format={{
				theme: 'NewsPillar',
				design: 'ArticleDesign',
				display: 'StandardDisplay',
			}}
		/>
	</div>
);
Strong.story = { name: 'Simple' };

export const Both = () => (
	<div>
		<NumberedTitleBlockComponent
			position={1}
			html={'<h2><strong>Strong text</strong> One Plus 7T Pro</h2>'}
			format={{
				theme: 'CulturePillar',
				design: 'ArticleDesign',
				display: 'StandardDisplay',
			}}
		/>
	</div>
);
Both.story = { name: 'Both' };

export const Other = () => (
	<div>
		<NumberedTitleBlockComponent
			position={1}
			html={'<h2>Other text<strong>Strong text</strong></h2>'}
			format={{
				theme: 'LifestylePillar',
				design: 'ArticleDesign',
				display: 'StandardDisplay',
			}}
		/>
	</div>
);
Other.story = { name: 'Other' };
