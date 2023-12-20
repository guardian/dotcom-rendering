import { css } from '@emotion/react';
import {
	from,
	palette as sourcePalette,
	space,
	visuallyHidden,
} from '@guardian/source-foundations';
import { SvgGuardianLogo } from '@guardian/source-react-components';
import type { EditionId } from '../lib/edition';
import { getZIndex } from '../lib/getZIndex';
import { nestedOphanComponents } from '../lib/ophan-helpers';
import { SvgGuardianAustraliaLogo } from './SvgGuardianAustraliaLogo';
import { SvgGuardianBestNewspaperLogo } from './SvgGuardianBestNewspaperLogo';

const linkStylesUntilLeftCol = css`
	float: right;
	margin-top: 6px;
	margin-right: 54px;
	margin-bottom: 10px;
	width: 146px;

	${from.mobileMedium} {
		margin-right: 10px;
		width: 195px;
	}
	${from.mobileLandscape} {
		margin-right: 20px;
	}
	${from.tablet} {
		width: 224px;
	}
	${from.desktop} {
		margin-top: 5px;
		margin-bottom: ${space[3]}px;
		position: relative;
		width: 295px;
	}
	${getZIndex('TheGuardian')}
`;

const linkStylesFromLeftCol = css`
	${from.wide} {
		margin-right: 96px;
	}
`;

type Props = {
	editionId: EditionId;
	hasPageSkin?: boolean;
};

export const Logo = ({ editionId, hasPageSkin = false }: Props) => {
	switch (editionId) {
		case 'UK':
			return (
				<a
					css={[
						linkStylesUntilLeftCol,
						!hasPageSkin && linkStylesFromLeftCol,
					]}
					href="/"
					data-link-name={nestedOphanComponents('nav3', 'logo')}
				>
					<span
						css={css`
							${visuallyHidden};
						`}
					>
						The Guardian - Back to home
					</span>
					<SvgGuardianBestNewspaperLogo />
				</a>
			);
		case 'AU':
			return (
				<a
					css={[
						linkStylesUntilLeftCol,
						!hasPageSkin && linkStylesFromLeftCol,
					]}
					href="/"
					data-link-name={nestedOphanComponents('nav3', 'logo')}
				>
					<span
						css={css`
							${visuallyHidden};
						`}
					>
						The Guardian - Back to home
					</span>
					<SvgGuardianAustraliaLogo />
				</a>
			);

		default:
			return (
				<a
					css={[
						linkStylesUntilLeftCol,
						!hasPageSkin && linkStylesFromLeftCol,
					]}
					href="/"
					data-link-name={nestedOphanComponents('nav3', 'logo')}
				>
					<span
						css={css`
							${visuallyHidden};
						`}
					>
						The Guardian - Back to home
					</span>
					<SvgGuardianLogo textColor={sourcePalette.neutral[100]} />
				</a>
			);
	}
};
