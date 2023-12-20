import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { splitTheme } from '../../../.storybook/decorators/splitThemeDecorator';
import {
	analysisStoryExpanded,
	defaultStory,
	defaultStoryExpanded,
	imageStoryExpanded,
	lifestylePillarStoryExpanded,
	listStoryExpanded,
	orderedListStoryExpanded,
} from '../../../fixtures/manual/guideAtom';
import { palette } from '../../palette';
import { GuideAtom } from './GuideAtom';

const format = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: Pillar.Sport,
};

export default {
	title: 'Components/GuideAtom',
	component: GuideAtom,
};

export const DefaultStoryCollapsed = (): JSX.Element => {
	// Modelled after: https://www.theguardian.com/sport/2020/may/19/pinatubo-has-probably-trained-on-for-the-2000-guineas-says-charlie-appleby
	return <GuideAtom {...defaultStory} />;
};
DefaultStoryCollapsed.decorators = [splitTheme([format])];

export const DefaultStoryExpanded = (): JSX.Element => {
	// Modelled after: https://www.theguardian.com/sport/2020/may/19/pinatubo-has-probably-trained-on-for-the-2000-guineas-says-charlie-appleby
	return <GuideAtom {...defaultStoryExpanded} />;
};
DefaultStoryExpanded.decorators = [splitTheme([format])];

export const ListStoryExpanded = (): JSX.Element => {
	//Modelled after: https://www.theguardian.com/business/2020/jan/27/global-markets-slide-on-back-of-coronavirus-concerns-in-china-stocks
	return <GuideAtom {...listStoryExpanded} />;
};
ListStoryExpanded.decorators = [
	splitTheme([
		{
			...format,
			theme: Pillar.News,
		},
	]),
];

export const OrderedListStoryExpanded = (): JSX.Element => {
	//Modelled after: https://www.theguardian.com/environment/2020/aug/01/plan-to-curb-englands-most-polluted-spot-divides-residents
	return <GuideAtom {...orderedListStoryExpanded} />;
};
OrderedListStoryExpanded.decorators = [
	splitTheme([
		{
			...format,
			theme: Pillar.News,
		},
	]),
];

export const ImageStoryExpanded = (): JSX.Element => {
	//Modelled after: https://www.theguardian.com/politics/2019/jul/06/tory-member-questions-boris-johnsons-ability-to-represent-minorities
	return <GuideAtom {...imageStoryExpanded} />;
};
ImageStoryExpanded.decorators = [
	splitTheme([
		{
			...format,
			theme: Pillar.Culture,
		},
	]),
];

export const LifestylePillarStoryExpanded = (): JSX.Element => {
	//Modelled after: https://www.theguardian.com/money/2020/aug/07/energy-bills-to-be-cut-by-84-pounds-for-11m-uk-households-ofgem
	return <GuideAtom {...lifestylePillarStoryExpanded} />;
};
LifestylePillarStoryExpanded.decorators = [
	splitTheme([
		{
			...format,
			theme: Pillar.Lifestyle,
		},
	]),
];

export const AnalysisStoryExpanded = (): JSX.Element => {
	// Modelled after: https://www.theguardian.com/football/2022/dec/11/gareth-southgate-england-world-cup-qatar
	return (
		<div
			css={css`
				background-color: ${palette('--article-background')};
			`}
		>
			Analysis Articles have a different color background in light mode,
			so quick guide atoms should too.
			<GuideAtom {...analysisStoryExpanded} />
		</div>
	);
};
AnalysisStoryExpanded.decorators = [
	splitTheme([
		{
			...format,
			design: ArticleDesign.Analysis,
		},
	]),
];
