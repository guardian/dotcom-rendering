import { css } from '@emotion/react';
import { from, space, visuallyHidden } from '@guardian/source/foundations';
import { Hide, SvgGuardianLogo } from '@guardian/source/react-components';
import { nestedOphanComponents } from '../../../lib/ophan-helpers';
import { palette } from '../../../palette';
import TheWholePictureGuardianLogoSmall from '../../../static/icons/the-guardian-whole-picture-logo-small.svg';
import TheWholePictureGuardianLogo from '../../../static/icons/the-guardian-whole-picture-logo.svg';

const gridMainColumn = css`
	grid-column: main-column-start / main-column-end;
`;

const veggieBurgerDiameter = 40;

const logoStyles = css`
	${gridMainColumn}
	grid-row: 1;
	position: relative;
	display: flex;
	justify-self: end;
	align-self: end;
	margin-top: ${space[2]}px;
	margin-bottom: 6px;
	right: ${veggieBurgerDiameter + space[3]}px;

	${from.mobileMedium} {
		right: 0;
	}
	${from.mobileLandscape} {
		margin-bottom: ${space[2]}px;
	}

	svg {
		width: 152px;
		${from.mobileMedium} {
			width: 207px;
		}
		${from.tablet} {
			width: 252px;
		}
		${from.desktop} {
			width: 291px;
		}
	}
`;

const logoStylesFromLeftCol = css`
	svg {
		${from.leftCol} {
			width: 324px;
		}
	}
`;

const theWholePictureStyles = css`
	margin-bottom: 2px;
	${from.tablet} {
		margin-top: 10px;
		margin-bottom: 6px;
	}

	svg {
		height: auto;
		width: 173px;
		${from.tablet} {
			width: 246px;
		}
	}
`;

const slimNavLogoOverrides = css`
	position: relative;
	margin-top: ${space[2]}px;
	margin-bottom: ${space[2]}px;
	right: ${veggieBurgerDiameter + 6}px;

	${from.mobileLandscape} {
		margin-top: ${space[1]}px;
		margin-bottom: ${space[2]}px;
	}
	${from.tablet} {
		right: ${space[8]}px;
	}
	${from.desktop} {
		right: ${space[10]}px;
	}
	svg {
		width: 130px;
		${from.tablet} {
			width: 86px;
		}
		${from.desktop} {
			width: 130px;
		}
		${from.leftCol} {
			width: 140px;
		}
		${from.wide} {
			width: 145px;
		}
	}
`;

type Props = {
	/**
	 * We are running a campaign in the US called "The Whole Picture"
	 * We will use a different logo for the US edition for the duration of this campaign.
	 */
	showWholePictureLogo: boolean;
	hasPageSkin: boolean;
	showSlimNav: boolean;
};

export const Logo = ({
	showWholePictureLogo,
	hasPageSkin,
	showSlimNav,
}: Props) => (
	<div
		css={[
			logoStyles,
			!hasPageSkin && logoStylesFromLeftCol,
			showWholePictureLogo && theWholePictureStyles,
			showSlimNav && slimNavLogoOverrides,
		]}
	>
		<a href="/" data-link-name={nestedOphanComponents('header', 'logo')}>
			<span
				css={css`
					${visuallyHidden};
				`}
			>
				The Guardian - Back to home
			</span>

			{showWholePictureLogo ? (
				<>
					<Hide from="tablet">
						<TheWholePictureGuardianLogoSmall />
					</Hide>
					<Hide until="tablet">
						<TheWholePictureGuardianLogo />
					</Hide>
				</>
			) : (
				<SvgGuardianLogo
					textColor={palette('--masthead-nav-link-text')}
				/>
			)}
		</a>
	</div>
);
