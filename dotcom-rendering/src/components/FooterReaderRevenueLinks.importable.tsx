import { css } from '@emotion/react';
import {
	brandText,
	from,
	headlineBold20,
	headlineBold24,
	headlineBold28,
	headlineBold34,
	palette,
	textSans15,
	textSans17,
	until,
} from '@guardian/source/foundations';
import { shouldHideSupportMessaging } from '../lib/contributions';
import { useCountryCode } from '../lib/useCountryCode';
import ArrowRightIcon from '../static/icons/arrow-right.svg';

type Props = {
	dataLinkNamePrefix: string;
	urls: {
		subscribe: string;
		support: string;
		contribute: string;
	};
};

const messageStyles = (isThankYouMessage: boolean) => css`
	color: ${palette.brandAlt[400]};
	${headlineBold20};
	padding-top: 3px;
	margin-bottom: 3px;

	${from.desktop} {
		${headlineBold24}
	}

	${from.leftCol} {
		${isThankYouMessage ? headlineBold28 : headlineBold34}
	}
`;

const linkStyles = css`
	background: ${palette.brandAlt[400]};
	border-radius: 16px;
	box-sizing: border-box;
	color: ${palette.neutral[7]};
	float: left;
	${textSans15};
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

const subMessageStyles = css`
	color: ${brandText.primary};
	${textSans17};
	margin: 5px 0;
`;

type ReaderRevenueLinksNativeProps = {
	dataLinkNamePrefix: string;
	urls: {
		subscribe: string;
		support: string;
		contribute: string;
	};
};

const ReaderRevenueLinksNative = ({
	dataLinkNamePrefix,
	urls,
}: ReaderRevenueLinksNativeProps) => {
	const hideSupportMessaging = shouldHideSupportMessaging();
	const url = urls.support;

	if (hideSupportMessaging) {
		return (
			<div>
				<div css={messageStyles(true)}> Thank you </div>
				<div css={subMessageStyles}>
					Your support powers our independent journalism
				</div>
			</div>
		);
	}

	const SupportButton = () => (
		<a
			css={linkStyles}
			href={url}
			data-link-name={`${dataLinkNamePrefix}contribute-cta`}
		>
			Support us <ArrowRightIcon />
		</a>
	);

	return (
		<div>
			<div css={messageStyles(false)}>
				<span>Support the&nbsp;Guardian</span>
			</div>
			<div css={subMessageStyles}>
				<div>Available for everyone, funded by readers</div>
			</div>
			<SupportButton />
		</div>
	);
};

export const FooterReaderRevenueLinks = ({
	dataLinkNamePrefix,
	urls,
}: Props) => {
	const countryCode = useCountryCode('reader-revenue-links');

	if (countryCode) {
		return (
			<ReaderRevenueLinksNative
				dataLinkNamePrefix={dataLinkNamePrefix}
				urls={urls}
			/>
		);
	}

	return null;
};
