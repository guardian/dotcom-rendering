import React from 'react';
import { css } from 'emotion';

import { body } from '@guardian/src-foundations/typography';
import { unwrapHtml } from '@root/src/model/unwrapHtml';
import { RewrappedComponent } from '@root/src/web/components/elements/RewrappedComponent';
import { QuoteIcon } from '@root/src/web/components/QuoteIcon';

type Props = {
	html: string;
	palette: Palette;
	quoted?: boolean;
};

const baseBlockquoteStyles = css`
	${body.medium()};
	font-style: italic;
`;

const simpleBlockquoteStyles = css`
	${baseBlockquoteStyles}
	margin-top: 16px;
	margin-right: 0;
	margin-bottom: 16px;
	margin-left: 33px;
`;

const quotedBlockquoteStyles = (palette: Palette) => css`
	${baseBlockquoteStyles}
	color: ${palette.text.blockquote};
`;

export const BlockquoteBlockComponent: React.FC<Props> = ({
	html,
	palette,
	quoted,
}: Props) => {
	const {
		willUnwrap: isUnwrapped,
		unwrappedHtml,
		unwrappedElement,
	} = unwrapHtml({
		fixes: [
			{ prefix: '<p>', suffix: '</p>', unwrappedElement: 'p' },
			{
				prefix: '<blockquote>',
				suffix: '</blockquote>',
				unwrappedElement: 'blockquote',
			},
			{
				prefix: '<blockquote class="quoted">',
				suffix: '</blockquote>',
				unwrappedElement: 'div',
			},
		],
		html,
	});

	if (quoted) {
		return (
			<blockquote
				className={css`
					display: flex;
					flex-direction: row;
					align-items: center;
					margin-top: 8px;
					margin-bottom: 8px;
				`}
			>
				<QuoteIcon colour={palette.fill.blockquoteIcon} size="medium" />
				<RewrappedComponent
					isUnwrapped={isUnwrapped}
					html={unwrappedHtml}
					elCss={quotedBlockquoteStyles(palette)}
					tagName={unwrappedElement}
				/>
			</blockquote>
		);
	}
	return (
		<RewrappedComponent
			isUnwrapped={isUnwrapped}
			html={unwrappedHtml}
			elCss={simpleBlockquoteStyles}
			tagName={unwrappedElement}
		/>
	);
};
