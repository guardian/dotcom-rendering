import type { ButtonPriority } from '@guardian/source/react-components';
import { EditorialLinkButton } from './EditorialLinkButton';
import { getPropsForLinkUrl, isExternalLink } from './utils';

export type StandardLinkElementButtonProps = {
	label: string;
	url: string;
	priority?: ButtonPriority;
};

export const StandardLinkElementButton = ({
	label,
	url,
	priority,
}: StandardLinkElementButtonProps) => {
	const propsForLinkUrl = isExternalLink(url)
		? getPropsForLinkUrl(label)
		: {};

	return (
		<EditorialLinkButton
			iconSide="right"
			priority={priority}
			data-link-name={`standard link button ${priority}`}
			data-spacefinder-role="inline"
			data-ignore="global-link-styling"
			{...propsForLinkUrl}
		>
			{label}
		</EditorialLinkButton>
	);
};
