import { unwrapHtml } from '../../model/unwrapHtml';
import { RewrappedComponent } from './RewrappedComponent';

type Props = { html: string };

export const SubheadingBlockComponent = ({ html }: Props) => {
	const { willUnwrap: isUnwrapped, unwrappedHtml } = unwrapHtml({
		fixes: [{ prefix: '<h2>', suffix: '</h2>' }],
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
