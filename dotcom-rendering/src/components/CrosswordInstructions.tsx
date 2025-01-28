import { css } from '@emotion/react';
import {
	space,
	textEgyptian17,
	textEgyptianBold17,
} from '@guardian/source/foundations';
import sanitise from 'sanitize-html';

const headerStyles = css`
	${textEgyptianBold17};
	margin-bottom: ${space[2]}px;
`;

const instructionsStyles = css`
	${textEgyptian17};
	display: block;
	white-space: pre-line;

	i {
		font-style: italic;
	}

	b {
		font-weight: bold;
	}
`;

export const CrosswordInstructions = ({
	instructions,
}: {
	instructions: string;
}) => (
	<>
		<h2 css={headerStyles}>Special instructions:</h2>
		<p
			css={instructionsStyles}
			dangerouslySetInnerHTML={{ __html: sanitise(instructions) }}
		/>
	</>
);
