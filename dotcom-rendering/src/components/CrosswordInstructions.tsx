import { css } from '@emotion/react';
import {
	textEgyptian17,
	textEgyptianBold17,
} from '@guardian/source/foundations';
import sanitise from 'sanitize-html';

const instructionsStyles = css`
	${textEgyptian17};
	white-space: pre-line;

	i {
		font-style: italic;
	}

	b {
		font-weight: bold;
	}
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
		<span dangerouslySetInnerHTML={{ __html: sanitise(instructions) }} />
	</div>
);
