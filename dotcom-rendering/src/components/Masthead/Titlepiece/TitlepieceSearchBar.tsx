import { css } from '@emotion/react';
import { palette, space, textSans15 } from '@guardian/source/foundations';

const searchBoxStyles = css`
	width: 100%;
	height: 40px;
	border-radius: 28px;
	${textSans15};
	padding-left: 10px;
	color: white;
	background-color: ${palette.brand[300]};
	margin-bottom: ${space[2]}px;
	border: none;
	::placeholder {
		color: white;
		padding-left: 10px;
	}
	:focus {
		outline: none;
	}
`;

export const TitlepieceSearchBar = () => {
	return (
		<input
			css={searchBoxStyles}
			type="text"
			placeholder="Search the Guardian"
		/>
	);
};
