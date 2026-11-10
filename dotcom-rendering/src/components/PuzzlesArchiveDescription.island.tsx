import { css } from '@emotion/react';
import { palette } from '@guardian/source/foundations';
import { getHeaderSignInUrl } from '../lib/headerSignInUrl';
import { useIsSignedIn } from '../lib/useAuthStatus';

const linkStyles = css`
	color: var(--puzzles-primary, ${palette.lifestyle[400]});
	text-decoration: none;
	:hover,
	:focus {
		text-decoration: underline;
	}
`;

export const PuzzlesArchiveDescription = ({ idUrl }: { idUrl: string }) => {
	const isSignedIn = useIsSignedIn();

	if (isSignedIn === false) {
		return (
			<>
				<a css={linkStyles} href={getHeaderSignInUrl(idUrl)}>
					Sign in or create an account
				</a>{' '}
				to keep track of your progress.
			</>
		);
	}

	return (
		<span
			css={
				isSignedIn === 'Pending' &&
				css`
					visibility: hidden;
				`
			}
			aria-hidden={isSignedIn === 'Pending' ? true : undefined}
		>
			Use the calendar to track your puzzle progress from our archive.
		</span>
	);
};
