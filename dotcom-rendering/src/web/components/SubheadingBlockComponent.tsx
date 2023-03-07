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
			},
		],
		html,
	});

	return (
		<RewrappedComponent
			isUnwrapped={isUnwrapped}
			html={unwrappedHtml}
			tagName="h2"
		/>
	);
};
