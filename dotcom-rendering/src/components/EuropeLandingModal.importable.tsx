import { Button, Radio, RadioGroup } from '@guardian/source-react-components';
import { css } from '@emotion/react';
import { headline, body, space, palette } from '@guardian/source-foundations';
import { SvgFlagsInCircle } from './SvgFlagsInCircle';
import { useState } from 'react';
import { EditionId } from '../lib/edition';
import { getCookie, setCookie } from '@guardian/libs';
import { SvgClose } from './SvgClose';

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

export const EuropeLandingModal = () => {
	const [isOpen, setIsOpen] = useState(!getCookie({ name: 'GU_EDITION' }));
	const [switchEdition, setSwitchEdition] = useState(false);
	const [selectedEdition, setSelectedEdition] = useState<EditionId>('EUR');

	const confirmNewEdition = () => {
		setCookie({
			name: 'GU_EDITION',
			value: selectedEdition,
			isCrossSubdomain: true,
		});
		if (selectedEdition === 'EUR') {
			setIsOpen(false);
		} else {
			window.location.reload();
		}
	};

	if (!isOpen) return <></>;

	return (
		<dialog css={dialogStyles}>
			<div css={styles}>
				{!switchEdition ? (
					<>
						<div css={textStyles}>
							<h1 css={headlineStyles}>
								We've switched you to the new Europe edition of
								the Guardian
							</h1>
							<p css={bodyStyles}>
								You're now getting more coverage tailored for
								readers in Europe
							</p>
							<div css={buttonDivStyles}>
								<Button
									onClick={() => setIsOpen(false)}
									cssOverrides={OKButtonStyles}
								>
									{' '}
									OK, Thanks{' '}
								</Button>
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
								defaultChecked
								label="Europe edition"
								value="EUR"
								onChange={() => setSelectedEdition('EUR')}
							/>
							<Radio
								label="UK edition"
								value="UK"
								onChange={() => setSelectedEdition('UK')}
							/>
							<Radio
								label="US edition"
								value="US"
								onChange={() => setSelectedEdition('US')}
							/>
							<Radio
								label="Australia edition"
								value="AU"
								onChange={() => setSelectedEdition('AU')}
							/>
							<Radio
								label="International edition"
								value="INT"
								onChange={() => setSelectedEdition('INT')}
							/>
						</RadioGroup>
						<Button onClick={() => confirmNewEdition()}>
							Confirm
						</Button>
						{/*todo - think about what to do here for function and cross*/}
						<Button
							cssOverrides={closeButtonStyles}
							onClick={() => confirmNewEdition()}
						>
							<SvgClose />
						</Button>
					</div>
				)}
			</div>
		</dialog>
	);
};
