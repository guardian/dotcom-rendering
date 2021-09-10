import { css, keyframes } from "@emotion/react";
import type { SerializedStyles } from "@emotion/react";
import type { FC, ReactElement } from "react";
import { useState } from "react";
import { headline, textSans } from "@guardian/src-foundations/typography";
import { space } from "@guardian/src-foundations";
import { from, until } from "@guardian/src-foundations/mq";
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
	byline?: ReactElement;
};

type Colours = {
	backgroundTop: string;
	backgroundBottom: string;
	creditColour: string;
	accentColour: string;
};

const leftColStyles: SerializedStyles = css`
	display: inline-block;
	height: 100%;
	width: 220px;
	padding: 0 ${space[5]}px;

	${until.desktop} {
		display: none;
	}
`;

const containerStyles: SerializedStyles = css`
	width: 100%;

	${from.desktop} {
		max-width: 700px;
	}
`;

const updatedStyles: SerializedStyles = css`
	color: ${text.ctaPrimary};
	${textSans.xxsmall()};
`;

// The following pulsing dot implementation is a placeholder for the PulsingDot component, which
// we will ideally lift up from dcr to common-rendering
const allowsAnimation = "@media (prefers-reduced-motion: no-preference)";

const livePulse = keyframes`
    0% {opacity: 1;}
    10% {opacity: .25;}
    40% {opacity: 1;}
    100% {opacity: 1;}
`;

const animation: SerializedStyles = css`
	${allowsAnimation} {
		animation: ${livePulse} 1s infinite;
	}
`;

const dotStyles: SerializedStyles = css`
	:before {
		content: "";
		background-color: ${text.ctaPrimary};
		width: 0.55rem;
		height: 0.55rem;
		border-radius: 0.5rem;
		display: inline-block;
		vertical-align: middle;
		margin-right: 0.25rem;
	}
`;

// End of temporary pulsing dot implementation

const Header: FC<HeaderProps> = ({
	theme,
	title,
	credit,
	standfirst,
	byline,
}) => {
	const [themeColours] = useState<Colours>(() => getThemeColours(theme));

	const backgroundTop: SerializedStyles = css`
		display: flex;
		background-color: ${themeColours.backgroundTop};
		width: 100%;
		padding: ${space[1]}px ${space[2]}px ${space[5]}px;

		${from.mobileLandscape} {
			padding: ${space[1]}px ${space[5]}px ${space[5]}px;
		}

		${from.desktop} {
			padding: ${space[1]}px 0 ${space[5]}px;
		}
	`;

	const titleStyles: SerializedStyles = css`
		display: block;
		${headline.small()};
		color: ${text.ctaPrimary};
	`;

	const creditStyles: SerializedStyles = css`
		display: block;
		${headline.xxxsmall()};
		color: ${themeColours.creditColour};
		margin-bottom: ${space[1]}px;

		${from.desktop} {
			position: absolute;
			left: ${space[5]}px;
			max-width: 180px;
		}
	`;

	const backgroundBottom: SerializedStyles = css`
		display: flex;
		padding: ${space[1]}px ${space[2]}px;
		background-color: ${themeColours.backgroundBottom};
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

		${from.mobileLandscape} {
			padding: ${space[1]}px ${space[5]}px;
		}

		${from.desktop} {
			padding: ${space[1]}px 0;
		}
	`;

	const bylineStyles: SerializedStyles = css`
		margin: ${space[5]}px 0 ${space[3]}px;
	`;
	// TODO: implment timeAgo in the 'LIVE Updated [timeAgo] ago' span
	return (
		<>
			<div css={backgroundTop}>
				<aside css={leftColStyles} />
				<div css={containerStyles}>
					<span css={creditStyles}>{credit}</span>
					<span css={titleStyles}>{title}</span>
				</div>
			</div>
			<div css={backgroundBottom}>
				<aside css={leftColStyles}>
					<span css={[dotStyles, animation]} />
					<span css={updatedStyles}>LIVE Updated 6m ago</span>
				</aside>
				<div css={containerStyles}>
					<span>{standfirst}</span>
					{byline && <span css={bylineStyles}>{byline}</span>}
				</div>
			</div>
		</>
	);
};

function getThemeColours(theme: Theme) {
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
}

export default Header;
