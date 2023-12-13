import { css } from '@emotion/react';
import {
	from,
	palette as sourcePalette,
	space,
} from '@guardian/source-foundations';

type Props = {
	size?: 'full' | 'partial';
	spaceAbove?: 'tight' | 'loose';
};

const baseStyles = css`
	height: 1px;
	border: 0;
	margin-bottom: 3px;
	background-color: ${sourcePalette.neutral[86]};
`;
const sizeFullStyle = css`
	width: 100%;
	${from.tablet} {
		margin-left: -20px;
		width: calc(100% + 20px);
	}
	${from.leftCol} {
		margin-left: -10px;
		width: calc(100% + 10px);
	}
`;
const sizePartialStyle = css`
	width: 150px;
	margin-left: 0px;
	${from.tablet} {
		margin-left: -20px;
	}
	${from.leftCol} {
		margin-left: -10px;
	}
`;

const tightSpaceAboveStyle = css`
	margin-top: ${space[6]}px;
`;
const looseSpaceAboveStyle = css`
	margin-top: ${space[12]}px;
`;

export const DividerBlockComponent = ({
	size = 'partial',
	spaceAbove = 'loose',
}: Props) => (
	<hr
		css={[
			baseStyles,
			size === 'partial' ? sizePartialStyle : sizeFullStyle,
			spaceAbove === 'loose'
				? looseSpaceAboveStyle
				: tightSpaceAboveStyle,
		]}
	/>
);
