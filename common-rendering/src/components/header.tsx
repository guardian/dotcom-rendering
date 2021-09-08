import { css } from "@emotion/react";
import type { SerializedStyles } from "@emotion/react";
import type { FC, ReactElement } from "react";
import { useState } from "react";
import { headline } from "@guardian/src-foundations/typography";
import { space } from "@guardian/src-foundations";
import { Theme, Pillar } from "@guardian/types";
import {
	sport,
	news,
	opinion,
	lifestyle,
	culture,
	text,
} from "@guardian/src-foundations/palette";

type HeaderProps = {
	theme: Theme;
	title: string;
	credit: string;
	standfirst: ReactElement;
};

const Header: FC<HeaderProps> = ({ theme, title, credit, standfirst }) => {
	const [themeColours, setThemeColours] = useState<Colours>(() =>
		getThemeColours(theme)
	);

	const backgroundTop: SerializedStyles = css`
		background-color: ${themeColours.backgroundTop};
		width: 100%;
		${headline.small()};
		color: ${text.ctaPrimary};
		padding: ${space[1]}px ${space[2]}px ${space[5]}px;
		span {
			display: block;
		}
	`;

	const creditStyles: SerializedStyles = css`
		${headline.xxxsmall()};
		color: ${themeColours.creditColour};
		margin-bottom: ${space[1]}px;
	`;

	const backgroundBottom: SerializedStyles = css`
		padding: ${space[1]}px ${space[2]}px;
		background-color: ${themeColours.backgroundTop};
		width: 100%;
		min-height: 100px;
		p,
		a,
		li {
			color: ${text.ctaPrimary};
			${headline.xxxsmall()};
			line-height: 135%;
			margin-bottom: ${space[2]}px;
		}

		li::before {
			content: "";
			background-color: ${themeColours.accentColour};
			width: 0.75rem;
			height: 0.75rem;
			border-radius: 0.5rem;
			display: inline-block;
			vertical-align: middle;
			margin-right: 0.5rem;
		}

		li {
			padding-left: 1.25rem;
			text-indent: -1.25rem;
		}
		a {
			text-decoration: none;
			padding-bottom: 0.005rem;
			border-bottom: 1px solid ${themeColours.accentColour};
		}
	`;

	return (
		<>
			<div css={backgroundTop}>
				<span css={creditStyles}>{credit}</span>
				<span>{title}</span>
			</div>
			<div css={backgroundBottom}>{standfirst}</div>
		</>
	);
};

const getThemeColours = (theme: Theme) => {
	switch (theme) {
		case Pillar.Sport:
			return {
				backgroundTop: sport[300],
				backgroundBottom: sport[100],
				creditColour: sport[600],
				accentColour: text.ctaPrimary,
			};
		case Pillar.Culture:
			return {
				backgroundTop: culture[300],
				backgroundBottom: culture[200],
				creditColour: culture[600],
				accentColour: culture[400],
			};
		case Pillar.Lifestyle:
			return {
				backgroundTop: lifestyle[300],
				backgroundBottom: lifestyle[200],
				creditColour: lifestyle[600],
				accentColour: lifestyle[500],
			};
		case Pillar.Opinion:
			return {
				backgroundTop: opinion[300],
				backgroundBottom: opinion[200],
				creditColour: opinion[800],
				accentColour: opinion[500],
			};
		default:
			return {
				backgroundTop: news[300],
				backgroundBottom: news[200],
				creditColour: news[600],
				accentColour: news[600],
			};
	}
};

export default Header;
