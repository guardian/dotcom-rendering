
import { css } from '@emotion/react';

const ReadMe = () => (
	<section css={css`
		padding: 1rem;
		& h1, p{
			margin-bottom: 0.5rem;
		}
		`}>
		<h1 css={css`font-size: 1.5em; font-weight: 400;`}>Readme</h1>
		<p>
			The stories in this directory are automatically generated.
		</p>
		<p>
			To add new format variations to test, please edit the list in `get-stories.mjs`.
		</p>
	</section>
);

// eslint-disable-next-line import/no-default-export
export default {
	title: 'Components/Card/Format Variations',
	component: ReadMe,
	chromatic: { disableSnapshot: true },
};

export const Readme = () => <ReadMe />;
