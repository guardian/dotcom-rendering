/**
 * This is a hard coded support ask as a test to see if it works.
 * If it does, it may become a more standard feature.
 */

import { css, ThemeProvider } from '@emotion/react';
import { palette, space, textSans14 } from '@guardian/source/foundations';
import {
	LinkButton,
	SvgArrowRightStraight,
} from '@guardian/source/react-components';
import type { Tracking } from '@guardian/support-dotcom-components/dist/shared/src/types/props/shared';
import { useEffect, useMemo, useState } from 'react';
import { submitComponentEvent } from '../client/ophan/ophan';
import { shouldHideSupportMessaging } from '../lib/contributions';
import { useAB } from '../lib/useAB';
import { useAuthStatus } from '../lib/useAuthStatus';
import { useCountryCode } from '../lib/useCountryCode';
import { useIsInView } from '../lib/useIsInView';
import { usePageViewId } from '../lib/usePageViewId';
import { useConfig } from './ConfigContext';
import type { ReactComponent } from './marketing/lib/ReactComponent';
import {
	addRegionIdAndTrackingParamsToSupportUrl,
	createClickEventFromTracking,
	createViewEventFromTracking,
} from './marketing/lib/tracking';

const baseUrl = 'https://support.theguardian.com/contribute';

// CSS Styling
// -------------------------------------------

// outer container
const stickyLeft = css`
	background: ${palette.neutral[100]};
	position: sticky;
	top: 0;
	width: 220px;
	margin-left: ${space[5]}px;

	box-sizing: border-box;

	/* Auto layout */
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 0px;
	gap: ${space[1]}px;
`;
const imageHeader = css`
	background-color: ${palette.brand[400]};
	text-align: center;
	padding: 15px 0;
	width: 220px;
	height: 132px;
`;
// contains the text and cta
const textBlock = css`
	/* Auto layout */
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: ${space[1]}px;
	gap: ${space[1]}px;
`;
const bodySection = css`
	color: ${palette.neutral[0]};
	${textSans14}
`;
const ctaSection = css`
	color: ${palette.neutral[0]};
	margin-top: ${space[3]}px;
	margin-bottom: ${space[4]}px;
`;
const cta = css`
	left: ${space[2]}px;
	min-width: 100%;
	width: 100%;
	min-height: 30px;
	height: 30px;
`;
const buttonStyles = {
	textPrimary: palette.neutral[7],
	backgroundPrimary: palette.brandAlt[400],
	backgroundPrimaryHover: palette.brandAlt[300],
};

const contributionsTheme = {
	button: buttonStyles,
	link: buttonStyles,
};

interface StickyLiveblogAskProps {
	referrerUrl: string;
	shouldHideReaderRevenueOnArticle: boolean;
}

const whatAmI = 'sticky-liveblog-ask';

