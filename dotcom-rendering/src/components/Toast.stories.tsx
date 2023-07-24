import { css } from '@emotion/react';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
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
					theme: Pillar.News,
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
				}}
				count={3}
				onClick={() => {}}
			/>
		</Wrapper>
	);
};
Default.storyName = 'with 3 updates';
Default.story = {
	parameters: {
		viewport: { defaultViewport: 'desktop' },
	},
};

export const Sport = () => {
	return (
		<Wrapper>
			<Toast
				format={{
					theme: Pillar.Sport,
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
				}}
				count={3}
				onClick={() => {}}
			/>
		</Wrapper>
	);
};
Sport.storyName = 'with sport theme';
Sport.story = {
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
Special.storyName = 'with special report theme';
Special.story = {
	parameters: {
		viewport: { defaultViewport: 'desktop' },
	},
};

export const One = () => {
	return (
		<Wrapper>
			<Toast
				format={{
					theme: Pillar.Culture,
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
				}}
				count={1}
				onClick={() => {}}
			/>
		</Wrapper>
	);
};
One.storyName = 'with only one update';
One.story = {
	parameters: {
		viewport: { defaultViewport: 'desktop' },
	},
};

export const Lots = () => {
	return (
		<Wrapper>
			<Toast
				format={{
					theme: Pillar.Lifestyle,
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
				}}
				count={239}
				onClick={() => {}}
			/>
		</Wrapper>
	);
};
Lots.storyName = 'with many updates';
Lots.story = {
	parameters: {
		viewport: { defaultViewport: 'desktop' },
	},
};

export const Mobile = () => {
	return (
		<Wrapper>
			<Toast
				format={{
					theme: Pillar.News,
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
				}}
				count={3}
				onClick={() => {}}
			/>
		</Wrapper>
	);
};
Mobile.storyName = 'with mobile viewport';
Mobile.story = {
	parameters: {
		viewport: { defaultViewport: 'mobileMedium' },
		chromatic: {
			viewports: [breakpoints.mobile],
		},
	},
};
