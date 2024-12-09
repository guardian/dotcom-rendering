import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
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
	crossword: GuardianCrossword;
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
