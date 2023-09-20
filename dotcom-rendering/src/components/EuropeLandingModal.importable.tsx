import { css } from '@emotion/react';
import { cmp } from '@guardian/consent-management-platform';
import { getCookie, setCookie } from '@guardian/libs';
import {
	body,
	from,
	headline,
	palette,
	space,
} from '@guardian/source-foundations';
import {
	Button,
	Radio,
	RadioGroup,
	SvgCross,
} from '@guardian/source-react-components';
import { useCallback, useEffect, useState } from 'react';
import type { EditionId } from '../lib/edition';
import { getEditionFromId } from '../lib/edition';
import { guard } from '../lib/guard';
import { nestedOphanComponents } from '../lib/ophan-helpers';
import { SvgFlagsInCircle } from './SvgFlagsInCircle';

const modalShownCookie = 'GU_EU_MODAL_SHOWN';

// Have not used margin as it will change the backdrop
const dialogStyles = css`
	&::backdrop {
		background: rgba(18, 18, 18, 0.7);
		padding: 10px;
	}
	&[open] {
		display: flex;
	}
	display: none;
	max-width: calc(100vw - 20px);
	padding: 0;
	width: 620px;
	justify-content: space-between;
	background: white;
	flex-direction: row;
	top: 0;
	position: fixed;
	border: none;
	/* We cant use getZIndex() here as this dialog has to overlap content on the page that does not follow our getZIndex standard (thrashers) */
	z-index: 1000;
	color: ${palette.brand[300]};
`;

const textStyles = css`
	${from.tablet} {
		padding: ${space[4]}px 0 ${space[4]}px ${space[4]}px;
	}
	padding: 6px 0 15px 10px;
	flex: 3;
`;

const imageStyles = css`
	flex: 2;
	overflow: hidden;
`;

const editionSectionDivStyles = css`
	padding: ${space[3]}px 0 ${space[4]}px ${space[3]}px;
`;

const headlineStyles = css`
	${headline.xsmall({ fontWeight: 'bold' })};
	${from.tablet} {
		${headline.small({ fontWeight: 'bold' })};
	}
`;

const bodyStyles = css`
	${body.medium()};
	margin-top: ${space[3]}px;
`;

const buttonDivStyles = css`
	display: flex;
	margin-top: 33px;
	${from.tablet} {
		margin-top: 77px;
	}
`;

const OKButtonStyles = css`
	margin-right: ${space[2]}px;

	/* override built in source focus styles */
	html:not(.src-focus-disabled) &:focus {
		outline: 2px solid ${palette.focus[400]};
		outline-offset: 0px;
		box-shadow: none;
	}
`;

const closeButtonStyles = css`
	fill: white;
	margin: 10px;
	position: relative;
	padding: 0 5px;
`;

export type ModalType = 'NoModal' | 'ModalSwitched' | 'ModalDoYouWantToSwitch';

const coe: string[] = [
	'AL',
	'AD',
	'AM',
	'AT',
	'AZ',
	'BE',
	'BA',
	'BG',
	'HR',
	'CY',
	'CZ',
	'DK',
	'EE',
	'FI',
	'FR',
	'GE',
	'DE',
	'GR',
	'HU',
	'IS',
	'IE',
	'IT',
	'LV',
	'LI',
	'LT',
	'LU',
	'MT',
	'MC',
	'ME',
	'NL',
	'MK',
	'NO',
	'PL',
	'PT',
	'MD',
	'RO',
	'SM',
	'RS',
	'SK',
	'SI',
	'ES',
	'SE',
	'CH',
	'TR',
	'UA',
];
const ukUsAusCC = ['GB', 'US', 'AU'];
export const isValidEdition = guard(['EUR', 'US', 'UK', 'AU', 'INT'] as const);

export const getModalType = (): ModalType => {
	const editionCookie = getCookie({ name: 'GU_EDITION' });
	const geoCountryCookie = getCookie({ name: 'GU_geo_country' });

	if (!geoCountryCookie) {
		return 'NoModal';
	}

	if (
		!editionCookie &&
		!coe.includes(geoCountryCookie) &&
		!ukUsAusCC.includes(geoCountryCookie)
	) {
		return 'ModalDoYouWantToSwitch';
	}

	// If selected INT and not in COE show do u want to switch
	if (editionCookie === 'INT' && !coe.includes(geoCountryCookie)) {
		return 'ModalDoYouWantToSwitch';
	}

	// If in COE
	if (coe.includes(geoCountryCookie)) {
		if (
			editionCookie === 'INT' ||
			!editionCookie ||
			editionCookie === 'EUR'
		) {
			// If INT edition or no edition
			return 'ModalSwitched';
		} else {
			// If US, UK, AUS edition
			return 'ModalDoYouWantToSwitch';
		}
	}

	return 'NoModal';
};

