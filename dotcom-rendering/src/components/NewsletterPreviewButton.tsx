import type { Size, ThemeButton } from '@guardian/source/react-components';
import { Button, LinkButton, SvgEye } from '@guardian/source/react-components';
import { palette } from '../palette';

export type NewsletterPreviewAction =
	| {
			behaviour: 'modal';
			onClick: () => void;
	  }
	| {
			behaviour: 'link';
			href: string;
			onClick: () => void;
	  };

/**
 * Colour overrides for newsletter tertiary buttons so that they are visible
 * in both light and dark mode, independent of the article theme.
 *
 * Used by the preview button and the "Browse more newsletters" link.
 */
export const newsletterTertiaryButtonTheme: Partial<ThemeButton> = {
	textTertiary: palette('--newsletter-preview-button-text'),
	borderTertiary: palette('--newsletter-preview-button-border'),
	backgroundTertiaryHover: palette('--newsletter-preview-button-hover'),
};

export const NewsletterPreviewButton = ({
	previewAction,
	size = 'default',
}: {
	previewAction: NewsletterPreviewAction;
	size?: Size;
}) =>
	previewAction.behaviour === 'link' ? (
		<LinkButton
			data-ignore="global-link-styling"
			priority="tertiary"
			icon={<SvgEye />}
			iconSide="left"
			href={previewAction.href}
			target="_blank"
			rel="noreferrer"
			onClick={previewAction.onClick}
			size={size}
			theme={newsletterTertiaryButtonTheme}
		>
			Preview latest
		</LinkButton>
	) : (
		<Button
			priority="tertiary"
			icon={<SvgEye />}
			iconSide="left"
			onClick={previewAction.onClick}
			type="button"
			size={size}
			theme={newsletterTertiaryButtonTheme}
		>
			Preview latest
		</Button>
	);
