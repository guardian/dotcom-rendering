import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import { article17, from, space } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react';
import { allModes } from '../../.storybook/modes';
import { Accordion as AccordionComponent } from './Accordion';

const meta = {
	component: AccordionComponent,
	parameters: {
		backgrounds: {
			default: 'grey',
			values: [{ name: 'grey', value: 'lightgrey' }],
		},
		chromatic: {
			modes: {
				'light mobileMedium': allModes['light mobileMedium'],
				'horizontal tablet': allModes['horizontal tablet'],
			},
		},
		viewport: {
			defaultViewport: 'mobileLandscape',
		},
	},
} satisfies Meta<typeof AccordionComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

const textStyle = css`
	${article17};
	margin-bottom: ${space[3]}px;
`;

const adviceAboveTablet: SerializedStyles = css`
	display: none;
	${from.desktop} {
		display: block;
		color: red;
		font-size: 18px;
		margin: 0 auto;
		margin-bottom: ${space[3]}px;
	}
`;

const accordionContent = (
	<>
		<p css={[textStyle, adviceAboveTablet]}>
			At wider breakpoints the accordion UI disappears and just leaves the
			content. To view the accordion UI, switch to a narrower breakpoint.
		</p>
		<p css={[textStyle]}>
			Vaccine passports enjoy substantial support across Europe, a YouGov
			survey suggests, as a fourth wave of infections prompts a growing
			number of countries to impose tougher restrictions on people who
			have not been fully vaccinated.
		</p>
		<p css={[textStyle]}>
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
} satisfies Story;
