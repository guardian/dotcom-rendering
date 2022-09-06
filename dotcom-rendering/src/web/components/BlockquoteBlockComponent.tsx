import { ClassNames } from '@emotion/react';
import { body } from '@guardian/source-foundations';
import { renderToString } from 'react-dom/server';
import { unwrapHtml } from '../../model/unwrapHtml';
import type { Palette } from '../../types/palette';
import { QuoteIcon } from './QuoteIcon';
import { RewrappedComponent } from './RewrappedComponent';

type Props = {
	html: string;
	palette: Palette;
	quoted?: boolean;
};

export const BlockquoteBlockComponent: React.FC<Props> = ({
	html,
	palette,
	quoted,
}: Props) => (
	<ClassNames>
		{({ css }) => {
			const baseBlockquoteStyles = css`
				margin-bottom: 16px;
				${body.medium()};
				font-style: italic;
				p {
					margin-bottom: 8px;
				}
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
				color: ${palette.text.blockquote};
			`;

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
				const htmlWithIcon = unwrappedHtml
					.trim()
					.replace(
						'<p>',
						`<p>${renderToString(
							<QuoteIcon colour={palette.fill.blockquoteIcon} />,
						)}`,
					);
				return (
					<RewrappedComponent
						isUnwrapped={isUnwrapped}
						html={htmlWithIcon}
						tagName="blockquote"
						elCss={quotedBlockquoteStyles}
					/>
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
		}}
	</ClassNames>
);
