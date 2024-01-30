import { css } from '@emotion/react';
import { palette, textSans, until } from '@guardian/source-foundations';
import type { NavType } from '../model/extract-nav';
import ArrowRight from '../static/icons/arrow-right.svg';

const supportStyles = css`
	align-self: flex-start;
	background-color: ${palette.brandAlt[400]};
	border-radius: 20px;
	display: flex;
	align-items: center;
	padding: 0 15px;
	min-height: 30px;
	${until.mobileMedium} {
		padding: 0 10px;
		min-height: 24px;
	}
`;

const supportHeaderStyles = css`
	${supportStyles}
	justify-content: center;
	margin-top: 10px;
	margin-left: 10px;
	${until.mobileMedium} {
		margin-top: 28px;
	}
`;

const supportFooterStyles = css`
	${supportStyles}
	margin-bottom: 6px;
`;

const supportLinkStyles = css`
	position: relative;
	color: ${palette.neutral[7]};
	${textSans.medium()};
	font-weight: 700;
	display: block;
	text-decoration: none;
	width: 100%;

	padding-right: 20px;
	${until.mobileMedium} {
		${textSans.small()};
		padding-right: 18px;
	}

	svg {
		position: absolute;
		top: -3px;

		${until.mobileMedium} {
			width: 26px;
			height: 26px;
		}
	}
`;

const rightAlignedIcon = css`
	position: absolute;
	height: 20px;
	width: 20px;
	right: 0;
	top: 0;
`;

type Props = {
	nav: NavType;
	linkLabel: string;
	rrLink: ReaderRevenuePosition;
	rrCategory: 'contribute' | 'subscribe' | 'support';
	rightAlignIcon?: boolean;
};

export const ReaderRevenueButton = ({
	nav,
	linkLabel,
	rrLink,
	rrCategory,
	rightAlignIcon,
}: Props) => {
	const url = nav.readerRevenueLinks[rrLink][rrCategory];

	if (url === '') {
		return null;
	}

	const isAmpHeader = rrLink === 'ampHeader';

	return (
		<div css={isAmpHeader ? supportHeaderStyles : supportFooterStyles}>
			<a css={supportLinkStyles} href={url}>
				{linkLabel}
				<span css={!!rightAlignIcon && rightAlignedIcon}>
					<ArrowRight />
				</span>
			</a>
		</div>
	);
};
