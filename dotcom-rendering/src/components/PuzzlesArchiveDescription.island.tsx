import { css } from '@emotion/react';
import { getHeaderSignInUrl } from '../lib/headerSignInUrl';
import { useIsSignedIn } from '../lib/useAuthStatus';
import { palette as themePalette } from '../palette';

const linkStyles = css`
	color: ${themePalette('--puzzles-primary')};
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
				<a
					css={linkStyles}
					href={getHeaderSignInUrl(idUrl)}
					data-component="puzzles-archive-sign-in"
					data-link-name="puzzles | archive | sign-in"
				>
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
