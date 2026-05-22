import { css } from '@emotion/react';
import { from } from '@guardian/source/foundations';
import { grid } from '../../grid';
import { palette } from '../../palette';
import type { ColourName } from '../../paletteDeclarations';

export const Hr = (props: {
	borderStyle: 'dotted' | 'solid';
	borderColour: ColourName;
}) => (
	<hr
		css={{
			'&': css(grid.column.all),
			margin: 0,
			width: '100%',
			borderWidth: 0,
			borderBottomWidth: 1,
			[from.leftCol]: {
				display: 'none',
			},
		}}
		style={{
			borderBottomColor: palette(props.borderColour),
			borderBottomStyle: props.borderStyle,
		}}
	/>
);
