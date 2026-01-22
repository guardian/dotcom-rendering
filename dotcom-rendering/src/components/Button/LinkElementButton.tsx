import { EditorialLinkButton } from './EditorialLinkButton';
import { ProductLinkElementButton } from './ProductLinkElementButton';
import { getPropsForLinkUrl, isExternalLink } from './utils';

type LinkElementButtonProps = {
	label: string;
	url: string;
	linkType: 'StandardButton' | 'ProductButton';
	priority?: 'Primary' | 'Tertiary';
};

const LinkTypePriorityToButtonPriority = {
	Primary: 'primary',
	Tertiary: 'tertiary',
} as const;

export const LinkElementButton = ({
	label,
	url,
	priority = 'Primary',
	linkType,
}: LinkElementButtonProps) => {
	const buttonPriority = LinkTypePriorityToButtonPriority[priority];
	switch (linkType) {
		case 'StandardButton': {
			const propsForLinkUrl = isExternalLink(url)
				? getPropsForLinkUrl(label)
				: {};

			return (
				<EditorialLinkButton
					priority={buttonPriority}
					data-link-name={`standard link button ${priority}`}
					data-spacefinder-role="inline"
					data-ignore="global-link-styling"
					{...propsForLinkUrl}
				>
					{label}
				</EditorialLinkButton>
			);
		}
		case 'ProductButton': {
			return (
				<ProductLinkElementButton
					priority={buttonPriority}
					label={label}
					url={url}
				/>
			);
		}
	}
};
