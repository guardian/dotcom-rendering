import { useEffect, useState } from 'react';

import { css } from '@emotion/react';

import ArrowRightIcon from '@frontend/static/icons/arrow-right.svg';
import {
	brandText,
	brandAlt,
	neutral,
} from '@guardian/src-foundations/palette';
import { textSans, headline } from '@guardian/src-foundations/typography';
import { from, until } from '@guardian/src-foundations/mq';

import {
	MODULES_VERSION,
	shouldHideSupportMessaging,
} from '@root/src/web/lib/contributions';
import { setAutomat } from '@root/src/web/lib/setAutomat';
import { getCookie } from '@root/src/web/browser/cookie';
import { remoteRrHeaderLinksTestName } from '@root/src/web/experiments/tests/remoteRrHeaderLinksTest';
import type { TestMeta } from '@guardian/types';
import { useHasBeenSeen } from '@root/src/web/lib/useHasBeenSeen';
import { addTrackingCodesToUrl } from '@root/src/web/lib/acquisitions';
import {
	OphanRecordFunction,
	sendOphanComponentEvent,
} from '@root/src/web/browser/ophan/ophan';

type Props = {
	edition: Edition;
	countryCode?: string;
	dataLinkNamePrefix: string;
	inHeader: boolean;
	inRemoteModuleTest: boolean;
	contributionsServiceUrl: string;
	pageViewId: string;
	ophanRecord: OphanRecordFunction;
	urls: {
		subscribe: string;
		support: string;
		contribute: string;
	};
};

const headerStyles = css`
	${until.mobileLandscape} {
		padding-left: 10px;
	}
	${until.tablet} {
		padding-top: 33px;
	}
	${from.mobileLandscape} {
		padding-left: 20px;
	}
	${until.desktop} {
		max-width: 310px;
	}
`;

const messageStyles = (isThankYouMessage: boolean) => css`
	color: ${brandAlt[400]};
	${headline.xxsmall({ fontWeight: 'bold' })};
	padding-top: 3px;
	margin-bottom: 3px;

	${from.desktop} {
		${headline.xsmall({ fontWeight: 'bold' })}
	}

	${from.leftCol} {
		${isThankYouMessage
			? headline.small({ fontWeight: 'bold' })
			: headline.medium({ fontWeight: 'bold' })}
	}
`;

const linkStyles = css`
	background: ${brandAlt[400]};
	border-radius: 16px;
	box-sizing: border-box;
	color: ${neutral[7]};
	float: left;
	${textSans.small()};
	font-weight: 700;
	height: 32px;
	text-decoration: none;
	padding: 6px 12px 0 12px;
	line-height: 18px;
	position: relative;
	margin-right: 10px;
	margin-bottom: 6px;

	${from.mobileMedium} {
		padding-right: 34px;
	}

	svg {
		fill: currentColor;
		position: absolute;
		right: 3px;
		top: 50%;
		height: 32px;
		width: 32px;
		transform: translate(0, -50%);
		transition: transform 0.3s ease-in-out;

		${until.mobileMedium} {
			display: none;
		}
	}

	:hover svg {
		transform: translate(3px, -50%);
	}
`;

const hidden = css`
	display: none;
`;

const hiddenUntilTablet = css`
	${until.tablet} {
		display: none;
	}
`;

const hiddenFromTablet = css`
	${from.tablet} {
		display: none;
	}
`;

const subMessageStyles = css`
	color: ${brandText.primary};
	${textSans.medium()};
	margin: 5px 0;
`;

interface Cta {
	url: string;
	text: string;
}
interface SupportHeaderProps {
	content: {
		heading: string;
		subheading: string;
		primaryCta?: Cta;
		secondaryCta?: Cta;
	};
	tracking: TestMeta;
}
interface SupportHeaderData {
	module: {
		url: string;
		name: string;
		props: SupportHeaderProps;
	};
	meta: TestMeta;
}

