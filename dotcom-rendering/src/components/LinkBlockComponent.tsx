import { EditorialLinkButton } from './Button/EditorialLinkButton';
import { ProductLinkButton } from './Button/ProductLinkButton';
import { heightAutoStyle, wrapButtonTextStyle } from './Button/styles';
import { getPropsForLinkUrl, isExternalLink } from './Button/utils';

export type LinkBlockComponentProps = {
	label: string;
	url: string;
	linkType: 'StandardButton' | 'ProductButton';
	priority?: 'Primary' | 'Tertiary';
};

const LinkTypePriorityToButtonPriority = {
	Primary: 'primary',
	Tertiary: 'tertiary',
} as const;

export const LinkBlockComponent = ({
	label,
	url,
	priority = 'Primary',
	linkType,
}: LinkBlockComponentProps) => {
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
					cssOverrides={heightAutoStyle}
					href={url}
				>
					<span css={wrapButtonTextStyle}>{label}</span>
				</EditorialLinkButton>
			);
		}
		case 'ProductButton': {
			return (
				<ProductLinkButton
					priority={buttonPriority}
					label={label}
					url={url}
				/>
			);
		}
	}
};
