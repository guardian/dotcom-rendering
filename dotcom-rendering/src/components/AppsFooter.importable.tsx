import { css } from '@emotion/react';
import {
	between,
	from,
	remSpace,
	space,
	textSans15,
	until,
} from '@guardian/source/foundations';
import { ButtonLink } from '@guardian/source/react-components';
import { useEffect, useState } from 'react';
import { grid } from '../grid';
import { ArticleDesign } from '../lib/articleFormat';
import { getNavigationClient, getUserClient } from '../lib/bridgetApi';
import { palette } from '../palette';

const year = new Date().getFullYear();

const footerContainerStyles = (design?: ArticleDesign) => {
	if (design === ArticleDesign.Gallery) {
		return css`
			${textSans15}
			${grid.paddedContainer}
			background-color: ${palette('--apps-footer-background')};

			${until.tablet} {
				padding-top: ${space[1]}px;
			}

			${from.tablet} {
				border-left: 1px solid ${palette('--footer-border')};
				border-right: 1px solid ${palette('--footer-border')};
			}
		`;
	} else {
		return css`
			${textSans15}
			padding: ${remSpace[4]} ${remSpace[3]};
			background-color: ${palette('--apps-footer-background')};
		`;
	}
};

const galleryFooterStyles = css`
	${grid.column.centre}
	padding: ${remSpace[4]} 0;
	position: relative;

	${from.leftCol} {
		${grid.between('centre-column-start', 'right-column-end')}
	}
`;

const linkStyles = css`
	${textSans15};
	color: ${palette('--apps-footer-links-text')};

	:active,
	:hover {
		color: ${palette('--apps-footer-links-text-hover')};
	}
`;

type PrivacySettingsProps = {
	isCcpa: boolean;
	privacySettingsClickHandler: (
		e: React.MouseEvent<HTMLButtonElement>,
	) => void;
};
const PrivacySettings = ({
	isCcpa,
	privacySettingsClickHandler,
}: PrivacySettingsProps) => {
	if (isCcpa) {
		return (
			<>
				<ButtonLink
					priority="secondary"
					onClick={privacySettingsClickHandler}
					cssOverrides={linkStyles}
				>
					California Residents - Do Not Sell
				</ButtonLink>
				&nbsp;&#183;&nbsp;
			</>
		);
	} else {
		return (
			<>
				<ButtonLink
					priority="secondary"
					onClick={privacySettingsClickHandler}
					cssOverrides={linkStyles}
				>
					Privacy Settings
				</ButtonLink>
				&nbsp;&#183;&nbsp;
			</>
		);
	}
};

const galleryLeftCollumn = css`
	${grid.column.centre}
	${between.tablet.and.desktop} {
		padding-left: ${space[5]}px;
		padding-right: ${space[5]}px;
	}

	${between.desktop.and.leftCol} {
		${grid.column.right}

		position: relative; /* allows the ::before to be positioned relative to this */

		&::before {
			content: '';
			position: absolute;
			left: -10px; /* 10px to the left of this element */
			top: 0;
			bottom: 0;
			width: 1px;
			background-color: ${palette('--footer-border')};
		}
	}

	${from.leftCol} {
		${grid.column.left}

		position: relative; /* allows the ::before to be positioned relative to this */

		&::after {
			content: '';
			position: absolute;
			right: -10px;
			top: 0;
			bottom: 0;
			width: 1px;
			background-color: ${palette('--footer-border')};
		}
	}
`;

export const AppsFooter = ({ design }: { design?: ArticleDesign }) => {
	const [isCcpa, setIsCcpa] = useState<boolean>(false);

	useEffect(() => {
		void getUserClient()
			.doesCcpaApply()
			.then(setIsCcpa)
			.catch(() => undefined);
	}, []);

	const privacyPolicyClickHandler = (
		e: React.MouseEvent<HTMLButtonElement>,
	) => {
		e.preventDefault();
		void getNavigationClient()
			.openPrivacyPolicy()
			.catch(() => undefined);
	};
	const privacySettingsClickHandler = (
		e: React.MouseEvent<HTMLButtonElement>,
	) => {
		e.preventDefault();
		void getNavigationClient()
			.openPrivacySettings()
			.catch(() => undefined);
	};

	return (
		<div css={[footerContainerStyles(design)]}>
			{design === ArticleDesign.Gallery && (
				<div css={galleryLeftCollumn}></div>
			)}
			<div
				css={
					design === ArticleDesign.Gallery
						? galleryFooterStyles
						: undefined
				}
			>
				&#169; {year} Guardian News and Media Limited or its affiliated
				companies. All rights reserved. (dcar)
				<br />
				<PrivacySettings
					isCcpa={isCcpa}
					privacySettingsClickHandler={privacySettingsClickHandler}
				/>
				<ButtonLink
					priority="secondary"
					onClick={privacyPolicyClickHandler}
					cssOverrides={linkStyles}
				>
					Privacy Policy
				</ButtonLink>
			</div>
		</div>
	);
};
