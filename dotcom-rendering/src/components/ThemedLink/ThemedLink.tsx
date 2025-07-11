import { css } from '@emotion/react';
import { palette } from '@guardian/source/foundations';
import type { LinkProps } from '@guardian/source/react-components';
import { Link as SourceLink } from '@guardian/source/react-components';

const linkThemeStyles = css`
	color: ${palette.brand[500]};
	&:hover {
		color: ${palette.brand[500]};
	}
`;

export function ThemedLink(props: LinkProps) {
	return <SourceLink {...props} cssOverrides={linkThemeStyles} />;
}
