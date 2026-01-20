import type { ButtonPriority } from '@guardian/source/react-components';
import { EditorialLinkButton } from './EditorialLinkButton';
import { getPropsForLinkUrl } from './utils';

type LinkElementButtonProps = {
	label: string;
	url: string;
	priority?: ButtonPriority;
};

export const StandardLinkElementButton = ({
	label,
	url,
	priority,
}: LinkElementButtonProps) => {
	return (
		<EditorialLinkButton
			iconSide="right"
			priority={priority}
			data-link-name={`standard link button ${priority}`}
			data-spacefinder-role="inline"
			data-ignore="global-link-styling"
			{...getPropsForLinkUrl(url, label)}
		>
			{label}
		</EditorialLinkButton>
	);
};
