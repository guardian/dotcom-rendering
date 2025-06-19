import { Available } from './available';

export const Newsletters = () => (
	<>
		<Available targets={['dotcom']} />
		<p>
			The{' '}
			<a href="https://www.theguardian.com/email-newsletters">
				all newsletters page
			</a>{' '}
			is a list of the currently published Editorial email newsletters,
			and includes a way to sign up to several at once. It's powered by
			the Newsletters API and configured in the Newsletters Tool. The
			email newsletters themselves are rendered by{' '}
			<code>email-rendering</code> and <code>frontend</code>, not DCAR.
		</p>
	</>
);
