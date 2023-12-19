import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import {
	imageStoryExpanded,
	imageStoryWithCreditExpanded,
	listStoryExpanded,
} from '../../fixtures/manual/qandaAtom';
import { QandaAtom } from './QandaAtom.importable';

export default {
	title: 'QandaAtom',
	component: QandaAtom,
};

const format: ArticleFormat = {
	design: ArticleDesign.Quiz,
	display: ArticleDisplay.Standard,
	theme: Pillar.News,
};

// Based on https://www.theguardian.com/technology/2018/sep/19/time-to-regulate-bitcoin-says-treasury-committee-report
export const NewsStoryExpanded = (): JSX.Element => {
	return <QandaAtom {...imageStoryExpanded} />;
};
NewsStoryExpanded.decorators = [splitTheme([format])];

// Based on https://www.theguardian.com/world/2020/mar/17/israel-to-track-mobile-phones-of-suspected-coronavirus-cases
export const ListStoryExpanded = (): JSX.Element => {
	return <QandaAtom {...listStoryExpanded} />;
};
ListStoryExpanded.decorators = [splitTheme([format])];

// Based on https://www.theguardian.com/world/2020/aug/06/coronavirus-global-report-germany-and-france-record-biggest-rise-in-cases-since-may
export const ImageStoryWithCreditExpanded = (): JSX.Element => {
	return <QandaAtom {...imageStoryWithCreditExpanded} />;
};
ImageStoryWithCreditExpanded.decorators = [splitTheme([format])];
