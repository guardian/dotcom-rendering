import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { brandBackground, brandBorder } from '@guardian/source-foundations';
import { ElementContainer } from '../ElementContainer';
import { Nav } from './Nav';
import { nav } from './Nav.mock';

export default {
	component: Nav,
	title: 'Components/Nav',
};

export const StandardStory = () => {
	return (
		<ElementContainer
			showSideBorders={true}
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
		</ElementContainer>
	);
};
StandardStory.story = { name: 'News Highlighted' };

export const OpinionStory = () => {
	return (
		<ElementContainer
			showSideBorders={true}
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
		</ElementContainer>
	);
};
OpinionStory.story = { name: 'Opinion Highlighted' };

export const ImmersiveStory = () => {
	return (
		<ElementContainer
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
		</ElementContainer>
	);
};
ImmersiveStory.story = { name: 'Immersive' };
