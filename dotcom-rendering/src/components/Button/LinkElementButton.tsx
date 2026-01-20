import { ProductLinkButton } from './ProductLinkElementButton';
import { StandardLinkElementButton } from './StandardLinkElementButton';

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
	switch (linkType) {
		case 'StandardButton': {
			return (
				<StandardLinkElementButton
					label={label}
					url={url}
					priority={LinkTypePriorityToButtonPriority[priority]}
				/>
			);
		}
		case 'ProductButton': {
			return (
				<ProductLinkButton
					label={label}
					url={url}
					priority={LinkTypePriorityToButtonPriority[priority]}
				/>
			);
		}
	}
};