const ReaderRevenueLinksRemote: React.FC<{
	edition: Edition;
	countryCode?: string;
	pageViewId: string;
	contributionsServiceUrl: string;
	ophanRecord: OphanRecordFunction;
}> = ({
	edition,
	countryCode,
	pageViewId,
	contributionsServiceUrl,
	ophanRecord,
}) => {
	const [
		supportHeaderResponse,
		setSupportHeaderResponse,
	] = useState<SupportHeaderData | null>(null);
	const [
		SupportHeader,
		setSupportHeader,
	] = useState<React.FC<SupportHeaderProps> | null>(null);

	const [hasBeenSeen, setNode] = useHasBeenSeen({
		threshold: 0,
		debounce: true,
	});

	useEffect(() => {
		if (hasBeenSeen && supportHeaderResponse) {
			sendOphanComponentEvent(
				'VIEW',
				supportHeaderResponse.meta,
				ophanRecord,
			);
		}
	}, [hasBeenSeen, supportHeaderResponse, ophanRecord]);

	useEffect((): void => {
		setAutomat();

		const requestData = {
			tracking: {
				ophanPageId: pageViewId,
				platformId: 'GUARDIAN_WEB',
				referrerUrl: window.location.origin + window.location.pathname,
				clientName: 'dcr',
			},
			targeting: {
				showSupportMessaging: !shouldHideSupportMessaging(),
				edition,
				countryCode,
				modulesVersion: MODULES_VERSION,
				mvtId: Number(getCookie('GU_mvt_id')),
			},
		};
		fetch(`${contributionsServiceUrl}/header`, {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(requestData),
		})
			.then((result) => result.json())
			.then((response: { data?: SupportHeaderData }) => {
				if (!response.data) {
					return null;
				}

				setSupportHeaderResponse(response.data);
				const { module, meta } = response.data;
				return window
					.guardianPolyfilledImport(module.url)
					.then(
						(headerModule: {
							Header: React.FC<SupportHeaderProps>;
						}) => {
							setSupportHeader(() => headerModule.Header);
							sendOphanComponentEvent(
								'INSERT',
								meta,
								ophanRecord,
							);
						},
					);
			})
			.catch((error) => {
				const msg = `Error importing RR header links: ${error}`;
				// eslint-disable-next-line no-console
				console.log(msg);
				window.guardian.modules.sentry.reportError(
					new Error(msg),
					'rr-header-links',
				);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (SupportHeader && supportHeaderResponse) {
		return (
			<div ref={setNode} css={headerStyles}>
				{/* eslint-disable react/jsx-props-no-spreading */}
				<SupportHeader {...supportHeaderResponse.module.props} />
				{/* eslint-enable react/jsx-props-no-spreading */}
			</div>
		);
	}

	return null;
};

export const ReaderRevenueLinksNative: React.FC<Props> = ({
	edition,
	dataLinkNamePrefix,
	inHeader,
	urls,
	ophanRecord,
	pageViewId,
}) => {
	const hideSupportMessaging = shouldHideSupportMessaging();

	// Only the header component is in the AB test
	const testName = inHeader ? remoteRrHeaderLinksTestName : 'RRFooterLinks';
	const campaignCode = `${testName}_control`;
	const tracking: TestMeta = {
		abTestName: testName,
		abTestVariant: 'control',
		componentType: inHeader ? 'ACQUISITIONS_HEADER' : 'ACQUISITIONS_FOOTER',
		campaignCode,
	};

	const [hasBeenSeen, setNode] = useHasBeenSeen({
		threshold: 0,
		debounce: true,
	});

	useEffect(() => {
		if (!hideSupportMessaging && inHeader) {
			sendOphanComponentEvent('INSERT', tracking, ophanRecord);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (hasBeenSeen && inHeader) {
			sendOphanComponentEvent('VIEW', tracking, ophanRecord);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hasBeenSeen]);

	const getUrl = (rrType: 'contribute' | 'subscribe'): string => {
		if (inHeader) {
			return addTrackingCodesToUrl({
				base: `https://support.theguardian.com/${rrType}`,
				componentType: 'ACQUISITIONS_HEADER',
				componentId: campaignCode,
				campaignCode,
				abTest: {
					name: remoteRrHeaderLinksTestName,
					variant: 'control',
				},
				pageViewId,
				referrerUrl: window.location.origin + window.location.pathname,
			});
		}
		return urls[rrType];
	};

	if (hideSupportMessaging) {
		return (
			<div css={inHeader && headerStyles}>
				<div css={inHeader && hiddenUntilTablet}>
					<div css={messageStyles(true)}> Thank you </div>
					<div css={subMessageStyles}>
						Your support powers our independent journalism
					</div>
				</div>
			</div>
		);
	}

	const ContributeButton = () => (
		<a
			css={linkStyles}
			href={getUrl('contribute')}
			data-link-name={`${dataLinkNamePrefix}contribute-cta`}
		>
			Contribute <ArrowRightIcon />
		</a>
	);
	const SubscribeButton = () => (
		<a
			css={linkStyles}
			href={getUrl('subscribe')}
			data-link-name={`${dataLinkNamePrefix}subscribe-cta`}
		>
			Subscribe <ArrowRightIcon />
		</a>
	);
	const PrimaryButton = edition === 'UK' ? SubscribeButton : ContributeButton;
	const SecondaryButton =
		edition === 'UK' ? ContributeButton : SubscribeButton;

	return (
		<div ref={setNode} css={cx(inHeader && headerStyles)}>
			<div css={inHeader && hiddenUntilTablet}>
				<div css={messageStyles(false)}>
					<span>Support the&nbsp;Guardian</span>
				</div>
				<div css={subMessageStyles}>
					<div>Available for everyone, funded by readers</div>
				</div>
				<PrimaryButton />
				<SecondaryButton />
			</div>

			<div css={inHeader ? hiddenFromTablet : hidden}>
				<PrimaryButton />
			</div>
		</div>
	);
};

export const ReaderRevenueLinks: React.FC<Props> = ({
	edition,
	countryCode,
	dataLinkNamePrefix,
	inHeader,
	inRemoteModuleTest,
	urls,
	contributionsServiceUrl,
	ophanRecord,
	pageViewId = '',
}: Props) => {
	if (inHeader && inRemoteModuleTest) {
		return (
			<ReaderRevenueLinksRemote
				edition={edition}
				countryCode={countryCode}
				pageViewId={pageViewId}
				contributionsServiceUrl={contributionsServiceUrl}
				ophanRecord={ophanRecord}
			/>
		);
	}
	return (
		<ReaderRevenueLinksNative
			edition={edition}
			countryCode={countryCode}
			dataLinkNamePrefix={dataLinkNamePrefix}
			inHeader={inHeader}
			inRemoteModuleTest={inRemoteModuleTest}
			urls={urls}
			contributionsServiceUrl={contributionsServiceUrl}
			ophanRecord={ophanRecord}
			pageViewId={pageViewId}
		/>
	);
};
