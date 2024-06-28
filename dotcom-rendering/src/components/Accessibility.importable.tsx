import { css } from '@emotion/react';
import { storage } from '@guardian/libs';
import { textEgyptian17 } from '@guardian/source/foundations';
import { useEffect, useState } from 'react';
import { FrontSection } from './FrontSection';

const formStyle = css`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	padding: 1rem;
	border: 2px groove rgb(192, 192, 192);
	margin-left: 10px;
	${textEgyptian17}
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
	const [shouldFlash, setShouldFlash] = useState<boolean>(true);

	useEffect(() => {
		storage.local.set(
			'gu.prefs.accessibility.flashing-elements',
			shouldFlash,
		);
	}, [shouldFlash]);

	const useHandleCheckboxChange = (): void => {
		setShouldFlash((prev) => !prev);
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
							checked={shouldFlash}
							onChange={useHandleCheckboxChange}
							data-link-name="flashing-elements"
						/>
						<span css={bold}>Allow flashing elements </span>
						{shouldFlash
							? 'Untick this to disable flashing and moving elements'
							: 'Tick this to enable flashing or moving elements'}
					</label>
				</fieldset>
			</form>
		</FrontSection>
	);
};
