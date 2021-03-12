import React from 'react';
import { css } from 'emotion';

import { body } from '@guardian/src-foundations/typography';
import { unwrapHtml } from '@root/src/model/unwrapHtml';
import { RewrappedComponent } from '@root/src/web/components/elements/RewrappedComponent';
import { neutral } from '@guardian/src-foundations/palette';
import { QuoteIcon } from '@root/src/web/components/QuoteIcon';

type Props = {
	html: string;
	palette: Palette;
	quoted?: boolean;
};

const BlockquoteRow = ({ children }: { children: React.ReactNode }) => (
	<blockquote
		className={css`
			display: flex;
			flex-direction: row;
		`}
	>
		{children}
	</blockquote>
);

const baseBlockquoteStyles = css`
	margin-bottom: 16px;
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

const quotedBlockquoteStyles = css`
	${baseBlockquoteStyles}
	color: ${neutral[46]};
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
			<BlockquoteRow>
				<QuoteIcon colour={palette.fill.blockquoteIcon} size="medium" />
				<RewrappedComponent
					isUnwrapped={isUnwrapped}
					html={unwrappedHtml}
					elCss={quotedBlockquoteStyles}
					tagName={unwrappedElement}
				/>
			</BlockquoteRow>
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
