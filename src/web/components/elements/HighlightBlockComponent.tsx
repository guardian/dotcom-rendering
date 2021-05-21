import { ClassNames } from '@emotion/react';

import { body } from '@guardian/src-foundations/typography';
import { unwrapHtml } from '@root/src/model/unwrapHtml';
import { RewrappedComponent } from '@root/src/web/components/elements/RewrappedComponent';
import { background } from '@guardian/src-foundations/palette';

type Props = {
	html: string;
};

export const HighlightBlockComponent: React.FC<Props> = ({ html }: Props) => (
	<ClassNames>
		{({ css }) => {
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
						${body.medium({ lineHeight: 'tight' })};
						background-color: ${background.secondary};
						padding-top: 8px;
						padding-bottom: 16px;
						padding-left: 12px;
						padding-right: 12px;
						margin-bottom: 16px;
					`}
					tagName={unwrappedElement}
				/>
			);
		}}
	</ClassNames>
);
