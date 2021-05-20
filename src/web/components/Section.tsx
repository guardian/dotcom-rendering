import React from 'react';
import { css } from '@emotion/react';

import { border } from '@guardian/src-foundations/palette';
import { from } from '@guardian/src-foundations/mq';

const center = css`
	position: relative;
	margin: auto;

	${from.tablet} {
		max-width: 740px;
	}

	${from.desktop} {
		max-width: 980px;
	}

	${from.leftCol} {
		max-width: 1140px;
	}

	${from.wide} {
		max-width: 1300px;
	}
`;

const padding = css`
	padding: 0 10px;

	${from.mobileLandscape} {
		padding: 0 20px;
	}
`;

const sideBorders = (colour: string) => css`
	${from.tablet} {
		border-left: 1px solid ${colour};
		border-right: 1px solid ${colour};
	}
`;

const topBorder = (colour: string) => css`
	border-top: 1px solid ${colour};
`;

const setBackgroundColour = (colour: string) => css`
	background-color: ${colour};
`;

type Props = {
	sectionId?: string;
	showSideBorders?: boolean;
	showTopBorder?: boolean;
	padded?: boolean;
	backgroundColour?: string;
	borderColour?: string;
	children?: React.ReactNode;
	shouldCenter?: boolean;
};

export const Section = ({
	sectionId,
	showSideBorders = true,
	showTopBorder = true,
	padded = true,
	borderColour = border.secondary,
	backgroundColour,
	shouldCenter = true,
	children,
}: Props) => (
	<section css={backgroundColour && setBackgroundColour(backgroundColour)}>
		<div
			id={sectionId}
			css={[
				shouldCenter && center,
				showSideBorders && sideBorders(borderColour),
				showTopBorder && topBorder(borderColour),
				padded && padding,
			]}
		>
			{children && children}
		</div>
	</section>
);
