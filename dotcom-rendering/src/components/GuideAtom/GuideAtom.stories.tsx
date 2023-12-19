import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { Meta, StoryObj } from '@storybook/react';
import { splitTheme } from '../../../.storybook/decorators/splitThemeDecorator';
import {
	imageStoryExpanded,
	listStoryExpanded,
	orderedListStoryExpanded,
} from '../../../fixtures/manual/guideAtom';
import { getAllThemes } from '../../lib/format';
import { GuideAtom as GuideAtomComponent } from './GuideAtom';

const meta: Meta<typeof GuideAtomComponent> = {
	title: 'Components/Guide Atom',
	component: GuideAtomComponent,
};
type Story = StoryObj<typeof GuideAtomComponent>;

const defaultFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: Pillar.News,
};

// Modelled after: https://www.theguardian.com/sport/2020/may/19/pinatubo-has-probably-trained-on-for-the-2000-guineas-says-charlie-appleby
export const DefaultStoryExpanded: Story = {
	args: { ...imageStoryExpanded },
	decorators: [
		splitTheme(
			getAllThemes({
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
			}),
		),
	],
};

// Modelled after: https://www.theguardian.com/business/2020/jan/27/global-markets-slide-on-back-of-coronavirus-concerns-in-china-stocks
export const ListStoryExpanded: Story = {
	args: { ...listStoryExpanded },
	decorators: [splitTheme([defaultFormat])],
};

//Modelled after: https://www.theguardian.com/environment/2020/aug/01/plan-to-curb-englands-most-polluted-spot-divides-residents
export const OrderedListStoryExpanded: Story = {
	args: { ...orderedListStoryExpanded },
	decorators: [splitTheme([defaultFormat])],
};

//Modelled after: https://www.theguardian.com/politics/2019/jul/06/tory-member-questions-boris-johnsons-ability-to-represent-minorities
export const ImageStoryExpanded: Story = {
	args: { ...imageStoryExpanded },
	decorators: [splitTheme([defaultFormat])],
};

export default meta;
