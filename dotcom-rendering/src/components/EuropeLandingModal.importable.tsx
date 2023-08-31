import { css } from '@emotion/react';
import { getCookie, setCookie } from '@guardian/libs';
import { body, headline, palette, space } from '@guardian/source-foundations';
import { Button, Radio, RadioGroup } from '@guardian/source-react-components';
import { useState } from 'react';
import type { EditionId } from '../lib/edition';
import { getEditionFromId } from '../lib/edition';
import { guard } from '../lib/guard';
import { SvgClose } from './SvgClose';
import { SvgFlagsInCircle } from './SvgFlagsInCircle';

// todo change z index
const dialogStyles = css`
	top: 0;
	position: fixed;
	border: none;
	width: 100vw;
	height: 100vh;
	z-index: 1000;
	background: rgba(18, 18, 18, 0.7);
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${palette.brand[300]};
`;
const styles = css`
	display: flex;
	width: 620px;
	background: white;
	flex-direction: row;
`;

const textStyles = css`
	padding: ${space[4]}px 0 ${space[4]}px ${space[4]}px;
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
	${headline.small({ fontWeight: 'bold' })};
`;
const bodyStyles = css`
	${body.medium()};
	margin-top: ${space[3]}px;
`;
const buttonDivStyles = css`
	margin-top: 77px;
`;
const OKButtonStyles = css`
	margin-right: ${space[2]}px;
`;
const closeButtonStyles = css`
	position: relative;
	left: 451px;
	bottom: 246px;
	padding: 0 10px;
`;

type ModalType =
	| 'NoModal'
	| 'ModalSwitched'
	| 'ModalDoYouWantToSwitch'
	| 'ModalNowSeeing';

const coe = [
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

const ukUsAusCountries = ['UK', 'US', 'AU'];

const ukUsAusEditions = ['UK', 'US', 'AUS'];

const isValidEdition = guard(['EUR', 'US', 'UK', 'AU', 'INT'] as const);

const getModalType = (): ModalType => {
	const editionCookie = getCookie({ name: 'GU_EDITION' });

	const geoCountryCookie = getCookie({ name: 'GU_geo_country' });
	const modalDismissedCookie = getCookie({ name: 'GU_eu_modal_dismissed' });
	if (!geoCountryCookie) {
		return 'NoModal';
	}
	if (modalDismissedCookie) {
		return 'NoModal';
	}
	if (editionCookie === 'INT' && coe.includes(geoCountryCookie)) {
		return 'ModalSwitched';
	}

	if (
		editionCookie === 'INT' &&
		!coe.includes(geoCountryCookie) &&
		!ukUsAusCountries.includes(geoCountryCookie)
	) {
		return 'ModalDoYouWantToSwitch';
	}

	if (
		editionCookie &&
		ukUsAusEditions.includes(editionCookie) &&
		coe.includes(geoCountryCookie)
	) {
		return 'ModalDoYouWantToSwitch';
	}

	if (!editionCookie && coe.includes(geoCountryCookie)) {
		return 'ModalNowSeeing';
	}
	return 'NoModal';
};

interface Props {
	edition: EditionId;
}
export const EuropeLandingModal = ({ edition }: Props) => {
	const editionCookie = getCookie({ name: 'GU_EDITION' });
	const modalType = getModalType();
	const [isOpen, setIsOpen] = useState(modalType !== 'NoModal');
	const [switchEdition, setSwitchEdition] = useState(false);
	const [selectedEdition, setSelectedEdition] = useState<EditionId>(
		isValidEdition(editionCookie) ? editionCookie : edition,
	);

	const confirmNewEdition = (editionId: EditionId) => {
		setCookie({
			name: 'GU_EDITION',
			value: editionId,
			isCrossSubdomain: true,
		});
		if (editionId === edition) {
			setIsOpen(false);
		} else {
			window.location.replace(getEditionFromId(editionId).url);
		}
	};

	const dismissModal = () => {
		setCookie({
			name: 'GU_eu_modal_dismissed',
			value: 'true',
			daysToLive: 100, //todo - check how long
		});
		setIsOpen(false);
	};

	if (!isOpen) return <></>;

	return (
		<dialog css={dialogStyles}>
			<div css={styles}>
				{!switchEdition ? (
					<>
						<div css={textStyles}>
							<h1 css={headlineStyles}>
								{modalType === 'ModalSwitched' &&
									"We've switched you to the new Europe edition of the Guardian"}
								{modalType === 'ModalDoYouWantToSwitch' &&
									'Would you like to switch to our new Europe edition?'}
								{modalType === 'ModalNowSeeing' && 'todo'}{' '}
								{/* todo - get text for this*/}
							</h1>
							<p css={bodyStyles}>
								{modalType === 'ModalSwitched' &&
									"You're now getting more coverage tailored for readers in Europe"}
								{modalType === 'ModalDoYouWantToSwitch' &&
									'We’ve launched a new edition of the Guardian with our global coverage tailored for readers in Europe'}
								{modalType === 'ModalNowSeeing' && 'todo'}{' '}
								{/* todo - get text for this*/}
							</p>
							<div css={buttonDivStyles}>
								{modalType === 'ModalSwitched' && (
									<Button
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
										onClick={() => dismissModal()}
										cssOverrides={OKButtonStyles}
									>
										{' '}
										No, Thanks{' '}
									</Button>
								)}
								{modalType === 'ModalNowSeeing' && (
									<Button
										onClick={() => {
											//todo
										}}
										cssOverrides={OKButtonStyles}
									>
										{' '}
										TODO{' '}
									</Button>
								)}
								<Button
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
						<RadioGroup
							error=""
							label="Choose your edition"
							name="colours"
							orientation="vertical"
						>
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
							onClick={() => confirmNewEdition(selectedEdition)}
						>
							Confirm
						</Button>
						<Button
							cssOverrides={closeButtonStyles}
							onClick={() => dismissModal()}
						>
							<SvgClose />
						</Button>
					</div>
				)}
			</div>
		</dialog>
	);
};
