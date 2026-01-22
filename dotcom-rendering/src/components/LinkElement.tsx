import { EditorialLinkButton } from './Button/EditorialLinkButton';
import { ProductLinkElementButton } from './Button/ProductLinkElementButton';
import { getPropsForLinkUrl, isExternalLink } from './Button/utils';

export type LinkElementProps = {
	label: string;
	url: string;
	linkType: 'StandardButton' | 'ProductButton';
	priority?: 'Primary' | 'Tertiary';
};

const LinkTypePriorityToButtonPriority = {
	Primary: 'primary',
	Tertiary: 'tertiary',
} as const;

export const LinkElement = ({
	label,
	url,
	priority = 'Primary',
	linkType,
}: LinkElementProps) => {
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
					href={url}
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
