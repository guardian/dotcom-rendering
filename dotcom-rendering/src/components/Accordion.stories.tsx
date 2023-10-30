import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { body, breakpoints, from, space } from '@guardian/source-foundations';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { Accordion } from './Accordion';

const textStyle = css`
	${body.medium({ lineHeight: 'loose' })};
	margin-bottom: ${space[3]}px;
`;

const hideAboveTablet: SerializedStyles = css`
	${from.desktop} {
		display: none;
	}
`;

const adviceColourAboveTablet: SerializedStyles = css`
	display: none;
	${from.desktop} {
		display: block;
		color: red;
		font-size: 18px;
		width: 300px;
		margin: 0 auto;
		margin-top: ${space[12]}px;
	}
`;

const articleFormat: ArticleFormat = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme: Pillar.News,
};

const accordionContent = (
	<>
		<p css={[textStyle, adviceColourAboveTablet]}>
			There's a trick to viewing this - you need to switch the storybook
			viewport to mobile, phablet or tablet in order to see the accordion.
		</p>
		<p css={[textStyle, hideAboveTablet]}>
			Vaccine passports enjoy substantial support across Europe, a YouGov
			survey suggests, as a fourth wave of infections prompts a growing
			number of countries to impose tougher restrictions on people who
			have not been fully vaccinated.
		</p>
		<p css={[textStyle, hideAboveTablet]}>
			The annual YouGov-Cambridge Globalism Project suggests majorities in
			all 10 European countries surveyed back compulsory vaccine passes
			for large events, while in most, more people favour than oppose
			their use in cafes, restaurants and gyms.
		</p>
	</>
);

export default {
	component: Accordion,
	title: 'Components/Accordion',
	parameters: {
		backgrounds: {
			default: 'grey',
			values: [{ name: 'grey', value: 'lightgrey' }],
		},
		chromatic: {
			viewports: [breakpoints.mobile, breakpoints.tablet],
		},
	},
	decorators: [splitTheme(articleFormat)],
};

export const Default = () => (
	<Accordion accordionTitle="Live feed" context="keyEvents">
		{accordionContent}
	</Accordion>
);
