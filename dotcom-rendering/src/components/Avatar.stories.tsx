import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';
import type { Meta, StoryObj } from '@storybook/react';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorators';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
	component: Avatar,
	title: 'Components/Avatar',
};

export default meta;
type Story = StoryObj<typeof Avatar>;

const georgesMonbiot =
	'https://uploads.guim.co.uk/2017/10/06/George-Monbiot,-L.png';
const leahHarper = 'https://uploads.guim.co.uk/2017/10/06/Leah-Harper,-L.png';
const sideLowe = 'https://uploads.guim.co.uk/2018/05/25/Sid_Lowe,_L.png';

const format: ArticleFormat = {
	theme: Pillar.News,
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
};

export const defaultStory: Story = () => (
	<div style={{ width: '136px', height: '136px' }}>
		<Avatar src={georgesMonbiot} alt="The alt of the image" />
	</div>
);
defaultStory.storyName = 'Medium, Opinion (Rich Links)';
defaultStory.decorators = [
	splitTheme([
		{
			...format,
			theme: Pillar.Opinion,
		},
	]),
];

export const largeStory: Story = () => (
	<div style={{ width: '140px', height: '140px' }}>
		<Avatar src={leahHarper} alt="The alt of the image" />
	</div>
);
largeStory.storyName = 'Large, Lifestyle (Byline image - Desktop)';
largeStory.decorators = [
	splitTheme([
		{
			...format,
			theme: Pillar.Lifestyle,
		},
	]),
];

export const largeStoryNews: Story = () => (
	<div style={{ width: '140px', height: '140px' }}>
		<Avatar src={leahHarper} alt="The alt of the image" />
	</div>
);
largeStoryNews.storyName = 'Large, News (Byline image - Desktop)';
largeStoryNews.decorators = [splitTheme([format])];

export const largeStoryCulture: Story = () => (
	<div style={{ width: '140px', height: '140px' }}>
		<Avatar src={leahHarper} alt="The alt of the image" />
	</div>
);
largeStoryCulture.storyName = 'Large, Culture (Byline image - Desktop)';
largeStoryCulture.decorators = [
	splitTheme([
		{
			...format,
			theme: Pillar.Culture,
		},
	]),
];

export const SpecialReport: Story = () => (
	<div style={{ width: '140px', height: '140px' }}>
		<Avatar src={leahHarper} alt="The alt of the image" />
	</div>
);
SpecialReport.storyName = 'Large SpecialReport';
SpecialReport.decorators = [
	splitTheme([
		{
			...format,
			theme: ArticleSpecial.SpecialReport,
		},
	]),
];

export const SpecialReportAlt: Story = () => (
	<div style={{ width: '140px', height: '140px' }}>
		<Avatar src={leahHarper} alt="The alt of the image" />
	</div>
);
SpecialReportAlt.storyName = 'Large SpecialReportAlt';
SpecialReportAlt.decorators = [
	splitTheme([
		{
			...format,
			theme: ArticleSpecial.SpecialReportAlt,
		},
	]),
];

export const smallStory: Story = () => (
	<div style={{ width: '60px', height: '60px' }}>
		<Avatar src={sideLowe} alt="The alt of the image" />
	</div>
);
smallStory.storyName = 'Small, Sport (Byline image - Mobile)';
smallStory.decorators = [
	splitTheme([
		{
			...format,
			theme: Pillar.Sport,
		},
	]),
];
