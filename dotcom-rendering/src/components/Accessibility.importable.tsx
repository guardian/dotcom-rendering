import { css } from '@emotion/react';
import { isUndefined, removeCookie, setCookie, storage } from '@guardian/libs';
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

// This is hardcoded, and must be changed if the experiment bucket changes
// https://github.com/guardian/frontend/blob/09f49b80/common/app/experiments/Experiments.scala#L57
const darkModeCookieName = 'X-GU-Experiment-0perc-D';

const PreferenceToggle = ({
	label,
	checked,
	onChange,
	dataLinkName,
	description,
}: {
	label: string;
	checked: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	dataLinkName: string;
	description: string;
}) => {
	return (
		<label>
			<input
				type="checkbox"
				checked={checked}
				onChange={onChange}
				data-link-name={dataLinkName}
			/>
			<span css={bold}>{label}</span>
			{checked
				? `Untick this to disable ${description}`
				: `Tick this to enable ${description}`}
		</label>
	);
};

/**
 * Updates the user's accessibility preferences
 *
 * ## Why does this need to be an Island?
 *
 * Allows user to select their accessibility preferences
 */
export const Accessibility = () => {
	const { darkModeAvailable } = useConfig();
	const [shouldFlash, setShouldFlash] = useState<boolean>(true);
	const [shouldParticipate, setParticipate] =
		useState<boolean>(darkModeAvailable);

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
		if (shouldParticipate) {
			setCookie({
				name: darkModeCookieName,
				value: 'true',
			});
		} else {
			removeCookie({ name: darkModeCookieName });
		}

		const timeout = setTimeout(() => {
			// we must reload the page for the preference to take effect,
			// as this relies on a server-side test & cookie combination
			if (shouldParticipate !== darkModeAvailable) {
				window.location.reload();
			}
		}, 1200);

		return () => clearTimeout(timeout);
	}, [shouldParticipate, darkModeAvailable]);

	const toggleFlash = (): void => {
		setShouldFlash((prev) => (isUndefined(prev) ? false : !prev));
	};

	return (
		<FrontSection title="Preferences" editionId="UK" discussionApiUrl="">
			<div>
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

					<PreferenceToggle
						label="Allow flashing elements"
						checked={shouldFlash}
						onChange={toggleFlash}
						dataLinkName="flashing-elements"
						description="flashing and moving elements"
					/>
				</fieldset>
			</div>

			<br />

			<fieldset css={formStyle}>
				<p>
					We offer beta support for a dark colour scheme on the web.
					The colour scheme preference will follow your system
					settings.
				</p>
				<label>
					<input
						type="checkbox"
						checked={shouldParticipate}
						onChange={(e) => {
							setParticipate(e.target.checked);
						}}
						data-link-name="prefers-colour-scheme"
					/>
					<span css={bold}>
						Participate in the dark colour scheme beta{' '}
					</span>
					{shouldParticipate
						? 'Untick this to opt out (browser will refresh)'
						: 'Tick this to opt in (browser will refresh)'}
				</label>
			</fieldset>
		</FrontSection>
	);
};
