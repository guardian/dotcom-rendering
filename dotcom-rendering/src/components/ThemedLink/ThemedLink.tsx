import { css } from '@emotion/react';
import type { LinkProps } from '@guardian/source/react-components';
import { Link as SourceLink } from '@guardian/source/react-components';
import React from 'react';

const linkThemeStyles = css`
	color: #0077b6;
	&:hover {
		color: #0077b6;
	}
`;

export function ThemedLink(props: LinkProps) {
	return <SourceLink {...props} cssOverrides={linkThemeStyles} />;
}
