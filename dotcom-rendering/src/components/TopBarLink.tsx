import { css } from '@emotion/react';
import {
	from,
	palette,
	space,
	textSansBold17,
} from '@guardian/source-foundations';

type Props = {
	href: string;
	dataLinkName: string;
	children: React.ReactNode;
};

export const topBarLinkStyles = css`
	display: flex;
	align-items: center;
	${textSansBold17};
	line-height: 1.5;

	color: ${palette.neutral[100]};
	transition: color 80ms ease-out;
	text-decoration: none;
	padding: ${space[3]}px ${space[4]}px ${space[1]}px ${space[1]}px;

	${from.tablet} {
		padding: ${space[4]}px ${space[4]}px ${space[1]}px ${space[1]}px;
	}

	${from.desktop} {
		padding: ${space[5]}px ${space[4]}px ${space[1]}px ${space[1]}px;
	}

	:hover,
	:focus {
		text-decoration: underline;
	}

	svg {
		fill: currentColor;
		float: left;
		height: 18px;
		width: 18px;
		margin: 0 ${space[1]}px 0 0;
	}
`;

export const TopBarLink = ({ href, dataLinkName, children }: Props) => {
	return (
		<a href={href} css={topBarLinkStyles} data-link-name={dataLinkName}>
			{children}
		</a>
	);
};
