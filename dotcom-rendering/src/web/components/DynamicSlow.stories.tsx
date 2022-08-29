import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import { DynamicSlow } from './DynamicSlow';
import { Section } from './Section';

export default {
	component: DynamicSlow,
	title: 'Components/DynamicSlow',
};

export const Default = () => (
	<Section title="DynamicSlow" padContent={false} centralBorder="partial">
		<DynamicSlow trails={trails} showAge={true} />
	</Section>
);
Default.story = {
	name: 'Default',
	chromatic: {
		viewports: [
			breakpoints.mobile,
			breakpoints.mobileMedium,
			breakpoints.mobileLandscape,
			breakpoints.phablet,
			breakpoints.tablet,
			breakpoints.desktop,
			breakpoints.leftCol,
			breakpoints.wide,
		],
	},
};

export const Avatar = () => {
	const avatarTrails = trails.map((trail) => {
		return {
			...trail,
			trailText: 'This is the trail text',
			avatarUrl:
				'https://i.guim.co.uk/img/uploads/2017/10/06/George-Monbiot,-L.png?width=173&quality=85&auto=format&fit=max&s=be5b0d3f3aa55682e4930057fc3929a3',
			format: {
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Comment,
				theme: ArticlePillar.Opinion,
			},
		};
	});
	return (
		<Section title="DynamicSlow" padContent={false} centralBorder="partial">
			<DynamicSlow trails={avatarTrails} showAge={true} />
		</Section>
	);
};
Avatar.story = { name: 'with avatars' };
