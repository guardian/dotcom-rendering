// ----- Imports ----- //
import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { Lines } from '@guardian/source-react-components-development-kitchen';
import type { FC } from 'react';
import { borderWidthStyles } from './styles';

// ----- Component ----- //

const styles = css`
	box-sizing: border-box;

	${borderWidthStyles}
`;

interface Props {
	className?: SerializedStyles;
}

const EditionsLines: FC<Props> = ({ className }) => (
	<div css={[styles, className]}>
		<Lines />
	</div>
);

// ----- Exports ----- //

export default EditionsLines;
