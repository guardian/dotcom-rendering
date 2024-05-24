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
	className,
}: {
	instructions: string;
	className?: string;
}) => (
	<div css={instructionsStyles} className={className}>
		<strong css={headerStyles}>Special instructions: </strong>
		{instructions}
	</div>
);
