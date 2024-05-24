import { css } from '@emotion/react';
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
		<span css={crosswordLinkStyles} className={className}>
			<a
				target="_blank"
				href={`/crosswords/${crossword.crosswordType}/${crossword.number}/print`}
				rel="noreferrer"
			>
				Print
			</a>{' '}
			|{' '}
			{!!crossword.pdf && (
				<>
					<a target="_blank" href={crossword.pdf} rel="noreferrer">
						PDF version
					</a>{' '}
					|{' '}
				</>
			)}
			<a
				href={`/crosswords/accessible/${crossword.crosswordType}/${crossword.number}`}
			>
				Accessible version
			</a>
		</span>
	);
};
