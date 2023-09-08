import { css } from '@emotion/react';
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
import { useState } from 'react';
import type { EditionId } from '../lib/edition';
import { getEditionFromId } from '../lib/edition';
import { guard } from '../lib/guard';
import { useOnce } from '../lib/useOnce';
import { SvgFlagsInCircle } from './SvgFlagsInCircle';

const modalDismissedKey = 'gu.euModalDismissed';

const dialogStyles = css`
	&::backdrop {
		background: rgba(18, 18, 18, 0.7);
		padding: 10px;
	}
	&[open] {
		display: flex;
	}
	// Cannot use margin as it will effect the backdrop
	max-width: calc(100vw - 20px);
	padding: 0;
	width: 620px;
	justify-content: space-between;
	background: white;
	flex-direction: row;
	top: 0;
	position: fixed;
	border: none;
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
`;
const closeButtonStyles = css`
	fill: white;
	margin: 10px;
	position: relative;
	padding: 0 6px;
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

export const isValidEdition = guard(['EUR', 'US', 'UK', 'AU', 'INT'] as const);

export const getModalType = (): ModalType => {
	const editionCookie = getCookie({ name: 'GU_EDITION' });

	const geoCountryCookie = getCookie({ name: 'GU_geo_country' });
	const modalDismissedCookie = localStorage.getItem(modalDismissedKey);

	if (!geoCountryCookie) {
		return 'NoModal';
	}
	if (modalDismissedCookie) {
		return 'NoModal';
	}
	// If selected INT and not in COE show do u want to switch
	if (editionCookie === 'INT' && !coe.includes(geoCountryCookie)) {
		return 'ModalDoYouWantToSwitch';
	}
	// If in COE
	if (coe.includes(geoCountryCookie)) {
		if (editionCookie === 'INT' || !editionCookie) {
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

	useOnce(() => {
		const europeModal = document.getElementById('europe-modal-dialog');
		if (
			europeModal instanceof HTMLDialogElement &&
			modalType !== 'NoModal'
		) {
			europeModal.showModal();
			europeModal.addEventListener('close', () => {
				hideModal();
			});
			document.documentElement.style.overflow = 'hidden';
		}
	}, []);

	const confirmNewEdition = (editionId: EditionId) => {
		setCookie({
			name: 'GU_EDITION',
			value: editionId,
			isCrossSubdomain: true,
		});
		localStorage.setItem(modalDismissedKey, 'true');
		if (editionId === edition) {
			hideModal();
		} else {
			window.location.replace(getEditionFromId(editionId).url);
		}
	};

	const dismissModal = () => {
		localStorage.setItem(modalDismissedKey, 'true');
		hideModal();
	};

	const hideModal = () => {
		const europeModal = document.getElementById('europe-modal-dialog');
		if (europeModal instanceof HTMLDialogElement) {
			europeModal.close();
			document.documentElement.style.overflow = '';
		}
	};

	return (
		<dialog css={dialogStyles} id={'europe-modal-dialog'}>
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
									size={'small'}
									onClick={() => dismissModal()}
									cssOverrides={OKButtonStyles}
								>
									{' '}
									No, Thanks{' '}
								</Button>
							)}
							<Button
								size={'small'}
								priority={'subdued'}
								onClick={() => setSwitchEdition(true)}
							>
								{' '}
								Switch Edition{' '}
							</Button>
						</div>
					</div>
					<div css={imageStyles}>
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
						/>
						<Radio
							defaultChecked={selectedEdition === 'UK'}
							label="UK edition"
							value="UK"
							onChange={() => setSelectedEdition('UK')}
						/>
						<Radio
							defaultChecked={selectedEdition === 'US'}
							label="US edition"
							value="US"
							onChange={() => setSelectedEdition('US')}
						/>
						<Radio
							defaultChecked={selectedEdition === 'AU'}
							label="Australia edition"
							value="AU"
							onChange={() => setSelectedEdition('AU')}
						/>
						<Radio
							defaultChecked={selectedEdition === 'INT'}
							label="International edition"
							value="INT"
							onChange={() => setSelectedEdition('INT')}
						/>
					</RadioGroup>
					<Button
						size={'small'}
						onClick={() => confirmNewEdition(selectedEdition)}
					>
						Confirm
					</Button>
				</div>
			)}
			{switchEdition && (
				<Button
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
