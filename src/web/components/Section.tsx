import { css } from '@emotion/react';

import { border } from '@guardian/src-foundations/palette';
import { from } from '@guardian/src-foundations/mq';
import { center } from '@root/src/web/lib/center';

const padding = css`
	padding: 0 10px;

	${from.mobileLandscape} {
		padding: 0 20px;
	}
`;

const adStyles = css`
	& .ad-slot.ad-slot--collapse {
		display: none;
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
	<section
		css={[
			adStyles,
			backgroundColour && setBackgroundColour(backgroundColour),
		]}
	>
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
