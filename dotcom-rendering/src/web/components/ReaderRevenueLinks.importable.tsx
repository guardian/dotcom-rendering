import { css } from '@emotion/react';
import type { OphanABTestMeta, OphanComponentEvent } from '@guardian/libs';
import { getCookie } from '@guardian/libs';
import {
	brandAlt,
	brandText,
	from,
	headline,
	neutral,
	space,
	textSans,
	until,
} from '@guardian/source-foundations';
import { getHeader } from '@guardian/support-dotcom-components';
import type {
	HeaderPayload,
	ModuleData,
	ModuleDataResponse,
} from '@guardian/support-dotcom-components/dist/dotcom/src/types';
import { useEffect, useState } from 'react';
import ArrowRightIcon from '../../static/icons/arrow-right.svg';
import type { EditionId } from '../../types/edition';
import type { OphanRecordFunction } from '../browser/ophan/ophan';
import {
	getOphanRecordFunction,
	sendOphanComponentEvent,
	submitComponentEvent,
} from '../browser/ophan/ophan';
import { addTrackingCodesToUrl } from '../lib/acquisitions';
import {
	getLastOneOffContributionDate,
	getPurchaseInfo,
	MODULES_VERSION,
	shouldHideSupportMessaging,
} from '../lib/contributions';
import { getLocaleCode } from '../lib/getCountryCode';
import { setAutomat } from '../lib/setAutomat';
import { useIsInView } from '../lib/useIsInView';
import { useOnce } from '../lib/useOnce';

type Props = {
	editionId: EditionId;
	dataLinkNamePrefix: string;
	inHeader: boolean;
	remoteHeader: boolean;
	contributionsServiceUrl: string;
	urls: {
		subscribe: string;
		support: string;
		contribute: string;
	};
};

const headerStyles = css`
	padding-top: 39px;
	padding-left: 10px;
	max-width: 310px;

	${from.mobileMedium} {
		padding-top: 44px;
	}

	${from.mobileLandscape} {
		padding-left: ${space[5]}px;
	}

	${from.tablet} {
		padding-top: ${space[1]}px;
		padding-bottom: ${space[5]}px;
		padding-left: ${space[5]}px;
		max-width: 340px;
	}

	${from.desktop} {
		max-width: none;
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

const ReaderRevenueLinksRemote: React.FC<{
	editionId: EditionId;
	countryCode: string;
	pageViewId: string;
	contributionsServiceUrl: string;
	ophanRecord: OphanRecordFunction;
}> = ({
	editionId,
	countryCode,
	pageViewId,
	contributionsServiceUrl,
	ophanRecord,
}) => {
	const [supportHeaderResponse, setSupportHeaderResponse] =
		useState<ModuleData | null>(null);
	const [SupportHeader, setSupportHeader] = useState<React.FC | null>(null);

	useOnce((): void => {
		setAutomat();

		const isSignedIn = !!getCookie({ name: 'GU_U', shouldMemoize: true });
		const requestData: HeaderPayload = {
			tracking: {
				ophanPageId: pageViewId,
				platformId: 'GUARDIAN_WEB',
				referrerUrl: window.location.origin + window.location.pathname,
				clientName: 'dcr',
			},
			targeting: {
				showSupportMessaging: !shouldHideSupportMessaging(),
				edition: editionId,
				countryCode,
				modulesVersion: MODULES_VERSION,
				mvtId: Number(
					getCookie({ name: 'GU_mvt_id', shouldMemoize: true }),
				),
				lastOneOffContributionDate: getLastOneOffContributionDate(),
				purchaseInfo: getPurchaseInfo(),
				isSignedIn,
			},
		};
		getHeader(contributionsServiceUrl, requestData)
			.then((response: ModuleDataResponse) => {
				if (!response.data) {
					return null;
				}

				const { module } = response.data;
				setSupportHeaderResponse(module);

				return window
					.guardianPolyfilledImport(module.url)
					.then((headerModule: { [key: string]: JSX.Element }) => {
						setSupportHeader(
							() => headerModule[module.name] ?? null,
						);
					});
			})
			.catch((error) => {
				const msg = `Error importing RR header links: ${String(error)}`;

				console.log(msg);
				window.guardian.modules.sentry.reportError(
					new Error(msg),
					'rr-header-links',
				);
			});
	}, [countryCode]);

	if (SupportHeader && supportHeaderResponse) {
		return (
			<div css={headerStyles}>
				{}
				<SupportHeader
					// @ts-expect-error
					submitComponentEvent={(
						componentEvent: OphanComponentEvent,
					) => submitComponentEvent(componentEvent, ophanRecord)}
					{...supportHeaderResponse.props}
				/>
			</div>
		);
	}

	return null;
};

const ReaderRevenueLinksNative: React.FC<{
	editionId: EditionId;
	dataLinkNamePrefix: string;
	inHeader: boolean;
	urls: {
		subscribe: string;
		support: string;
		contribute: string;
	};
	ophanRecord: OphanRecordFunction;
	pageViewId: string;
}> = ({
	editionId,
	dataLinkNamePrefix,
	inHeader,
	urls,
	ophanRecord,
	pageViewId,
}) => {
	const hideSupportMessaging = shouldHideSupportMessaging();

	// Only the header component is in the AB test
	const testName = inHeader ? 'RRHeaderLinks' : 'RRFooterLinks';
	const campaignCode = `${testName}_control`;
	const tracking: OphanABTestMeta = {
		abTestName: testName,
		abTestVariant: 'control',
		componentType: inHeader ? 'ACQUISITIONS_HEADER' : 'ACQUISITIONS_FOOTER',
		campaignCode,
	};

	const [hasBeenSeen, setNode] = useIsInView({
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
					name: testName,
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
	const PrimaryButton =
		editionId === 'UK' ? SubscribeButton : ContributeButton;
	const SecondaryButton =
		editionId === 'UK' ? ContributeButton : SubscribeButton;

	return (
		<div ref={setNode} css={inHeader && headerStyles}>
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

export const ReaderRevenueLinks = ({
	editionId,
	dataLinkNamePrefix,
	inHeader,
	remoteHeader,
	urls,
	contributionsServiceUrl,
}: Props) => {
	const [countryCode, setCountryCode] = useState<string>();
	const pageViewId = window.guardian.config.ophan.pageViewId;
	const ophanRecord = getOphanRecordFunction();

	useEffect(() => {
		const callFetch = () => {
			getLocaleCode()
				.then((cc) => {
					setCountryCode(cc || '');
				})
				.catch((e) =>
					console.error(`countryCodePromise - error: ${String(e)}`),
				);
		};
		callFetch();
	}, []);

	if (countryCode) {
		if (inHeader && remoteHeader) {
			return (
				<ReaderRevenueLinksRemote
					editionId={editionId}
					countryCode={countryCode}
					pageViewId={pageViewId}
					contributionsServiceUrl={contributionsServiceUrl}
					ophanRecord={ophanRecord}
				/>
			);
		}
		return (
			<ReaderRevenueLinksNative
				editionId={editionId}
				dataLinkNamePrefix={dataLinkNamePrefix}
				inHeader={inHeader}
				urls={urls}
				ophanRecord={ophanRecord}
				pageViewId={pageViewId}
			/>
		);
	}

	return null;
};
