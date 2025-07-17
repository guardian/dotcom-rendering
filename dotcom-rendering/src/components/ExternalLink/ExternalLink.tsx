/**
 * @file ExternalLink.tsx
 * This file was migrated from:
 * https://github.com/guardian/gateway/blob/b980d008f91bd1abb108e50de9cdd1c364f37f4d/src/client/components/ExternalLink.tsx
 */
import type {
	LinkButtonProps,
	LinkProps,
} from '@guardian/source/react-components';
import { LinkButton } from '@guardian/source/react-components';
import { ThemedLink } from '../ThemedLink/ThemedLink';

export const ExternalLink = (props: LinkProps) => (
	<ThemedLink {...props} rel="noopener noreferrer" />
);

export const ExternalLinkButton = (props: LinkButtonProps) => (
	<LinkButton {...props} rel="noopener noreferrer" />
);
