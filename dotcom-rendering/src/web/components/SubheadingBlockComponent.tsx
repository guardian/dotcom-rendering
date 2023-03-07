import type { Prefix } from '../../model/unwrapHtml';
import { unwrapHtml } from '../../model/unwrapHtml';
import { RewrappedComponent } from './RewrappedComponent';

type Props = { html: string; prefixWithId: Prefix };

export const SubheadingBlockComponent = ({ html, prefixWithId }: Props) => {
	const { willUnwrap: isUnwrapped, unwrappedHtml } = unwrapHtml({
		fixes: [
			{ prefix: '<h2>', suffix: '</h2>' },
			{
				prefix: prefixWithId,
				suffix: '</h2>',
				unwrappedElement: 'h2',
			},
		],
		html,
	});

	const getId = (h2prefix: Prefix): string | undefined => {
		const match = h2prefix.match(/id=['"]([^'"]+)['"]/);
		if (match) {
			return match[1];
		}
		return '';
	};

	return (
		<RewrappedComponent
			isUnwrapped={isUnwrapped}
			html={unwrappedHtml}
			subheadingBlockComponentId={getId(prefixWithId)}
			tagName="h2"
		/>
	);
};
