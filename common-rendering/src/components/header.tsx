import { css } from "@emotion/react";
import type { SerializedStyles } from "@emotion/react";
import type { FC } from "react";
import { body } from "@guardian/src-foundations/typography";
import { getPillarColour } from "../utils/palette";
import { HeaderProps } from "../utils/palette";
import { Theme } from "@guardian/types";

type HeaderProps = {
	theme: Theme;
};

const backgroundTop = (theme: Theme): SerializedStyles => css`
	background-color: ${getPillarColour(theme, 300)};
	width: 100%;
	min-height: 100px;
	${body.medium()};
`;

const backgroundBottom = (theme: Theme): SerializedStyles => css`
	background-color: ${getPillarColour(theme, 200)};
	width: 100%;
	min-height: 100px;
`;

const Header: FC<HeaderProps> = ({ theme }) => (
	<>
		<div css={backgroundTop(theme)} />
		<div css={backgroundBottom(theme)} />
	</>
);

export default Header;
