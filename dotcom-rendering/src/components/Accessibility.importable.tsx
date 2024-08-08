import { css } from '@emotion/react';
import { isUndefined, setCookie, storage } from '@guardian/libs';
import { article17, palette } from '@guardian/source/foundations';
import { useEffect, useState } from 'react';
import { useConfig } from './ConfigContext';
import { FrontSection } from './FrontSection';

const formStyle = css`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	padding: 0.5rem 1rem;
	border: 2px groove ${palette.neutral[86]};
	margin-left: 10px;
	${article17}
`;

const bold = css`
	font-weight: bold;
`;

/**
 * Updates the user's accessibility preferences
 *
 * ## Why does this need to be an Island?
 *
 * Allows user to select their accessibility preferences
 */
export const Accessibility = () => {
	const { darkModeAvailable } = useConfig();
	const [shouldFlash, setShouldFlash] = useState<boolean | undefined>();
	const [participate, setParticipate] = useState<boolean>(darkModeAvailable);

	const checked = shouldFlash ?? true;

	useEffect(() => {
		const flashingPreference = storage.local.get(
			'gu.prefs.accessibility.flashing-elements',
		);
		if (typeof flashingPreference === 'boolean') {
			setShouldFlash(flashingPreference);
		}
	}, []);

	useEffect(() => {
		if (isUndefined(shouldFlash)) return;
		storage.local.set(
			'gu.prefs.accessibility.flashing-elements',
			shouldFlash,
		);
	}, [shouldFlash]);

	useEffect(() => {
		setCookie({
			name:
				// This is hardcoded, and must be changed if the experiment bucket changes
				// https://github.com/guardian/frontend/blob/09f49b80/common/app/experiments/Experiments.scala#L57
				'X-GU-Experiment-0perc-D',
			value: participate ? 'true' : 'false',
		});

		const timeout = setTimeout(() => {
			// we must reload the page for the preference to take effect,
			// as this relies on a server-side test & cookie combination
			if (participate !== darkModeAvailable) window.location.reload();
		}, 1200);

		return () => clearTimeout(timeout);
	}, [participate, darkModeAvailable]);

	const toggleFlash = (): void => {
		setShouldFlash((prev) => (isUndefined(prev) ? false : !prev));
	};

	return (
		<FrontSection
			title={'Preferences'}
			editionId={'UK'}
			discussionApiUrl={''}
		>
			<form>
				<fieldset css={formStyle}>
					<p>
						We aim to make this site accessible to a wide audience
						and ensure a great experience for all users by
						conforming to World Wide Web Consortium accessibility
						guidelines (W3C's WCAG).
					</p>
					<p>
						However, if you are having trouble reading this website,
						you can change the way it looks or disable some of its
						functionalities.
					</p>

					<label>
						<input
							type="checkbox"
							checked={checked}
							onChange={toggleFlash}
							data-link-name="flashing-elements"
						/>
						<span css={bold}>Allow flashing elements </span>
						{checked
							? 'Untick this to disable flashing and moving elements'
							: 'Tick this to enable flashing or moving elements'}
					</label>
				</fieldset>

				<br />

				<fieldset css={formStyle}>
					<p>
						We offer beta support for a dark colour scheme on the
						web. The colour scheme preference will follow your
						system settings.
					</p>
					<label>
						<input
							type="checkbox"
							checked={participate}
							onChange={(e) => {
								setParticipate(e.target.checked);
							}}
							data-link-name="prefers-colour-scheme"
						/>
						<span css={bold}>
							Participate in the dark colour scheme beta{' '}
						</span>
						{participate
							? 'Untick this to opt out'
							: 'Tick this to opt in'}
					</label>
				</fieldset>
			</form>
		</FrontSection>
	);
};
