import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { barChartHtml, lineChartHtml } from '../../fixtures/manual/chartAtoms';
import { ChartAtom } from './ChartAtom.importable';

export default {
	component: ChartAtom,
	title: 'Components/ChartAtomComponent',
};

const defaultFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: Pillar.News,
};

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			padding: 0 8px;
			> div {
				> iframe {
					height: 100vh;
				}
			}
		`}
	>
		<p>
			Chart atoms contain some html with styles we are not in control of -
			so we support darkmode by making the background white, so we don't
			break colour contrast
		</p>
		{children}
	</div>
);

export const BarChart = () => {
	return (
		<Wrapper>
			<ChartAtom id="123abc" html={barChartHtml} title="" />
		</Wrapper>
	);
};
BarChart.decorators = [splitTheme([defaultFormat])];
export const LineChart = () => {
	return (
		<Wrapper>
			<ChartAtom id="123abc" html={lineChartHtml} title="" />
		</Wrapper>
	);
};
LineChart.decorators = [splitTheme([defaultFormat])];
