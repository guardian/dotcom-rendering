import { css } from '@emotion/react';
import { brand, from, neutral, textSans } from '@guardian/source-foundations';
import { ReactComponent as SearchIcon } from '../../static/icons/search.svg';
import { getZIndex } from '../lib/getZIndex';

interface SearchProps {
	href: string;
	dataLinkName: string;
}

const searchLinkStyles = css`
	${textSans.medium({ fontWeight: 'bold' })};
	color: ${neutral[100]};
	transition: color 80ms ease-out;
	text-decoration: none;
	padding: 7px 0;

	${from.tablet} {
		padding: 7px 10px 7px 5px;
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
		margin: 3px 4px 0 0;
	}
	${getZIndex('searchHeaderLink')}
`;

const linkTablet = css`
	display: none;

	:before {
		content: '';
		border-left: 1px solid ${brand[600]};
		height: 24px;
	}

	${from.desktop} {
		display: flex;
	}
`;

export const Search = ({ href, dataLinkName }: SearchProps) => {
	return (
		<div css={linkTablet}>
			<a href={href} css={searchLinkStyles} data-link-name={dataLinkName}>
				<SearchIcon />
				<>Search</>
			</a>
		</div>
	);
};
