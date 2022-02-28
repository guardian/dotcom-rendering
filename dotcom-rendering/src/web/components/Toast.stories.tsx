import {
	ArticleDesign,
	ArticleDisplay,
	ArticlePillar,
	ArticleSpecial,
} from '@guardian/libs';
import { breakpoints } from '@guardian/source-foundations';

import { Toast } from './Toast';

export default {
	component: Toast,
	title: 'Components/Toast',
};

export const Default = () => {
	return (
		<Toast
			format={{
				theme: ArticlePillar.News,
				design: ArticleDesign.Standard,
				display: ArticleDisplay.Standard,
			}}
			count={3}
			onClick={() => {}}
		/>
	);
};
Default.story = {
	name: 'with 3 updates',
	parameters: {
		viewport: { defaultViewport: 'desktop' },
	},
};

export const Sport = () => {
	return (
		<Toast
			format={{
				theme: ArticlePillar.Sport,
				design: ArticleDesign.Standard,
				display: ArticleDisplay.Standard,
			}}
			count={3}
			onClick={() => {}}
		/>
	);
};
Sport.story = {
	name: 'with sport theme',
	parameters: {
		viewport: { defaultViewport: 'desktop' },
	},
};

export const Special = () => {
	return (
		<Toast
			format={{
				theme: ArticleSpecial.SpecialReport,
				design: ArticleDesign.Standard,
				display: ArticleDisplay.Standard,
			}}
			count={17}
			onClick={() => {}}
		/>
	);
};
Special.story = {
	name: 'with special report theme',
	parameters: {
		viewport: { defaultViewport: 'desktop' },
	},
};

export const One = () => {
	return (
		<Toast
			format={{
				theme: ArticlePillar.Culture,
				design: ArticleDesign.Standard,
				display: ArticleDisplay.Standard,
			}}
			count={1}
			onClick={() => {}}
		/>
	);
};
One.story = {
	name: 'with only one update',
	parameters: {
		viewport: { defaultViewport: 'desktop' },
	},
};

export const Lots = () => {
	return (
		<Toast
			format={{
				theme: ArticlePillar.Lifestyle,
				design: ArticleDesign.Standard,
				display: ArticleDisplay.Standard,
			}}
			count={239}
			onClick={() => {}}
		/>
	);
};
Lots.story = {
	name: 'with many updates',
	parameters: {
		viewport: { defaultViewport: 'desktop' },
	},
};

export const Mobile = () => {
	return (
		<Toast
			format={{
				theme: ArticlePillar.News,
				design: ArticleDesign.Standard,
				display: ArticleDisplay.Standard,
			}}
			count={3}
			onClick={() => {}}
		/>
	);
};
Mobile.story = {
	name: 'with mobile viewport',
	parameters: {
		viewport: { defaultViewport: 'mobileMedium' },
		chromatic: {
			viewports: [breakpoints.mobile],
		},
	},
};
