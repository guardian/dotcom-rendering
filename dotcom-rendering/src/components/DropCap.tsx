import { css } from '@emotion/react';
import { fonts, space } from '@guardian/source-foundations';
import { decideDesignGroupWeighting } from '../lib/decideDesignGroups';
import { palette } from '../palette';

type Props = {
	letter: string;
	format: ArticleFormat;
};

const dropCap = css`
	/* stylelint-disable-next-line property-disallowed-list -- we’re setting custom line height and font weight */
	font-family: ${fonts.headline};
	float: left;
	font-size: 7rem;
	line-height: 5.75rem;
	text-transform: uppercase;
	box-sizing: border-box;
	margin-right: ${space[1]}px;
	vertical-align: text-top;
`;

const fontWeight = (format: ArticleFormat) => {
	switch (decideDesignGroupWeighting(format)) {
		case 'weighting:authoritative':
			return 300;
		case 'weighting:neutral':
			return 500;
		case 'weighting:soft':
		default:
			return 700;
	}
};

export const DropCap = ({ letter, format }: Props) => {
	return (
		<span
			css={dropCap}
			style={{
				color: palette('--drop-cap'),
				fontWeight: fontWeight(format),
			}}
		>
			{letter}
		</span>
	);
};
