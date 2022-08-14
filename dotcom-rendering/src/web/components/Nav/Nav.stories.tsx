import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { brandBackground, brandBorder } from '@guardian/source-foundations';
import { ContainerLayout } from '../ContainerLayout';
import { Nav } from './Nav';
import { nav } from './Nav.mock';

export default {
	component: Nav,
	title: 'Components/Nav',
};

export const StandardStory = () => {
	return (
		<ContainerLayout
			fullWidth={true}
			borderColour={brandBorder.primary}
			showTopBorder={false}
			padSides={false}
			backgroundColour={brandBackground.primary}
		>
			<Nav
				format={{
					theme: ArticlePillar.News,
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
				}}
				nav={nav}
				subscribeUrl=""
				editionId="UK"
			/>
		</ContainerLayout>
	);
};
StandardStory.story = { name: 'News Highlighted' };

export const OpinionStory = () => {
	return (
		<ContainerLayout
			fullWidth={true}
			borderColour={brandBorder.primary}
			showTopBorder={false}
			padSides={false}
			backgroundColour={brandBackground.primary}
		>
			<Nav
				format={{
					theme: ArticlePillar.Opinion,
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
				}}
				nav={nav}
				subscribeUrl=""
				editionId="UK"
			/>
		</ContainerLayout>
	);
};
OpinionStory.story = { name: 'Opinion Highlighted' };

export const ImmersiveStory = () => {
	return (
		<ContainerLayout
			fullWidth={true}
			showSideBorders={false}
			borderColour={brandBorder.primary}
			showTopBorder={false}
			padSides={false}
			backgroundColour={brandBackground.primary}
		>
			<Nav
				format={{
					theme: ArticlePillar.News,
					display: ArticleDisplay.Immersive,
					design: ArticleDesign.Standard,
				}}
				nav={nav}
				subscribeUrl=""
				editionId="UK"
			/>
		</ContainerLayout>
	);
};
ImmersiveStory.story = { name: 'Immersive' };
