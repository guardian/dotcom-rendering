import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { ShadyPie } from './ShadyPie';

const labsFormat: ArticleFormat = {
	theme: ArticlePillar.Lifestyle,
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
};

export default {
	component: ShadyPie,
	title: 'Components/ShadyPie',
};

export const Default = () => {
	return (
		<div style={{ width: '300px' }}>
			<ShadyPie />
		</div>
	);
};
Default.story = {
	name: 'Default',
};

export const UKLabs = () => {
	return (
		<div style={{ width: '300px' }}>
			<ShadyPie format={labsFormat} editionId={'UK'} />
		</div>
	);
};
UKLabs.story = {
	name: 'UK Labs',
};

export const USLabs = () => {
	return (
		<div style={{ width: '300px' }}>
			<ShadyPie format={labsFormat} editionId={'US'} />
		</div>
	);
};
USLabs.story = {
	name: 'US Labs',
};
