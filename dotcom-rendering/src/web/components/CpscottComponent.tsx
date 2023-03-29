import { css } from '@emotion/react';
import { headline, neutral } from '@guardian/source-foundations';
import { Link } from '@guardian/source-react-components';
import { Hide } from './Hide';
import { QuoteIcon } from './QuoteIcon';

const scottAvatarStyles = css`
	width: 72px;
	height: 72px;
	border-radius: 100%;
	overflow: hidden;
	background-color: #fcebde;
`;

const scottPortraitStyles = css`
	width: 82px;
`;

const scottTextStyles = css`
	${headline.xxxsmall()}
	font-size: 14px;
	line-height: 16px;
`;

const quoteLineStyles = css`
	color: ${neutral[46]};
`;

export const CPScottComponent = () => {
	return (
		<>
			<Hide when="below" breakpoint="leftCol">
				<div css={scottAvatarStyles}>
					<img
						css={scottPortraitStyles}
						src="http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2015/1/22/1421924658711/CPScottcutout.png"
						alt="cp scott portrait"
					/>
				</div>
				<div css={scottTextStyles}>
					<div css={quoteLineStyles}>
						<div>
							<QuoteIcon colour={neutral[46]} />
							Comment is free&hellip;
						</div>
						<div>but facts are sacred</div>
					</div>
					<Link
						href={
							'http://www.theguardian.com/commentisfree/2002/nov/29/1'
						}
						cssOverrides={css`
							color: ${neutral[7]};
							text-decoration: none;
							${scottTextStyles}
						`}
					>
						CP Scott, 1921 Guardian editor
					</Link>
				</div>
			</Hide>
		</>
	);
};
