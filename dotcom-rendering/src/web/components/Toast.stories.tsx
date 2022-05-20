import { css } from '@emotion/react';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticlePillar,
	ArticleSpecial,
} from '@guardian/libs';
import { breakpoints } from '@guardian/source-foundations';
import { Toast } from './Toast';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			position: sticky;
			top: 0;
			display: flex;
			justify-content: center;
		`}
	>
		{children}
	</div>
);

export default {
	component: Toast,
	title: 'Components/Toast',
};

export const Default = () => {
	return (
		<Wrapper>
			<Toast
				format={{
					theme: ArticlePillar.News,
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
				}}
				count={3}
				onClick={() => {}}
			/>
		</Wrapper>
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
		<Wrapper>
			<Toast
				format={{
					theme: ArticlePillar.Sport,
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
				}}
				count={3}
				onClick={() => {}}
			/>
		</Wrapper>
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
		<Wrapper>
			<Toast
				format={{
					theme: ArticleSpecial.SpecialReport,
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
				}}
				count={17}
				onClick={() => {}}
			/>
		</Wrapper>
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
		<Wrapper>
			<Toast
				format={{
					theme: ArticlePillar.Culture,
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
				}}
				count={1}
				onClick={() => {}}
			/>
		</Wrapper>
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
		<Wrapper>
			<Toast
				format={{
					theme: ArticlePillar.Lifestyle,
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
				}}
				count={239}
				onClick={() => {}}
			/>
		</Wrapper>
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
		<Wrapper>
			<Toast
				format={{
					theme: ArticlePillar.News,
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
				}}
				count={3}
				onClick={() => {}}
			/>
		</Wrapper>
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
