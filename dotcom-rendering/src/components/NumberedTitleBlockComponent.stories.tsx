import { NumberedTitleBlockComponent } from './NumberedTitleBlockComponent.tsx';

export default {
	component: NumberedTitleBlockComponent,
	title: 'Components/NumberedTitleBlockComponent',
};

export const JustH2 = () => (
	<div>
		<NumberedTitleBlockComponent
			position={1}
			html="<h2>Simple text</h2>"
			format={{
				theme: 'NewsPillar',
				design: 'ArticleDesign',
				display: 'StandardDisplay',
			}}
		/>
	</div>
);
JustH2.storyName = 'with just h2 text';

export const Strong = () => (
	<div>
		<NumberedTitleBlockComponent
			position={1}
			html="<h2><strong>Strong text</strong></h2>"
			format={{
				theme: 'NewsPillar',
				design: 'ArticleDesign',
				display: 'StandardDisplay',
			}}
		/>
	</div>
);
Strong.storyName = 'with only strong text';

export const Leading = () => (
	<div>
		<NumberedTitleBlockComponent
			position={1}
			html="<h2><strong>Strong text</strong> One Plus 7T Pro</h2>"
			format={{
				theme: 'CulturePillar',
				design: 'ArticleDesign',
				display: 'StandardDisplay',
			}}
		/>
	</div>
);
Leading.storyName = 'with leading strong text';

export const Trailing = () => (
	<div>
		<NumberedTitleBlockComponent
			position={1}
			html="<h2>Plain H2<strong>Strong text</strong></h2>"
			format={{
				theme: 'LifestylePillar',
				design: 'ArticleDesign',
				display: 'StandardDisplay',
			}}
		/>
	</div>
);
Trailing.storyName = 'with trailing strong text';
