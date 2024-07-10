/**
 * @file
 * This file was largely copied from src/components/Logo.tsx
 */
import { css } from '@emotion/react';
import { visuallyHidden } from '@guardian/source/foundations';
import { SvgGuardianLogo } from '@guardian/source/react-components';
import type { EditionId } from '../../../lib/edition';
import { nestedOphanComponents } from '../../../lib/ophan-helpers';
import { palette } from '../../../palette';
import { SvgGuardianNewsProviderLogo } from '../../SvgGuardianNewsProviderLogo';

type Props = {
	editionId: EditionId;
};

export const Logo = ({ editionId }: Props) => {
	switch (editionId) {
		case 'UK':
			return (
				<a
					href="/"
					data-link-name={nestedOphanComponents('header', 'logo')}
				>
					<span
						css={css`
							${visuallyHidden};
						`}
					>
						The Guardian - Back to home
					</span>
					<SvgGuardianNewsProviderLogo />
				</a>
			);
		default:
			return (
				<a
					href="/"
					data-link-name={nestedOphanComponents('header', 'logo')}
				>
					<span
						css={css`
							${visuallyHidden};
						`}
					>
						The Guardian - Back to home
					</span>
					<SvgGuardianLogo
						textColor={palette('--masthead-nav-link-text')}
					/>
				</a>
			);
	}
};
