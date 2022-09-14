import { css } from '@emotion/react';
import { ArticleFormat } from '@guardian/libs';
import { InlineSuccess } from '@guardian/source-react-components';
import { NewsletterSignUp } from 'bodyElement';
import { FC, useState } from 'react';

type Props = {
	format?: ArticleFormat;
	element: NewsletterSignUp;
};

const HydrateableNewsletterSignupInner: FC<Props> = ({ element }) => {
	const {
		name,
		frequency,
		successDescription,
	} = element;
	const [clickCount, setClickCount] = useState(0);

	return (
		<div
			css={css`
				border: 5px double darkblue;
				padding: 10px;
			`}
		>
			<p>
				Sign up to: <span>{name} - is it {frequency}</span>
			</p>
			<InlineSuccess>The Component was rendererd</InlineSuccess>

			<button
				onClick={() => {
					setClickCount(clickCount + 1);
				}}
			>
				signup
			</button>
			{clickCount > 0 && (
				<InlineSuccess>
					{successDescription}
				</InlineSuccess>
			)}
		</div>
	);
};

export { HydrateableNewsletterSignupInner, Props };
