import { Available } from './available';

export const Interactive = () => (
	<>
		<Available targets={['dotcom', 'live apps', 'amp']} />
		<p>
			Interactives are actually a kind of <a href="../article">article</a>
			, but DCAR has a separate endpoint for them for performance reasons.
			You can find some examples on the{' '}
			<a href="https://www.theguardian.com/interactive">
				Interactives front
			</a>
			.
		</p>
	</>
);
