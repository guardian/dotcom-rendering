import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import { type CrosswordProps } from '@guardian/react-crossword-next';
import { textSans15 } from '@guardian/source/foundations';
import { palette } from '../palette';

const crosswordLinkStyles = css`
	${textSans15};

	a {
		color: ${palette('--standfirst-link-text')};
		text-decoration: none;
		:hover {
			border-bottom: 1px solid ${palette('--standfirst-link-border')};
		}
	}
`;

export const CrosswordLinks = ({
	crossword,
	className,
}: {
	crossword: CrosswordProps['data'];
	className?: string;
}) => {
	return (
		isUndefined(crossword.pdf) || (
			<span css={crosswordLinkStyles} className={className}>
				<a target="_blank" href={crossword.pdf} rel="noreferrer">
					PDF version
				</a>
			</span>
		)
	);
};
