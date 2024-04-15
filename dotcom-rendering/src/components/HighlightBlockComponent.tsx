import { css } from '@emotion/react';
import { palette, textEgyptian17 } from '@guardian/source-foundations';
import { unwrapHtml } from '../model/unwrapHtml';
import { RewrappedComponent } from './RewrappedComponent';

type Props = {
	html: string;
};

export const HighlightBlockComponent = ({ html }: Props) => {
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
		],
		html,
	});

	return (
		<RewrappedComponent
			isUnwrapped={isUnwrapped}
			html={unwrappedHtml}
			elCss={css`
				${textEgyptian17};
				/**
 * @TODO (2) Typography preset styles should not be overridden.
 * Please speak to your team's designer and update this to use a more appropriate preset.
*/
				line-height: 1.15;
				background-color: ${palette.neutral[97]};
				padding-top: 8px;
				padding-bottom: 16px;
				padding-left: 12px;
				padding-right: 12px;
				margin-bottom: 16px;
			`}
			tagName={unwrappedElement}
		/>
	);
};
