import { css } from '@emotion/react';
import { border } from '@guardian/src-foundations/palette';
import { body } from '@guardian/src-foundations/typography';
import { unescapeData } from '@root/src/lib/escapeData';

// fallback styling for when JS is disabled
const noJSStyling = css`
	.twitter-tweet:not(.twitter-tweet-rendered) {
		border: 1px solid ${border.secondary};
		border-radius: 4px;
		padding: 20px;
		width: 100%;
		margin-bottom: 16px;
		${body.small()};
	}

	.twitter-tweet p {
		padding-bottom: 10px;
	}

	a {
		/* stylelint-disable-next-line color-no-hex */
		color: #2b7bb9;
	}
`;

export const TweetBlockComponent: React.FC<{
	element: TweetBlockElement;
}> = ({ element }) => {
	return (
		<>
			<div
				css={noJSStyling}
				dangerouslySetInnerHTML={{ __html: unescapeData(element.html) }}
			/>
			<script
				async={true}
				src="https://platform.twitter.com/widgets.js"
			/>
		</>
	);
};
