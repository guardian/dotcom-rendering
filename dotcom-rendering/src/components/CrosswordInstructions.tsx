import { css } from '@emotion/react';
import {
	textEgyptian17,
	textEgyptianBold17,
} from '@guardian/source/foundations';

const instructionsStyles = css`
	${textEgyptian17};
	white-space: pre-line;
`;

const headerStyles = css`
	${textEgyptianBold17};
	white-space: pre-line;
`;

export const CrosswordInstructions = ({
	instructions,
}: {
	instructions: string;
}) => (
	<div css={instructionsStyles}>
		<strong css={headerStyles}>Special instructions: </strong>
		{instructions}
	</div>
);
