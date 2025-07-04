import type {
	LinkButtonProps,
	LinkProps,
} from '@guardian/source/react-components';
import { LinkButton } from '@guardian/source/react-components';
import React from 'react';
import { ThemedLink } from '../ThemedLink/ThemedLink';

export const ExternalLink = (props: LinkProps) => (
	<ThemedLink {...props} rel="noopener noreferrer" />
);

export const ExternalLinkButton = (props: LinkButtonProps) => (
	<LinkButton {...props} rel="noopener noreferrer" />
);
