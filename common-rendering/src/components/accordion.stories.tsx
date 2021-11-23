// ----- Imports ----- //

import Accordion from "./accordion";
import { css } from "@emotion/react";
import type { SerializedStyles } from "@emotion/react";
import { breakpoints, space } from '@guardian/src-foundations';
import { neutral } from "@guardian/src-foundations/palette";
import { from } from '@guardian/src-foundations/mq';
import { body } from '@guardian/src-foundations/typography';
import type { FC } from "react";
import { darkModeCss } from "../lib";

// ----- Stories ----- //

const textStyle = (supportsDarkMode: boolean): SerializedStyles => css`
	${body.medium({ lineHeight: 'loose' })};
	margin-bottom: ${space[3]}px;
	${darkModeCss(supportsDarkMode)`
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

const accordionContent = (supportsDarkMode: boolean) => (
	<>
		<p css={[textStyle(supportsDarkMode), adviceColourAboveTablet]}>
			There's a trick to viewing this - you need to switch the
			storybook viewport to mobile, phablet or tablet in order to see the
			accordion.
		</p>
		<p css={[textStyle(supportsDarkMode), hideAboveTablet]}>
			Vaccine passports enjoy substantial support across Europe, a
			YouGov survey suggests, as a fourth wave of infections prompts
			a growing number of countries to impose tougher restrictions on
			people who have not been fully vaccinated.
		</p>
		<p css={[textStyle(supportsDarkMode), hideAboveTablet]}>
			The annual YouGov-Cambridge Globalism Project suggests majorities
			in all 10 European countries surveyed back compulsory vaccine
			passes for large events, while in most, more people favour than
			oppose their use in cafes, restaurants and gyms.
		</p>
	</>
)

const Default: FC = () => (
	<Accordion
		supportsDarkMode={false}
		accordionTitle="Live feed"
		backgroundBody="white"
	>
		{accordionContent(false)}
	</Accordion>
);

const Dark: FC = () => (
	<Accordion
		supportsDarkMode={true}
		accordionTitle="Live feed"
		backgroundBody="white"
	>
		{accordionContent(true)}
	</Accordion>
);


// ----- Exports ----- //

export default {
	component: Accordion,
	title: "Common/Components/Accordion",
	parameters: {
		backgrounds: {
			default: 'grey',
			values: [{ name: 'grey', value: 'lightgrey' }],
		},
		chromatic: {
			viewports: [
				breakpoints.mobile,
				breakpoints.tablet,
			],
		},
	},
};

export {
    Default,
	Dark,
}