export const StickyLiveblogAsk: ReactComponent<StickyLiveblogAskProps> = ({
	referrerUrl,
	shouldHideReaderRevenueOnArticle,
}) => {
	const { renderingTarget } = useConfig();
	const countryCode = useCountryCode(whatAmI);
	const pageViewId = usePageViewId(renderingTarget);

	const ABTestAPI = useAB()?.api;

	// We can check if a user is in a variant, returns a boolean
	// ABTestTest being an ab test that was passed in via the ab test array
	const userInVariant = ABTestAPI?.isUserInVariant(
		'StickyLiveBlogAskTest',
		'variant',
	);

	// should we show ourselves?
	const [showSupportMessagingForUser, setShowSupportMessaging] =
		useState<boolean>(false);
	const authStatus = useAuthStatus();

	useEffect(() => {
		const isSignedIn =
			authStatus.kind === 'SignedInWithOkta' ||
			authStatus.kind === 'SignedInWithCookies';
		setShowSupportMessaging(!shouldHideSupportMessaging(isSignedIn));
	}, [authStatus]);

	// tracking
	const tracking: Tracking = useMemo(() => {
		return {
			ophanPageId: pageViewId ?? '',
			platformId: 'GUARDIAN_WEB',
			clientName: 'dcr',
			referrerUrl,
			// message tests
			abTestName: whatAmI,
			abTestVariant: 'control',
			campaignCode: whatAmI,
			componentType: 'ACQUISITIONS_OTHER',
		};
	}, [pageViewId, referrerUrl]);

	const urlWithRegionAndTracking = addRegionIdAndTrackingParamsToSupportUrl(
		baseUrl,
		tracking,
		undefined,
		countryCode,
	);

	// ophan tracking
	const [hasBeenSeen, setNode] = useIsInView({
		debounce: true,
	});

	useEffect(() => {
		if (hasBeenSeen) {
			// For ophan
			void submitComponentEvent(
				createViewEventFromTracking(tracking, tracking.campaignCode),
				renderingTarget,
			);
		}
	}, [hasBeenSeen, tracking, renderingTarget]);

	const onButtonCtaClick = () => {
		void submitComponentEvent(
			createClickEventFromTracking(tracking, tracking.campaignCode),
			renderingTarget,
		);
	};
	const canShow =
		userInVariant &&
		showSupportMessagingForUser &&
		!shouldHideReaderRevenueOnArticle;

	return (
		<>
			{canShow && (
				<div css={stickyLeft} ref={setNode}>
					<div css={imageHeader}>
						<svg
							width="150"
							height="100"
							viewBox="0 0 150 100"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							aria-labelledby="rr__notForSaleBrandIcon"
							role="img"
						>
							<title id="rr__notForSaleBrandIcon">
								Not for sale
							</title>
							<path
								d="M5.03418 17.0585H5.02936C5.02936 12.8273 5.0284 8.59607 5.03321 4.36486C5.03321 4.20071 4.94651 3.94966 5.14688 3.89269C5.37712 3.82799 5.43396 4.09063 5.52933 4.24996C6.07746 5.17306 6.62559 6.09713 7.17661 7.01927C8.92023 9.9421 10.6696 12.862 12.4084 15.7878C14.1386 18.699 15.8543 21.619 17.5834 24.5302C19.1989 27.2493 20.8356 29.9559 22.4328 32.6856C22.6997 33.1413 23.0031 33.3074 23.5088 33.2968C24.7284 33.2717 25.949 33.2862 27.1685 33.2891C28.0827 33.291 28.0827 33.2949 28.0827 32.3988C28.0827 23.2286 28.0808 14.0574 28.0808 4.88725C28.0808 4.45273 28.0952 4.01822 28.0769 3.58467C28.0635 3.26023 28.1781 3.03718 28.4575 2.8682C28.9516 2.56983 29.4343 2.25312 29.9207 1.9422C30.4467 1.60521 30.9727 1.26822 31.4958 0.927366C31.7511 0.761285 31.7684 0.512163 31.7096 0.243729C31.6518 -0.0218079 31.4389 0.0081254 31.2501 0.0081254C28.5538 0.00715981 25.8565 0.0081254 23.1601 0.0110222C22.9607 0.0110222 22.7208 -0.0391884 22.6602 0.256282C22.6043 0.528578 22.6284 0.769009 22.9116 0.913848C22.9964 0.957299 23.0725 1.02006 23.1572 1.06448C24.2959 1.65639 25.4278 2.26374 26.5799 2.82958C27.024 3.0478 27.1965 3.3143 27.1945 3.82799C27.1743 9.45931 27.182 15.0897 27.182 20.721C27.182 21.0753 27.1878 21.4287 27.182 21.7831C27.1801 21.9077 27.1888 22.0602 27.0356 22.1085C26.868 22.1616 26.8217 22.011 26.7581 21.9038C26.4865 21.449 26.2139 20.9962 25.9441 20.5394C24.003 17.2487 22.0658 13.9561 20.1208 10.6682C18.1027 7.2568 16.072 3.85213 14.0596 0.436847C13.8698 0.116271 13.6511 -0.000564898 13.286 0.00136628C10.8941 0.0139189 8.50215 0.0081254 6.11117 0.0081254C4.23269 0.0081254 2.35517 0.00715981 0.476679 0.0081254C0.266674 0.00715981 0.0422186 -0.00732401 0.0104288 0.292008C-0.0165444 0.544993 -0.0117277 0.779631 0.284013 0.883914C0.435256 0.937022 0.579755 1.01041 0.730034 1.06351C1.60666 1.37443 2.4804 1.69308 3.36184 1.98758C3.83676 2.14594 4.06989 2.37478 4.06892 2.94738C4.04966 11.6512 4.05929 20.355 4.06218 29.0588C4.06218 29.3002 4.05929 29.5416 4.06218 29.783C4.06507 30.0321 3.96199 30.1973 3.7385 30.3247C2.6249 30.9572 1.52767 31.6215 0.403466 32.2337C0.0479985 32.4268 -0.0444808 32.6759 0.0239154 33.0177C0.0980915 33.3876 0.420806 33.2813 0.655857 33.2823C3.38496 33.29 6.1131 33.29 8.84221 33.2852C9.06666 33.2852 9.35951 33.3673 9.43465 33.0284C9.50979 32.6875 9.37974 32.4635 9.05414 32.2935C7.88851 31.6862 6.75371 31.018 5.5746 30.4406C5.10835 30.2127 5.02454 29.9192 5.02647 29.4624C5.03899 25.3278 5.03321 21.1931 5.03321 17.0585H5.03418Z"
								fill="white"
							/>
							<path
								d="M55.5577 12.6194C53.8468 9.18669 51.1129 7.05854 47.3637 6.31214C44.5999 5.76175 41.864 5.98963 39.2072 6.94267C35.1352 8.40264 32.5034 11.2183 31.5786 15.4688C30.7761 19.1574 31.2694 22.7436 32.9677 26.1154C34.8491 29.8493 37.9298 31.9533 42.048 32.5201C44.6779 32.8813 47.2278 32.5153 49.693 31.5391C51.9818 30.6334 53.8285 29.1696 55.1733 27.0993C56.6029 24.9007 57.1617 22.4539 57.1453 19.8545C57.1308 17.3295 56.6925 14.8972 55.5577 12.6194ZM48.1122 29.5326C47.6305 31.291 45.9688 32.1793 44.2945 31.485C43.5152 31.1616 43.0692 30.477 42.6886 29.7615C41.9488 28.372 41.5606 26.8589 41.2629 25.3313C40.4364 21.0808 39.8603 16.7994 39.8883 12.4562C39.896 11.2308 39.9817 10.0161 40.4162 8.8497C41.2042 6.73506 43.6992 6.25999 45.1788 7.94978C45.674 8.51368 45.9832 9.18476 46.2356 9.87999C47.0804 12.2051 47.461 14.6326 47.7991 17.0707C48.1873 19.8593 48.5158 22.6509 48.538 25.4704C48.5428 26.8406 48.4792 28.1962 48.1122 29.5326Z"
								fill="white"
							/>
							<path
								d="M98.7599 97.1161C98.732 96.8177 98.5258 96.7839 98.2937 96.7308C97.8563 96.6314 97.4325 96.4518 96.9913 96.3938C96.4605 96.3243 96.3121 96.0684 96.315 95.5586C96.3333 92.7758 96.3237 89.9929 96.3237 87.2101H96.2611C96.2611 84.8618 96.263 82.5125 96.2601 80.1642C96.2591 79.0345 96.183 77.9163 95.7919 76.8387C95.4095 75.7862 94.8045 74.9027 93.9154 74.2143C92.5224 73.1367 90.8944 72.6703 89.1941 72.4414C84.889 71.8621 80.6821 72.3594 76.5581 73.6841C76.2325 73.7894 76.1035 73.9613 76.1006 74.3079C76.0823 76.5925 76.0457 78.8761 76.0187 81.1607C76.0168 81.3277 75.9474 81.5508 76.1747 81.6165C76.4031 81.6821 76.6554 81.714 76.8558 81.5209C76.9473 81.432 77.0263 81.3277 77.1015 81.2244C78.8451 78.823 80.6118 76.437 82.3159 74.0076C82.8227 73.2854 83.3987 72.9657 84.2493 73.1115C84.3601 73.1309 84.4748 73.1241 84.5846 73.1434C85.5575 73.3124 86.3889 73.717 86.8927 74.615C87.2752 75.2947 87.4861 76.0431 87.5853 76.8078C87.8445 78.8076 87.7799 80.8208 87.7992 82.8302C87.8021 83.1315 87.6547 83.257 87.3773 83.3101C86.1009 83.5544 84.8264 83.8064 83.5519 84.0594C81.5385 84.4601 79.5156 84.8338 77.7064 85.8931C76.3636 86.68 75.3434 87.7431 74.8039 89.2321C74.2837 90.6669 74.2529 92.1452 74.5313 93.612C74.9369 95.7517 76.0938 97.3894 78.139 98.2323C80.8748 99.3592 85.3138 98.9681 87.5584 96.0771C87.8898 95.6494 87.9736 95.6735 88.2279 96.1389C88.856 97.2889 89.8048 98.0102 91.0678 98.3395C92.8634 98.8068 94.6542 98.7499 96.4528 98.354C97.1309 98.2043 97.7793 97.9803 98.4035 97.6829C98.6376 97.5709 98.7869 97.4048 98.7599 97.1161ZM87.1451 95.1588C85.5392 95.8589 83.4536 95.4186 82.919 93.329C82.3612 91.1526 82.3265 88.9713 82.997 86.8219C83.391 85.5619 84.3303 84.8676 85.6394 84.6668C86.1471 84.5895 86.6519 84.5094 87.1653 84.4765C87.7616 84.4369 87.8079 84.4707 87.8088 85.0588C87.8117 86.569 87.8098 88.0801 87.8098 89.5913H87.8368C87.8368 91.086 87.8127 92.5807 87.8493 94.0755C87.8637 94.6432 87.5921 94.9638 87.1451 95.1588Z"
								fill="white"
							/>
							<path
								d="M47.0275 35.2257C45.7646 35.3107 44.3716 35.3735 42.9883 35.5936C41.2042 35.8785 39.4798 36.3091 37.898 37.238C35.3308 38.7453 34.064 40.9806 34.0476 43.945C34.0409 45.1723 34.2403 46.3802 34.4455 47.5853C34.5091 47.9599 34.4195 48.1868 34.064 48.352C33.4099 48.6551 32.7799 49.0105 32.1258 49.3146C31.7828 49.4749 31.8888 49.7192 31.936 49.9664C31.9871 50.2339 32.1826 50.2175 32.384 50.1904C33.0198 50.1055 33.6584 50.0388 34.2904 49.9336C34.6208 49.8785 34.7778 49.9906 34.8202 50.3082C34.8674 50.6587 34.9156 51.0083 34.9657 51.3588C35.3414 54.0006 35.719 56.6415 36.0918 59.2834C36.4068 61.512 36.718 63.7405 37.0291 65.9691C37.269 67.6888 37.4992 69.4095 37.7516 71.1283C37.8152 71.5628 37.6495 71.7713 37.2516 71.9171C36.7103 72.1151 36.1997 72.3941 35.6612 72.6017C35.3443 72.7234 35.3057 72.9233 35.3626 73.2072C35.4271 73.5306 35.6631 73.4853 35.8876 73.4688C36.0475 73.4563 36.2074 73.4447 36.3663 73.4215C40.6214 72.8055 44.8754 72.1885 49.1304 71.5724C49.3529 71.5406 49.6053 71.5522 49.5803 71.2123C49.5581 70.9071 49.4589 70.7169 49.0909 70.7005C48.3386 70.6667 47.5891 70.5576 46.8358 70.5267C46.3792 70.5084 46.1499 70.3751 46.0902 69.8749C45.9303 68.5511 45.7058 67.235 45.5199 65.9141C45.0594 62.6514 44.6115 59.3867 44.1491 56.124C43.8263 53.8481 43.4882 51.5741 43.1559 49.2992C43.1058 48.9593 43.074 48.6522 43.5518 48.5933C44.5065 48.4746 45.4611 48.3452 46.4119 48.1975C47.8916 47.9676 47.723 48.3211 47.513 46.7616C47.4619 46.3783 47.2924 46.2885 46.9302 46.3455C45.7742 46.528 44.6134 46.6873 43.4545 46.8524C42.9083 46.9296 42.8033 46.8379 42.733 46.303C42.5172 44.6615 42.2869 43.0219 42.075 41.3804C41.9402 40.3414 41.8573 39.2967 42.0702 38.2587C42.1665 37.7884 42.2638 37.2853 42.6521 36.9628C43.4593 36.2918 43.8157 36.2058 44.4429 36.9783C45.9399 38.8216 47.4966 40.6157 49.0177 42.4387C49.2557 42.7245 49.5389 42.7554 49.8385 42.6559C50.1679 42.5468 50.0311 42.2417 49.9984 42.0293C49.6593 39.8857 49.3019 37.745 48.958 35.6014C48.9175 35.3484 48.801 35.2277 48.5524 35.2267C48.0871 35.2257 47.6219 35.2267 47.0265 35.2267L47.0275 35.2257Z"
								fill="white"
							/>
							<path
								d="M137.262 80.1951C136.823 78.7197 136.15 77.3544 135.047 76.2459C133.725 74.9172 132.112 74.1428 130.285 73.8C127.161 73.2139 124.098 73.3095 121.134 74.6005C118.558 75.7216 116.666 77.5716 115.601 80.1498C113.77 84.5837 113.869 89.0689 115.695 93.4797C116.677 95.8512 118.411 97.596 120.753 98.6717C123.984 100.156 127.351 100.311 130.78 99.5581C132.807 99.113 134.61 98.2024 136.131 96.7666C136.494 96.4248 136.831 96.0578 137.075 95.6195C137.186 95.4157 137.239 95.155 137.107 94.9764C136.945 94.7591 136.732 94.9667 136.547 95.0324C135.851 95.2805 135.143 95.4939 134.413 95.5992C132.882 95.8184 131.349 95.886 129.806 95.6996C126.782 95.3346 124.716 93.7713 123.684 90.8678C123.179 89.4445 122.965 87.972 122.861 86.4753C122.816 85.8487 122.839 85.8062 123.457 85.8052C125.753 85.8023 128.048 85.8043 130.343 85.8043V85.7782C132.638 85.7782 134.933 85.7791 137.229 85.7782C137.836 85.7782 137.86 85.7502 137.863 85.1602C137.871 83.4801 137.742 81.8115 137.262 80.1961V80.1951ZM129.364 84.5635C128.337 84.5809 127.316 84.7112 126.388 84.6842C125.294 84.7382 124.3 84.7798 123.308 84.8387C122.98 84.8589 122.776 84.7952 122.79 84.4099C122.881 81.9516 122.909 79.4864 123.724 77.1226C123.977 76.3888 124.31 75.6955 124.858 75.1287C126.126 73.8136 128.118 74.1844 128.854 75.8548C129.434 77.1729 129.61 78.5739 129.752 79.9818C129.886 81.3104 129.894 82.6458 129.92 83.9803C129.928 84.3945 129.775 84.5567 129.364 84.5635Z"
								fill="white"
							/>
							<path
								d="M100.501 99.2345C104.735 98.9545 108.945 98.6764 113.156 98.3993C113.381 98.3848 113.574 98.3384 113.571 98.0488C113.569 97.7832 113.505 97.5737 113.203 97.5129C112.622 97.3941 112.046 97.2425 111.461 97.1537C111.06 97.0928 110.873 96.9239 110.848 96.5087C110.759 95.0805 110.639 93.6534 110.545 92.2253C110.304 88.5339 110.072 84.8424 109.832 81.151C109.577 77.2355 109.317 73.32 109.059 69.4046C108.914 67.2059 108.762 65.0073 108.633 62.8086C108.611 62.4253 108.458 62.2785 108.089 62.237C107.558 62.1781 107.074 62.3567 106.575 62.462C103.717 63.0626 100.862 63.668 98.0058 64.2715C97.7563 64.3246 97.4856 64.3362 97.4846 64.7079C97.4827 65.0865 97.6744 65.2284 98.0222 65.3182C98.657 65.4824 99.2726 65.7247 99.9064 65.8937C100.305 65.9999 100.43 66.2297 100.453 66.6188C100.534 68.0643 100.642 69.5069 100.737 70.9514C101.188 77.8844 101.636 84.8183 102.085 91.7512C102.201 93.5327 102.315 95.3142 102.44 97.0948C102.462 97.4115 102.383 97.6056 102.058 97.7089C101.494 97.8894 100.945 98.1202 100.38 98.3018C100.06 98.4051 99.892 98.5509 99.9421 98.9217C99.9979 99.3301 100.287 99.2133 100.501 99.2335V99.2345Z"
								fill="white"
							/>
							<path
								d="M70.1589 77.0744C70.1242 77.0744 70.0895 77.0744 70.0548 77.0744C70.0115 76.0779 69.9508 75.0824 69.9315 74.0849C69.9238 73.7006 69.7659 73.5664 69.4104 73.4824C67.9355 73.1367 66.4376 72.9581 64.9309 72.876C62.7153 72.7563 60.5006 72.7186 58.3456 73.4042C56.9632 73.8445 55.7177 74.5108 54.7303 75.5999C53.2641 77.2163 52.7545 79.1552 52.8055 81.295C52.8489 83.1228 53.4423 84.718 54.657 86.0872C55.7861 87.3598 57.2012 88.2318 58.678 89.0178C60.2212 89.8395 61.8714 90.4439 63.3886 91.3197C65.2257 92.3799 66.0089 93.473 65.3875 96.0743C65.1746 96.9674 64.6072 97.6183 63.7884 98.0228C62.8366 98.4921 61.8252 98.5655 60.7848 98.4255C60.4004 98.3743 60.0931 98.2324 59.8368 97.9272C58.9082 96.8226 57.9651 95.7296 57.0249 94.6346C55.9373 93.3687 54.843 92.1086 53.7602 90.8389C53.5367 90.5772 53.2583 90.5424 52.977 90.6216C52.6793 90.7056 52.7863 90.9963 52.794 91.2029C52.873 93.3079 52.9712 95.4129 53.0406 97.5188C53.0541 97.9398 53.2053 98.1435 53.6118 98.272C55.104 98.7412 56.628 99.0483 58.1818 99.1835C60.9572 99.4249 63.7268 99.5195 66.4366 98.6621C67.7448 98.2478 68.9412 97.6163 69.8786 96.6198C72.1144 94.2455 72.3717 91.3912 71.6434 88.3805C71.2031 86.5584 69.9816 85.2635 68.4769 84.2178C66.4337 82.7974 64.0967 81.9516 61.9003 80.8296C60.7135 80.2232 59.6066 79.5424 59.2781 78.0825C58.9255 76.5144 59.4612 74.8072 60.62 74.1409C61.7452 73.493 62.9474 73.5133 64.166 73.8319C64.3317 73.8754 64.4377 73.9806 64.5369 74.1168C65.0215 74.7773 65.5118 75.4319 66.0041 76.0866C67.0541 77.4857 68.1089 78.881 69.1541 80.2821C69.3526 80.5486 69.6021 80.648 69.9094 80.566C70.2687 80.4704 70.1521 80.1585 70.1541 79.92C70.1627 78.9718 70.157 78.0236 70.157 77.0754L70.1589 77.0744Z"
								fill="white"
							/>
							<path
								d="M59.749 27.7357C59.7568 28.4821 59.8242 29.2188 59.9571 29.9478C60.4012 32.384 61.8722 33.8836 64.2102 34.5488C66.475 35.1929 68.7176 35.1195 70.8986 34.1848C71.7993 33.7996 72.6567 33.3332 73.3975 32.6688C73.6248 32.4651 73.673 32.2343 73.6113 31.9775C73.541 31.683 73.277 31.7853 73.0863 31.7921C72.0372 31.8297 70.9997 31.7728 69.9854 31.4821C69.3813 31.3093 68.8804 30.9897 68.5404 30.4403C68.0693 29.6813 68.0924 28.8393 68.1618 28.007C68.6107 22.6055 69.075 17.204 69.5345 11.8034C69.5942 11.0995 69.6366 11.0735 70.3235 11.1401C71.5373 11.2569 72.7511 11.3815 73.9668 11.4722C75.248 11.5678 75.2393 11.5514 75.2779 10.2508C75.2875 9.92054 75.1844 9.79405 74.8569 9.76798C73.3695 9.64921 71.8831 9.50727 70.3957 9.38174C69.81 9.33249 69.7667 9.28518 69.8168 8.71645C69.967 7.03439 70.1135 5.35234 70.256 3.66932C70.3061 3.07741 70.2888 3.0552 69.705 3.09382C67.2225 3.25604 64.741 3.42985 62.2585 3.59014C61.9319 3.61138 61.826 3.75815 61.8009 4.071C61.6921 5.418 61.5514 6.7621 61.4474 8.10909C61.4204 8.4596 61.2933 8.61892 60.9407 8.67203C60.0043 8.81301 59.0747 8.99164 58.1403 9.14517C57.8108 9.19924 57.7482 9.40684 57.7405 9.69749C57.7318 10.02 57.9255 10.0596 58.1702 10.0789C58.9697 10.1436 59.7702 10.2121 60.5688 10.2836C61.2326 10.3425 61.2624 10.3724 61.2056 11.0551C60.9705 13.8437 60.7336 16.6323 60.4898 19.421C60.2481 22.1922 59.9976 24.9634 59.75 27.7347L59.749 27.7357Z"
								fill="white"
							/>
							<path
								d="M96.1427 44.7686C96.1957 44.7686 96.2486 44.7686 96.3016 44.7686C96.3507 43.7084 96.3902 42.6472 96.4557 41.5879C96.4789 41.2056 96.3315 41.053 95.9635 40.9709C94.0503 40.5432 92.0148 41.4238 90.7952 43.187C89.8704 44.5243 89.2578 45.9959 88.779 47.536C88.7279 47.7001 88.6933 47.9724 88.515 47.9463C88.28 47.9116 88.4139 47.6509 88.4226 47.4954C88.515 45.7448 88.6239 43.9952 88.7183 42.2445C88.8012 40.6967 88.7944 40.687 87.2521 40.8203C84.2157 41.0829 81.1803 41.3581 78.1439 41.6246C77.9175 41.6449 77.7268 41.6816 77.6979 41.9558C77.6699 42.2252 77.6795 42.4676 77.9782 42.6018C78.5918 42.8789 79.19 43.1966 79.8152 43.4438C80.2275 43.607 80.3595 43.8426 80.3345 44.2819C79.9588 50.8808 79.5956 57.4796 79.2392 64.0794C79.2189 64.456 79.0706 64.6192 78.7084 64.6781C78.1236 64.7737 77.5437 64.9069 76.9628 65.0266C76.6825 65.0846 76.5024 65.2159 76.5197 65.5481C76.5399 65.9227 76.7991 65.9295 77.0601 65.944C78.9829 66.0511 80.9048 66.1535 82.8276 66.2626C85.3582 66.4055 87.8889 66.5561 90.4205 66.6961C90.8579 66.7203 91.063 66.447 90.9214 66.0724C90.8405 65.858 90.644 65.8233 90.4571 65.7759C89.7115 65.5867 88.9678 65.3907 88.2183 65.2169C87.8137 65.1232 87.6114 64.932 87.6548 64.483C87.7039 63.9713 87.6885 63.4547 87.7174 62.941C87.9602 58.5736 88.2087 54.2072 88.4515 49.8399C88.5006 48.9467 88.4861 48.9139 89.3599 48.7236C91.3597 48.2882 93.377 48.3558 95.3932 48.5904C96.0878 48.6715 96.1215 48.6734 96.135 47.9473C96.1552 46.8871 96.1407 45.8269 96.1407 44.7657L96.1427 44.7686Z"
								fill="white"
							/>
							<path
								d="M144.55 99.8872C147.246 99.8727 149.256 97.816 149.246 95.0805C149.237 92.5188 147.173 90.5538 144.497 90.5596C141.803 90.5654 139.826 92.5429 139.848 95.2079C139.87 97.899 141.883 99.9017 144.551 99.8881L144.55 99.8872Z"
								fill="white"
							/>
							<path
								d="M5.03429 17.0581C5.03429 21.1928 5.0391 25.3274 5.02754 29.4621C5.02658 29.9188 5.11039 30.2123 5.57568 30.4402C6.75479 31.0176 7.89055 31.6849 9.05521 32.2932C9.38081 32.4631 9.51086 32.6871 9.43572 33.028C9.36058 33.3669 9.0687 33.2848 8.84328 33.2848C6.11418 33.2897 3.38604 33.2897 0.656932 33.2819C0.421881 33.2819 0.0991663 33.3882 0.0249902 33.0174C-0.0443693 32.6755 0.0490733 32.4264 0.404541 32.2333C1.52874 31.6211 2.62597 30.9568 3.73958 30.3243C3.96307 30.1969 4.06614 30.0318 4.06325 29.7826C4.06036 29.5412 4.06325 29.2999 4.06325 29.0585C4.06036 20.3546 4.05169 11.6508 4.07 2.947C4.07096 2.37537 3.83784 2.14556 3.36292 1.98721C2.48051 1.6927 1.60677 1.37406 0.731108 1.06314C0.579866 1.00906 0.43633 0.936645 0.285088 0.883537C-0.0116162 0.779254 -0.0164329 0.544616 0.0105403 0.291631C0.04233 -0.0077012 0.266785 0.00678263 0.47679 0.00678263C2.35528 0.00678263 4.2328 0.00678263 6.11129 0.00678263C8.50322 0.00678263 10.8952 0.0125762 13.2861 2.35055e-05C13.6503 -0.00190767 13.8699 0.114929 14.0587 0.435504C16.0711 3.85079 18.1008 7.25546 20.12 10.6669C22.0649 13.9547 24.0022 17.2474 25.9433 20.5381C26.212 20.9939 26.4856 21.4477 26.7573 21.9025C26.8218 22.0097 26.8671 22.1603 27.0347 22.1072C27.1879 22.0589 27.1792 21.9063 27.1812 21.7818C27.1869 21.4284 27.1812 21.074 27.1812 20.7196C27.1812 15.0883 27.1735 9.45797 27.1937 3.82665C27.1956 3.31296 27.0232 3.04646 26.5791 2.82823C25.4269 2.26336 24.295 1.65601 23.1564 1.06314C23.0716 1.01872 22.9955 0.956922 22.9107 0.912505C22.6285 0.767667 22.6034 0.527235 22.6593 0.254939C22.72 -0.0405312 22.9599 0.00967939 23.1593 0.00967939C25.8556 0.00581704 28.5529 0.00581704 31.2493 0.00678263C31.4381 0.00678263 31.651 -0.0231506 31.7088 0.242386C31.7676 0.51082 31.7502 0.759942 31.4949 0.926023C30.9718 1.26688 30.4459 1.60483 29.9199 1.94086C29.4334 2.25178 28.9508 2.56849 28.4566 2.86686C28.1772 3.03487 28.0636 3.25792 28.0761 3.58332C28.0944 4.01687 28.0799 4.45235 28.0799 4.8859C28.0799 14.0561 28.0819 23.2273 28.0819 32.3975C28.0819 33.2935 28.0819 33.2897 27.1677 33.2877C25.9481 33.2848 24.7276 33.2704 23.508 33.2955C23.0022 33.3061 22.6978 33.14 22.432 32.6842C20.8348 29.9545 19.1981 27.248 17.5826 24.5289C15.8534 21.6176 14.1377 18.6977 12.4076 15.7864C10.6688 12.8607 8.91938 9.94076 7.17576 7.01792C6.6257 6.09579 6.07757 5.17172 5.52847 4.24861C5.4331 4.08833 5.37627 3.82569 5.14603 3.89135C4.94566 3.94832 5.03332 4.19937 5.03236 4.36352C5.02754 8.59473 5.02851 12.8259 5.02851 17.0571H5.03332L5.03429 17.0581Z"
								fill="white"
							/>
							<path
								d="M55.5577 12.6194C53.8468 9.18669 51.1129 7.05854 47.3637 6.31214C44.5999 5.76175 41.864 5.98963 39.2072 6.94267C35.1352 8.40264 32.5034 11.2183 31.5786 15.4688C30.7761 19.1574 31.2694 22.7436 32.9677 26.1154C34.8491 29.8493 37.9298 31.9533 42.048 32.5201C44.6779 32.8813 47.2278 32.5153 49.693 31.5391C51.9818 30.6334 53.8285 29.1696 55.1733 27.0993C56.6029 24.9007 57.1617 22.4539 57.1453 19.8545C57.1308 17.3295 56.6925 14.8972 55.5577 12.6194ZM48.1122 29.5326C47.6305 31.291 45.9688 32.1793 44.2945 31.485C43.5152 31.1616 43.0692 30.477 42.6886 29.7615C41.9488 28.372 41.5606 26.8589 41.2629 25.3313C40.4364 21.0808 39.8603 16.7994 39.8883 12.4562C39.896 11.2308 39.9817 10.0161 40.4162 8.8497C41.2042 6.73506 43.6992 6.25999 45.1788 7.94978C45.674 8.51368 45.9832 9.18476 46.2356 9.87999C47.0804 12.2051 47.461 14.6326 47.7991 17.0707C48.1873 19.8593 48.5158 22.6509 48.538 25.4704C48.5428 26.8406 48.4792 28.1962 48.1122 29.5326Z"
								fill="white"
							/>
							<path
								d="M75.3051 50.5139C74.8022 47.4288 73.3274 44.9328 70.8266 43.0788C68.2188 41.1467 65.2296 40.3636 62.0738 40.3066C61.0267 40.3462 60.0373 40.3762 59.0566 40.6031C55.1484 41.5059 52.48 43.9015 50.9069 47.5206C49.6931 50.3121 49.2423 53.2552 49.6527 56.2968C50.0332 59.1202 51.2171 61.5419 53.3162 63.4846C54.7419 64.8046 56.4142 65.6978 58.2658 66.2617C60.6712 66.9955 63.12 67.2321 65.5909 66.7251C69.6369 65.8938 72.4189 63.4335 74.0556 59.7082C75.3398 56.7863 75.8272 53.7119 75.3051 50.5139ZM66.5436 52.9066C66.1641 55.1255 65.7527 57.3396 65.1584 59.5132C64.6998 61.1885 64.2287 62.8628 63.2914 64.3517C62.9119 64.9562 62.4504 65.4786 61.7588 65.7605C60.3677 66.3283 58.7339 65.5867 58.2166 64.1721C57.787 62.996 57.761 61.7813 57.7706 60.557C57.8091 58.4443 58.1164 56.3615 58.4623 54.2816C58.8524 51.9333 59.3042 49.5985 59.94 47.3023C60.2964 46.0162 60.6982 44.7455 61.3185 43.5549C61.5806 43.0528 61.8908 42.5835 62.2799 42.177C63.6392 40.7537 66.0273 41.2172 66.7979 43.0209C67.2507 44.0792 67.2449 45.1867 67.2488 46.2943C67.2574 48.5228 66.9184 50.7186 66.5436 52.9066Z"
								fill="white"
							/>
							<path
								d="M98.7599 97.1161C98.732 96.8177 98.5258 96.7839 98.2937 96.7308C97.8563 96.6314 97.4325 96.4518 96.9913 96.3938C96.4605 96.3243 96.3121 96.0684 96.315 95.5586C96.3333 92.7758 96.3237 89.9929 96.3237 87.2101H96.2611C96.2611 84.8618 96.263 82.5125 96.2601 80.1642C96.2591 79.0345 96.183 77.9163 95.7919 76.8387C95.4095 75.7862 94.8045 74.9027 93.9154 74.2143C92.5224 73.1367 90.8944 72.6703 89.1941 72.4414C84.889 71.8621 80.6821 72.3594 76.5581 73.6841C76.2325 73.7894 76.1035 73.9613 76.1006 74.3079C76.0823 76.5925 76.0457 78.8761 76.0187 81.1607C76.0168 81.3277 75.9474 81.5508 76.1747 81.6165C76.4031 81.6821 76.6554 81.714 76.8558 81.5209C76.9473 81.432 77.0263 81.3277 77.1015 81.2244C78.8451 78.823 80.6118 76.437 82.3159 74.0076C82.8227 73.2854 83.3987 72.9657 84.2493 73.1115C84.3601 73.1309 84.4748 73.1241 84.5846 73.1434C85.5575 73.3124 86.3889 73.717 86.8927 74.615C87.2752 75.2947 87.4861 76.0431 87.5853 76.8078C87.8445 78.8076 87.7799 80.8208 87.7992 82.8302C87.8021 83.1315 87.6547 83.257 87.3773 83.3101C86.1009 83.5544 84.8264 83.8064 83.5519 84.0594C81.5385 84.4601 79.5156 84.8338 77.7064 85.8931C76.3636 86.68 75.3434 87.7431 74.8039 89.2321C74.2837 90.6669 74.2529 92.1452 74.5313 93.612C74.9369 95.7517 76.0938 97.3894 78.139 98.2323C80.8748 99.3592 85.3138 98.9681 87.5584 96.0771C87.8898 95.6494 87.9736 95.6735 88.2279 96.1389C88.856 97.2889 89.8048 98.0102 91.0678 98.3395C92.8634 98.8068 94.6542 98.7499 96.4528 98.354C97.1309 98.2043 97.7793 97.9803 98.4035 97.6829C98.6376 97.5709 98.7869 97.4048 98.7599 97.1161ZM87.1451 95.1588C85.5392 95.8589 83.4536 95.4186 82.919 93.329C82.3612 91.1526 82.3265 88.9713 82.997 86.8219C83.391 85.5619 84.3303 84.8676 85.6394 84.6668C86.1471 84.5895 86.6519 84.5094 87.1653 84.4765C87.7616 84.4369 87.8079 84.4707 87.8088 85.0588C87.8117 86.569 87.8098 88.0801 87.8098 89.5913H87.8368C87.8368 91.086 87.8127 92.5807 87.8493 94.0755C87.8637 94.6432 87.5921 94.9638 87.1451 95.1588Z"
								fill="white"
							/>
							<path
								d="M47.0275 35.2257C47.6228 35.2257 48.0881 35.2257 48.5534 35.2257C48.8019 35.2257 48.9185 35.3474 48.959 35.6004C49.3019 37.743 49.6603 39.8837 49.9994 42.0283C50.0331 42.2398 50.1689 42.5449 49.8394 42.655C49.5398 42.7544 49.2576 42.7226 49.0187 42.4377C47.4976 40.6147 45.9409 38.8206 44.4438 36.9773C43.8167 36.2048 43.4603 36.2908 42.653 36.9619C42.2648 37.2853 42.1675 37.7874 42.0712 38.2577C41.8583 39.2957 41.9411 40.3405 42.076 41.3794C42.2889 43.0209 42.5182 44.6605 42.7339 46.302C42.8043 46.8369 42.9093 46.9287 43.4555 46.8514C44.6144 46.6863 45.7742 46.527 46.9312 46.3445C47.2934 46.2875 47.462 46.3773 47.514 46.7607C47.724 48.321 47.8926 47.9667 46.4129 48.1965C45.4621 48.3442 44.5074 48.4736 43.5528 48.5924C43.0759 48.6522 43.1077 48.9583 43.1568 49.2982C43.4892 51.5731 43.8273 53.8471 44.15 56.123C44.6124 59.3857 45.0604 62.6504 45.5208 65.9131C45.7068 67.234 45.9312 68.5501 46.0911 69.8739C46.1518 70.3741 46.3811 70.5064 46.8368 70.5257C47.5891 70.5566 48.3386 70.6657 49.0919 70.6995C49.4609 70.7159 49.5591 70.9062 49.5813 71.2113C49.6063 71.5512 49.3539 71.5396 49.1314 71.5715C44.8764 72.1875 40.6223 72.8045 36.3673 73.4206C36.2084 73.4437 36.0485 73.4553 35.8885 73.4679C35.6631 73.4852 35.4281 73.5297 35.3635 73.2062C35.3067 72.9213 35.3452 72.7224 35.6622 72.6008C36.2007 72.3932 36.7112 72.1141 37.2526 71.9162C37.6505 71.7704 37.8162 71.5618 37.7526 71.1273C37.5012 69.4095 37.2709 67.6879 37.0301 65.9681C36.7189 63.7396 36.4078 61.511 36.0928 59.2824C35.719 56.6406 35.3414 53.9997 34.9666 51.3578C34.9166 51.0083 34.8674 50.6578 34.8212 50.3073C34.7788 49.9896 34.6227 49.8776 34.2914 49.9326C33.6594 50.0379 33.0207 50.1045 32.3849 50.1895C32.1826 50.2165 31.9871 50.2319 31.937 49.9654C31.8898 49.7182 31.7838 49.474 32.1268 49.3137C32.7799 49.0085 33.4109 48.6542 34.065 48.351C34.4204 48.1859 34.51 47.9589 34.4464 47.5843C34.2413 46.3792 34.0419 45.1713 34.0486 43.944C34.065 40.9806 35.3317 38.7443 37.899 37.237C39.4808 36.3082 41.2051 35.8775 42.9892 35.5927C44.3716 35.3725 45.7655 35.3097 47.0285 35.2248L47.0275 35.2257Z"
								fill="white"
							/>
							<path
								d="M137.262 80.1951C136.823 78.7197 136.15 77.3544 135.047 76.2459C133.725 74.9172 132.112 74.1428 130.285 73.8C127.161 73.2139 124.098 73.3095 121.134 74.6005C118.558 75.7216 116.666 77.5716 115.601 80.1498C113.77 84.5837 113.869 89.0689 115.695 93.4797C116.677 95.8512 118.411 97.596 120.753 98.6717C123.984 100.156 127.351 100.311 130.78 99.5581C132.807 99.113 134.61 98.2024 136.131 96.7666C136.494 96.4248 136.831 96.0578 137.075 95.6195C137.186 95.4157 137.239 95.155 137.107 94.9764C136.945 94.7591 136.732 94.9667 136.547 95.0324C135.851 95.2805 135.143 95.4939 134.413 95.5992C132.882 95.8184 131.349 95.886 129.806 95.6996C126.782 95.3346 124.716 93.7713 123.684 90.8678C123.179 89.4445 122.965 87.972 122.861 86.4753C122.816 85.8487 122.839 85.8062 123.457 85.8052C125.753 85.8023 128.048 85.8043 130.343 85.8043V85.7782C132.638 85.7782 134.933 85.7791 137.229 85.7782C137.836 85.7782 137.86 85.7502 137.863 85.1602C137.871 83.4801 137.742 81.8115 137.262 80.1961V80.1951ZM129.364 84.5635C128.337 84.5809 127.316 84.7112 126.388 84.6842C125.294 84.7382 124.3 84.7798 123.308 84.8387C122.98 84.8589 122.776 84.7952 122.79 84.4099C122.881 81.9516 122.909 79.4864 123.724 77.1226C123.977 76.3888 124.31 75.6955 124.858 75.1287C126.126 73.8136 128.118 74.1844 128.854 75.8548C129.434 77.1729 129.61 78.5739 129.752 79.9818C129.886 81.3104 129.894 82.6458 129.92 83.9803C129.928 84.3945 129.775 84.5567 129.364 84.5635Z"
								fill="white"
							/>
							<path
								d="M100.501 99.2346C100.287 99.2134 99.9979 99.3312 99.9421 98.9227C99.891 98.5519 100.06 98.4061 100.38 98.3028C100.945 98.1213 101.494 97.8905 102.058 97.7099C102.383 97.6057 102.463 97.4125 102.44 97.0958C102.315 95.3153 102.201 93.5338 102.085 91.7523C101.636 84.8193 101.187 77.8854 100.737 70.9525C100.643 69.508 100.534 68.0644 100.453 66.6199C100.43 66.2308 100.305 66.001 99.9064 65.8948C99.2726 65.7248 98.657 65.4834 98.0222 65.3193C97.6754 65.2295 97.4837 65.0875 97.4846 64.709C97.4865 64.3363 97.7563 64.3247 98.0058 64.2726C100.862 63.6691 103.717 63.0637 106.575 62.4631C107.074 62.3578 107.559 62.1792 108.089 62.2381C108.458 62.2786 108.61 62.4264 108.633 62.8097C108.763 65.0093 108.914 67.207 109.059 69.4056C109.316 73.3211 109.576 77.2366 109.832 81.152C110.071 84.8435 110.304 88.5349 110.545 92.2264C110.639 93.6545 110.759 95.0806 110.848 96.5097C110.874 96.9259 111.061 97.0939 111.461 97.1547C112.046 97.2445 112.622 97.3952 113.203 97.5139C113.504 97.5757 113.569 97.7853 113.571 98.0498C113.573 98.3405 113.381 98.3859 113.156 98.4003C108.945 98.6784 104.735 98.9565 100.501 99.2356V99.2346Z"
								fill="white"
							/>
							<path
								d="M70.1587 77.0743C70.1587 78.0225 70.1635 78.9707 70.1558 79.9189C70.1539 80.1574 70.2705 80.4693 69.9111 80.5649C69.6038 80.647 69.3544 80.5475 69.1559 80.281C68.1097 78.879 67.0559 77.4837 66.0058 76.0855C65.5145 75.4309 65.0232 74.7762 64.5387 74.1157C64.4395 73.9805 64.3325 73.8743 64.1678 73.8309C62.9482 73.5122 61.746 73.492 60.6218 74.1399C59.4639 74.8071 58.9273 76.5142 59.2799 78.0814C59.6084 79.5414 60.7152 80.2211 61.9021 80.8285C64.0975 81.9505 66.4355 82.7964 68.4787 84.2167C69.9834 85.2625 71.2039 86.5573 71.6451 88.3794C72.3734 91.3901 72.1152 94.2444 69.8803 96.6188C68.942 97.6153 67.7466 98.2467 66.4384 98.661C63.7285 99.5184 60.959 99.4248 58.1836 99.1824C56.6298 99.0472 55.1058 98.7402 53.6136 98.2709C53.2071 98.1434 53.0558 97.9387 53.0423 97.5177C52.973 95.4118 52.8738 93.3078 52.7957 91.2018C52.788 90.9952 52.6801 90.7055 52.9788 90.6205C53.2601 90.5404 53.5385 90.5761 53.762 90.8378C54.8438 92.1085 55.9391 93.3676 57.0267 94.6335C57.9669 95.7285 58.91 96.8215 59.8386 97.9262C60.0949 98.2313 60.4031 98.3732 60.7865 98.4244C61.8269 98.5635 62.8384 98.491 63.7902 98.0218C64.609 97.6172 65.1764 96.9664 65.3893 96.0732C66.0106 93.4729 65.2275 92.3789 63.3904 91.3186C61.8732 90.4429 60.223 89.8384 58.6797 89.0167C57.2039 88.2307 55.7878 87.3597 54.6588 86.0861C53.4441 84.716 52.8506 83.1208 52.8073 81.2939C52.7562 79.1542 53.2658 77.2153 54.732 75.5989C55.7194 74.5097 56.965 73.8434 58.3474 73.4031C60.5023 72.7175 62.718 72.7552 64.9327 72.8749C66.4393 72.9561 67.9373 73.1347 69.4121 73.4813C69.7676 73.5644 69.9266 73.6996 69.9333 74.0839C69.9526 75.0803 70.0123 76.0768 70.0566 77.0733C70.0913 77.0733 70.126 77.0733 70.1607 77.0733L70.1587 77.0743Z"
								fill="white"
							/>
							<path
								d="M59.7493 27.7357C59.9959 24.9644 60.2464 22.1932 60.4891 19.4219C60.7328 16.6343 60.9698 13.8457 61.2049 11.0561C61.2627 10.3724 61.2318 10.3435 60.5681 10.2846C59.7685 10.2131 58.969 10.1446 58.1694 10.0799C57.9257 10.0606 57.7311 10.021 57.7398 9.69846C57.7475 9.40782 57.8101 9.20022 58.1396 9.14615C59.074 8.99262 60.0036 8.81398 60.9399 8.67301C61.2925 8.6199 61.4197 8.46058 61.4467 8.11007C61.5517 6.76307 61.6923 5.41897 61.8002 4.07198C61.8253 3.75913 61.9312 3.61236 62.2578 3.59111C64.7403 3.43179 67.2218 3.25702 69.7043 3.0948C70.2881 3.05618 70.3054 3.07839 70.2553 3.67029C70.1137 5.35331 69.9663 7.03537 69.816 8.71742C69.765 9.28616 69.8093 9.33347 70.395 9.38272C71.8824 9.50824 73.3678 9.64922 74.8562 9.76895C75.1847 9.79502 75.2877 9.92151 75.2771 10.2517C75.2386 11.5524 75.2473 11.5678 73.9661 11.4732C72.7503 11.3824 71.5365 11.2589 70.3228 11.1411C69.6359 11.0744 69.5935 11.1005 69.5338 11.8044C69.0733 17.2049 68.609 22.6065 68.161 28.008C68.0917 28.8413 68.0686 29.6823 68.5396 30.4412C68.8806 30.9907 69.3816 31.3103 69.9846 31.4831C70.999 31.7728 72.0375 31.8307 73.0856 31.7931C73.2763 31.7863 73.5403 31.684 73.6106 31.9785C73.6722 32.2353 73.6241 32.4661 73.3967 32.6698C72.6569 33.3332 71.7986 33.7996 70.8979 34.1858C68.7169 35.1195 66.4733 35.1939 64.2095 34.5498C61.8715 33.8845 60.3995 32.385 59.9564 29.9488C59.8235 29.2188 59.756 28.483 59.7483 27.7366L59.7493 27.7357Z"
								fill="white"
							/>
							<path
								d="M96.1427 44.7687C96.1427 45.8289 96.1581 46.8901 96.1369 47.9503C96.1225 48.6765 96.0897 48.6745 95.3952 48.5934C93.3779 48.3588 91.3607 48.2912 89.3618 48.7267C88.4871 48.9169 88.5026 48.9497 88.4534 49.8429C88.2107 54.2103 87.9621 58.5776 87.7194 62.944C87.6905 63.4577 87.7068 63.9753 87.6567 64.486C87.6134 64.935 87.8157 65.1262 88.2203 65.2199C88.9698 65.3927 89.7135 65.5897 90.4591 65.779C90.645 65.8263 90.8425 65.862 90.9234 66.0754C91.065 66.4491 90.8598 66.7233 90.4225 66.6992C87.8908 66.5601 85.3602 66.4095 82.8295 66.2656C80.9077 66.1565 78.9849 66.0542 77.0621 65.947C76.801 65.9325 76.5419 65.9257 76.5217 65.5511C76.5043 65.218 76.6845 65.0876 76.9648 65.0297C77.5457 64.909 78.1246 64.7757 78.7103 64.6811C79.0735 64.6222 79.2209 64.458 79.2411 64.0824C79.5966 57.4826 79.9607 50.8838 80.3364 44.285C80.3615 43.8456 80.2295 43.61 79.8172 43.4468C79.192 43.1987 78.5938 42.882 77.9801 42.6048C77.6815 42.4697 77.6709 42.2273 77.6998 41.9589C77.7287 41.6846 77.9185 41.647 78.1458 41.6277C81.1822 41.3621 84.2177 41.086 87.2541 40.8233C88.7964 40.6901 88.8031 40.7007 88.7203 42.2476C88.6268 43.9982 88.518 45.7478 88.4245 47.4984C88.4158 47.6539 88.2819 47.9156 88.517 47.9494C88.6943 47.9754 88.7299 47.7031 88.7809 47.539C89.2597 45.9989 89.8724 44.5264 90.7972 43.19C92.0168 41.4268 94.0513 40.5462 95.9654 40.974C96.3325 41.056 96.4808 41.2086 96.4577 41.591C96.3922 42.6502 96.3527 43.7114 96.3036 44.7716C96.2506 44.7716 96.1976 44.7716 96.1446 44.7716L96.1427 44.7687Z"
								fill="white"
							/>
							<path
								d="M144.55 99.8873C141.883 99.9018 139.87 97.8982 139.847 95.2071C139.825 92.543 141.803 90.5655 144.496 90.5587C147.172 90.5529 149.237 92.5179 149.245 95.0796C149.255 97.8151 147.245 99.8718 144.549 99.8863L144.55 99.8873Z"
								fill="white"
							/>
						</svg>
					</div>
					<div css={textBlock}>
						<div css={bodySection}>
							The Guardian's expert news coverage is funded by
							people like you, not a billionaire owner. Will you
							help us keep our independent journalism free and
							open to all today?
						</div>
						<div css={ctaSection}>
							<ThemeProvider theme={contributionsTheme}>
								<LinkButton
									href={urlWithRegionAndTracking}
									icon={<SvgArrowRightStraight />}
									iconSide="right"
									onClick={onButtonCtaClick}
									target="_blank"
									rel="noopener noreferrer"
									priority={'primary'}
									cssOverrides={cta}
								>
									Support us
								</LinkButton>
							</ThemeProvider>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
