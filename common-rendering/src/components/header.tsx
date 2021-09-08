import { css } from "@emotion/react";
import type { SerializedStyles } from "@emotion/react";
import type { FC, ReactElement } from "react";
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

const backgroundTop = (theme: Theme): SerializedStyles => css`
	background-color: ${getPillarTop(theme)};
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
	color: ${news[600]};
	margin-bottom: ${space[1]}px;
`;

const backgroundBottom = (theme: Theme): SerializedStyles => css`
	padding: ${space[1]}px ${space[2]}px;
	background-color: ${getPillarBottom(theme)};
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
		background-color: ${news[600]};
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
		border-bottom: 1px solid ${news[600]};
	}
`;

const Header: FC<HeaderProps> = ({ theme, title, credit, standfirst }) => (
	<>
		<div css={backgroundTop(theme)}>
			<span css={creditStyles}>{credit}</span>
			<span>{title}</span>
		</div>
		<div css={backgroundBottom(theme)}>{standfirst}</div>
	</>
);

const getPillarTop = (theme: Theme) => {
	switch (theme) {
		case Pillar.Sport:
			return sport[300];
		case Pillar.Culture:
			return culture[300];
		case Pillar.Lifestyle:
			return lifestyle[300];
		case Pillar.Opinion:
			return opinion[300];
		default:
			return news[300];
	}
};

const getPillarBottom = (theme: Theme) => {
	switch (theme) {
		case Pillar.Sport:
			return sport[100];
		case Pillar.Culture:
			return culture[200];
		case Pillar.Lifestyle:
			return lifestyle[200];
		case Pillar.Opinion:
			return opinion[200];
		default:
			return news[200];
	}
};

export default Header;
