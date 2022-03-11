import { css } from '@emotion/react';



type Props = {
	format: ArticleFormat;
	palette: Palette;
};

const bannerStyle = css`
	background-color: blue;
	color: yellow;
	padding: 10px 0;
	font-weight: bold;
`;

export const NewsLetterSignupBanner = ({ }: Props) => (


	<div css={bannerStyle}>NEWSLETTERS</div>

);
