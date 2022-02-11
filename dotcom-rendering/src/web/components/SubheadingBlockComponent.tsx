import { unwrapHtml } from '../../model/unwrapHtml';
import { RewrappedComponent } from './RewrappedComponent';

export const SubheadingBlockComponent: React.FC<{ html: string }> = ({
	html,
}) => {
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
