import React from 'react';
import { css } from 'emotion';
import { headline } from '@guardian/src-foundations/typography';
import { decidePalette } from '@root/src/web/lib/decidePalette';
import { decideDisplay } from '@root/src/web/lib/decideDisplay';
import { decideDesign } from '@root/src/web/lib/decideDesign';
import { decideTheme } from '@root/src/web/lib/decideTheme';

type Props = {
	position: number;
	html: string;
	format: CAPIFormat;
};

const titleStyles = (palette: Palette) => css`
	h2 {
		${headline.medium({ fontWeight: 'light' })}
	}

	strong {
		${headline.medium({ fontWeight: 'bold' })}
		display: block;
		color: ${palette.text.numberedTitle};
	}
`;

const numberStyles = (palette: Palette) => css`
	${headline.large({ fontWeight: 'bold' })}
	font-size: 56px;
	color: ${palette.text.numberedPosition};
`;

export const NumberedTitleBlockComponent = ({
	position,
	html,
	format,
}: Props) => {
	const dcrFormat = {
		display: decideDisplay(format),
		design: decideDesign(format),
		theme: decideTheme(format),
	};
	const palette = decidePalette(dcrFormat);
	return (
		<div
			className={css`
				margin-top: -16px; /* Hack used to align Title number closer to adjacent divider */
			`}
		>
			<div className={numberStyles(palette)}>{position}</div>
			<div
				className={titleStyles(palette)}
				dangerouslySetInnerHTML={{ __html: html }}
			/>
		</div>
	);
};
