// ----- Imports ----- //

import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import {
	article17,
	breakpoints,
	from,
	neutral,
	space,
} from '@guardian/source/foundations';
import type { FC } from 'react';
import { darkModeCss } from 'styles';
import Accordion from '.';

// ----- Stories ----- //

const textStyle = css`
	${article17};
	margin-bottom: ${space[3]}px;
	${darkModeCss`
		color: ${neutral[86]};
	`}
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

const accordionContent = (
	<>
		<p css={[textStyle, adviceColourAboveTablet]}>
			There&apos;s a trick to viewing this - you need to switch the
			storybook viewport to mobile, phablet or tablet in order to see the
			accordion.
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

const Default: FC = () => (
	<Accordion accordionTitle="Live feed" context="keyEvents">
		{accordionContent}
	</Accordion>
);

// ----- Exports ----- //

export default {
	component: Accordion,
	title: 'AR/Accordion',
	parameters: {
		backgrounds: {
			default: 'grey',
			values: [{ name: 'grey', value: 'lightgrey' }],
		},
		chromatic: {
			viewports: [breakpoints.mobile, breakpoints.tablet],
		},
	},
};

export { Default };
