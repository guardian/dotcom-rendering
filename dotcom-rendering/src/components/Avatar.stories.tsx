import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';
import { Avatar } from './Avatar';

export default {
	component: Avatar,
	title: 'Components/Avatar',
};

const georgesMonbiot =
	'https://uploads.guim.co.uk/2017/10/06/George-Monbiot,-L.png';
const leahHarper = 'https://uploads.guim.co.uk/2017/10/06/Leah-Harper,-L.png';
const sideLowe = 'https://uploads.guim.co.uk/2018/05/25/Sid_Lowe,_L.png';

const format: ArticleFormat = {
	theme: Pillar.News,
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
};

export const defaultStory = () => (
	<div style={{ width: '136px', height: '136px' }}>
		<Avatar
			src={georgesMonbiot}
			alt="The alt of the image"
			format={{
				...format,
				theme: Pillar.Opinion,
			}}
		/>
	</div>
);
defaultStory.storyName = 'Medium, Opinion (Rich Links)';

export const largeStory = () => (
	<div style={{ width: '140px', height: '140px' }}>
		<Avatar
			src={leahHarper}
			alt="The alt of the image"
			format={{
				...format,
				theme: Pillar.Lifestyle,
			}}
		/>
	</div>
);
largeStory.storyName = 'Large, Lifestyle (Byline image - Desktop)';

export const largeStoryNews = () => (
	<div style={{ width: '140px', height: '140px' }}>
		<Avatar src={leahHarper} alt="The alt of the image" format={format} />
	</div>
);
largeStoryNews.storyName = 'Large, News (Byline image - Desktop)';

export const largeStoryCulture = () => (
	<div style={{ width: '140px', height: '140px' }}>
		<Avatar
			src={leahHarper}
			alt="The alt of the image"
			format={{
				...format,
				theme: Pillar.Culture,
			}}
		/>
	</div>
);
largeStoryCulture.storyName = 'Large, Culture (Byline image - Desktop)';

export const SpecialReport = () => (
	<div style={{ width: '140px', height: '140px' }}>
		<Avatar
			src={leahHarper}
			alt="The alt of the image"
			format={{
				...format,
				theme: ArticleSpecial.SpecialReport,
			}}
		/>
	</div>
);
SpecialReport.storyName = 'Large SpecialReport';

export const smallStory = () => (
	<div style={{ width: '60px', height: '60px' }}>
		<Avatar
			src={sideLowe}
			alt="The alt of the image"
			format={{
				...format,
				theme: Pillar.Sport,
			}}
		/>
	</div>
);
smallStory.storyName = 'Small, Sport (Byline image - Mobile)';