interface Props {
	edition: EditionId;
}
export const EuropeLandingModal = ({ edition }: Props) => {
	const editionCookie = getCookie({ name: 'GU_EDITION' });
	const modalType = getModalType();
	const [switchEdition, setSwitchEdition] = useState(false);
	const [selectedEdition, setSelectedEdition] = useState<EditionId>(
		isValidEdition(editionCookie) ? editionCookie : edition,
	);

	const initialize = useCallback(() => {
		const europeModal = document.getElementById('europe-modal-dialog');
		const modalShown = getCookie({ name: modalShownCookie });

		if (
			europeModal instanceof HTMLDialogElement &&
			modalType !== 'NoModal' &&
			!modalShown &&
			editionCookie !== 'EUR'
		) {
			setCookie({
				name: modalShownCookie,
				value: 'true',
				daysToLive: 90,
			});
			europeModal.addEventListener('close', () => {
				dismissModal();
			});
			europeModal.showModal();

			// Dirty way of recording that the EU modal has been opened by creating
			// a synthetic click which gets Ophan to record a "eu-modal : open" click event.
			document.getElementById('eu-modal-synthetic-click')?.click();

			document.documentElement.style.overflow = 'hidden';
			if (modalType === 'ModalSwitched') {
				setCookie({
					name: 'GU_EDITION',
					value: 'EUR',
					isCrossSubdomain: true,
				});
			}
		}
	}, [editionCookie, modalType]);

	useEffect(() => {
		void cmp.willShowPrivacyMessage().then((willShowCmp) => {
			// Don't show the EU modal if its the users first time visiting the site and they haven't
			// seen the CMP banner yet.
			if (!willShowCmp) {
				initialize();
			}
		});
	}, [initialize]);

	const confirmNewEdition = (editionId: EditionId) => {
		dismissModal();

		// Always send EUR users to the Edition preference endpoint.
		// We want them to be redirected to the /europe front.
		if (editionId !== edition || editionId === 'EUR') {
			window.location.replace(getEditionFromId(editionId).url);
		}
	};

	const dismissModal = () => {
		const europeModal = document.getElementById('europe-modal-dialog');
		if (europeModal instanceof HTMLDialogElement) {
			europeModal.close();
			document.documentElement.style.overflow = '';
		}
	};

	return (
		<dialog
			css={dialogStyles}
			id={'europe-modal-dialog'}
			data-component={'eu-modal'}
		>
			<div
				id="eu-modal-synthetic-click"
				hidden={true}
				data-link-name={nestedOphanComponents('eu-modal', 'open')}
			/>
			{!switchEdition ? (
				<>
					<div css={textStyles}>
						<h1 css={headlineStyles}>
							{modalType === 'ModalSwitched' &&
								'We’ve switched you to the new Europe edition of the Guardian'}
							{modalType === 'ModalDoYouWantToSwitch' &&
								'Would you like to switch to our new Europe edition?'}
						</h1>
						<p css={bodyStyles}>
							{modalType === 'ModalSwitched' &&
								'You’re now getting more coverage tailored for readers in Europe'}
							{modalType === 'ModalDoYouWantToSwitch' &&
								'We’ve launched a new edition of the Guardian with our global coverage tailored for readers in Europe'}
						</p>
						<div css={buttonDivStyles}>
							{modalType === 'ModalSwitched' && (
								<Button
									data-link-name={nestedOphanComponents(
										'eu-modal',
										'switched',
										'ok-thanks',
									)}
									size={'small'}
									onClick={() => {
										confirmNewEdition('EUR');
									}}
									cssOverrides={OKButtonStyles}
								>
									OK, Thanks
								</Button>
							)}
							{modalType === 'ModalDoYouWantToSwitch' && (
								<Button
									data-link-name={nestedOphanComponents(
										'eu-modal',
										'not-switched',
										'no-thanks',
									)}
									size={'small'}
									onClick={() => dismissModal()}
									cssOverrides={OKButtonStyles}
								>
									{' '}
									No, Thanks{' '}
								</Button>
							)}
							<Button
								data-link-name={nestedOphanComponents(
									'eu-modal',
									modalType === 'ModalSwitched'
										? 'switched'
										: 'not-switched',
									'switch-edition',
								)}
								size={'small'}
								priority={'subdued'}
								onClick={() => setSwitchEdition(true)}
							>
								{' '}
								Switch Edition{' '}
							</Button>
						</div>
					</div>
					<div css={imageStyles} aria-hidden="true">
						<SvgFlagsInCircle />
					</div>
				</>
			) : (
				<div css={editionSectionDivStyles}>
					<RadioGroup label="Choose your edition" name="editions">
						<Radio
							defaultChecked={selectedEdition === 'EUR'}
							label="Europe edition"
							value="EUR"
							onChange={() => setSelectedEdition('EUR')}
							checked={selectedEdition === 'EUR'}
						/>
						<Radio
							defaultChecked={selectedEdition === 'UK'}
							label="UK edition"
							value="UK"
							onChange={() => setSelectedEdition('UK')}
							checked={selectedEdition === 'UK'}
						/>
						<Radio
							defaultChecked={selectedEdition === 'US'}
							label="US edition"
							value="US"
							onChange={() => setSelectedEdition('US')}
							checked={selectedEdition === 'US'}
						/>
						<Radio
							defaultChecked={selectedEdition === 'AU'}
							label="Australia edition"
							value="AU"
							onChange={() => setSelectedEdition('AU')}
							checked={selectedEdition === 'AU'}
						/>
						<Radio
							defaultChecked={selectedEdition === 'INT'}
							label="International edition"
							value="INT"
							onChange={() => setSelectedEdition('INT')}
							checked={selectedEdition === 'INT'}
						/>
					</RadioGroup>
					<Button
						data-link-name={nestedOphanComponents(
							'eu-modal',
							'switch-edition',
							'confirm-' + selectedEdition,
						)}
						size={'small'}
						onClick={() => confirmNewEdition(selectedEdition)}
					>
						Confirm
					</Button>
				</div>
			)}
			{switchEdition && (
				<Button
					data-link-name={nestedOphanComponents(
						'eu-modal',
						modalType === 'ModalSwitched'
							? 'switched'
							: 'not-switched',
						'close',
					)}
					aria-label={'close modal'}
					size={'small'}
					cssOverrides={closeButtonStyles}
					onClick={() => dismissModal()}
				>
					<SvgCross isAnnouncedByScreenReader={true} size="small" />
				</Button>
			)}
		</dialog>
	);
};
