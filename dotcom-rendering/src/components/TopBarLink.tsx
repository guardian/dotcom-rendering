import { css } from '@emotion/react';
import { space, textSansBold17 } from '@guardian/source/foundations';
import { palette as themePalette } from '../palette';

type Props = {
	href: string;
	dataLinkName: string;
	children: React.ReactNode;
};

export const topBarLinkStyles = css`
	display: flex;
	align-items: center;
	${textSansBold17};

	color: ${themePalette('--masthead-top-bar-link-text')};
	transition: color 80ms ease-out;
	text-decoration: none;

	padding: ${space[1]}px;

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
