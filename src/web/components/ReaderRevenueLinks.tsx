import { css } from '@emotion/react';

import ArrowRightIcon from '@frontend/static/icons/arrow-right.svg';
import {
	brandText,
	brandAlt,
	neutral,
} from '@guardian/src-foundations/palette';
import { textSans, headline } from '@guardian/src-foundations/typography';
import { from, until } from '@guardian/src-foundations/mq';

import { shouldHideSupportMessaging } from '@root/src/web/lib/contributions';

type Props = {
	edition: Edition;
	urls: {
		subscribe: string;
		support: string;
		contribute: string;
	};
	dataLinkNamePrefix: string;
	inHeader: boolean;
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

export const ReaderRevenueLinks: React.FC<Props> = ({
	edition,
	urls,
	dataLinkNamePrefix,
	inHeader,
}) => {
	if (shouldHideSupportMessaging()) {
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
	return (
		<div css={inHeader && headerStyles}>
			<div css={inHeader && hiddenUntilTablet}>
				<div css={messageStyles(false)}>
					<span>Support the&nbsp;Guardian</span>
				</div>
				<div css={subMessageStyles}>
					<div>Available for everyone, funded by readers</div>
				</div>
				<a
					css={linkStyles}
					href={urls.contribute}
					data-link-name={`${dataLinkNamePrefix}contribute-cta`}
				>
					Contribute <ArrowRightIcon />
				</a>
				<a
					css={linkStyles}
					href={urls.subscribe}
					data-link-name={`${dataLinkNamePrefix}subscribe-cta`}
				>
					Subscribe <ArrowRightIcon />
				</a>
			</div>

			<div css={[inHeader && hiddenFromTablet, !inHeader && hidden]}>
				{edition === 'UK' ? (
					<a
						css={linkStyles}
						href={urls.subscribe}
						data-link-name={`${dataLinkNamePrefix}contribute-cta`}
					>
						Subscribe <ArrowRightIcon />
					</a>
				) : (
					<a
						css={linkStyles}
						href={urls.contribute}
						data-link-name={`${dataLinkNamePrefix}support-cta`}
					>
						Contribute <ArrowRightIcon />
					</a>
				)}
			</div>
		</div>
	);
};
