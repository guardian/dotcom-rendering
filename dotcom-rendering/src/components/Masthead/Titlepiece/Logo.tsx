/**
 * @file
 * This file was largely copied from src/components/Logo.tsx
 */
import { css } from '@emotion/react';
import { visuallyHidden } from '@guardian/source/foundations';
import { SvgGuardianLogo } from '@guardian/source/react-components';
import { nestedOphanComponents } from '../../../lib/ophan-helpers';
import { palette } from '../../../palette';

export const Logo = () => (
	<a href="/" data-link-name={nestedOphanComponents('header', 'logo')}>
		<span
			css={css`
				${visuallyHidden};
			`}
		>
			The Guardian - Back to home
		</span>
		<SvgGuardianLogo textColor={palette('--masthead-nav-link-text')} />
	</a>
);
