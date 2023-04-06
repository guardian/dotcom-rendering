import { css } from '@emotion/react';
import { headline, neutral, until } from '@guardian/source-foundations';
import { Link } from '@guardian/source-react-components';
import { QuoteIcon } from './QuoteIcon';

const scottAvatarStyles = css`
	width: 72px;
	height: 72px;
	border-radius: 100%;
	overflow: hidden;
	background-color: #fcebde;
	${until.mobileLandscape} {
		margin-top: 5px;
	}
`;

const scottPortraitStyles = css`
	width: 82px;
`;

const scottTextStyles = css`
	${headline.xxxsmall()}
	font-size: 14px;
	line-height: 16px;
	${until.leftCol} {
		margin-right: 10px;
	}
	${until.mobileLandscape} {
		margin-top: 35px;
	}
`;

const quoteLineStyles = css`
	color: ${neutral[46]};
`;

const containerStyles = css`
	${until.leftCol} {
		display: flex;
		flex-direction: row-reverse;
		margin-top: -35px;
		${until.mobileLandscape} {
			justify-content: space-between;
		}
	}
`;

const textWrapStyle = css`
	${until.mobileLandscape} {
		display: inline-block;
	}
`;

export const CPScottComponent = () => {
	return (
		<>
			<div css={containerStyles}>
				<div css={scottAvatarStyles}>
					<img
						css={scottPortraitStyles}
						src="http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2015/1/22/1421924658711/CPScottcutout.png"
						alt="cp scott portrait"
					/>
				</div>
				<div css={scottTextStyles}>
					<div css={quoteLineStyles}>
						<div css={textWrapStyle}>
							<QuoteIcon colour={neutral[46]} />
							Comment is free&hellip;
						</div>
						<div css={textWrapStyle}>but facts are sacred</div>
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
			</div>
		</>
	);
};
