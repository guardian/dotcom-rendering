import { css } from '@emotion/react';
import { visuallyHidden } from '@guardian/source/foundations';
import { Hide, SvgGuardianLogo } from '@guardian/source/react-components';
import { nestedOphanComponents } from '../../../lib/ophan-helpers';
import { palette } from '../../../palette';
import TheWholePictureGuardianLogoSmall from '../../../static/icons/the-guardian-whole-picture-logo-small.svg';
import TheWholePictureGuardianLogo from '../../../static/icons/the-guardian-whole-picture-logo.svg';

type Props = {
	/**
	 * We are running a campaign in the US called "The Whole Picture"
	 * We will use a different logo for the US edition for the duration of this campaign.
	 */
	showWholePictureLogo: boolean;
};

export const Logo = ({ showWholePictureLogo }: Props) => (
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
			<SvgGuardianLogo textColor={palette('--masthead-nav-link-text')} />
		)}
	</a>
);
