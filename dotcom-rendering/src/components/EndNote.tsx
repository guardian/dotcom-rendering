import { css } from '@emotion/react';
import { space, textSans14 } from '@guardian/source/foundations';
import { palette } from '../palette';

const endNoteStyles = css`
	${textSans14};
	color: ${palette('--end-note-text-subdued')};
	margin-bottom: ${space[3]}px;
`;

export const EndNote = ({ text }: { text?: string }) => {
	if (!text) return null;
	return (
		<p css={endNoteStyles}>
			<em>{text}</em>
		</p>
	);
};
