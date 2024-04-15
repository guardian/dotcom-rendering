import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import {
	breakpoints,
	from,
	space,
	textEgyptian17,
} from '@guardian/source-foundations';
import type { Meta, StoryObj } from '@storybook/react';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { Accordion as AccordionComponent } from './Accordion';

const meta = {
	component: AccordionComponent,
	parameters: {
		backgrounds: {
			default: 'grey',
			values: [{ name: 'grey', value: 'lightgrey' }],
		},
		chromatic: {
			viewports: [breakpoints.mobile, breakpoints.tablet],
		},
	},
} satisfies Meta<typeof AccordionComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

const textStyle = css`
	${textEgyptian17};
	/**
 * @TODO (2) Typography preset styles should not be overridden.
 * Please speak to your team's designer and update this to use a more appropriate preset.
*/
	line-height: 1.4;
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

export const Accordion = {
	args: {
		accordionTitle: 'Live feed',
		context: 'keyEvents',
		children: accordionContent,
	},
	decorators: [splitTheme([articleFormat])],
} satisfies Story;
