import { css } from '@emotion/react';
import { Button } from '@guardian/source-react-components';
import { textSans } from '@guardian/source-foundations';

const rowStyles = css`
	display: flex;
	/* display: inline-block; */
`;

const textStyles = css`
	${textSans.small()}
	float: left;
`;

const headerStyles = css`
	font-weight: bold;
`;

const placeholderCircle = css`
	min-width: 35px;
	height: 35px;
	width: 35px;
	border-radius: 50%;
	background-color: yellow;
	border: black solid 2px;
	/* display: inline-block; */
	margin: 10px 10px 10px 0px;
`;

export const CalloutMessenger = () => {
	return (
		<>
			<div css={rowStyles}>
				<div css={placeholderCircle}></div>
				<div css={textStyles}>
					<div css={headerStyles}>WhatsApp</div>
					<div>Don't have WhatsApp? Get it here:</div>
					<div>Android | iPhone | Mac or Windows PC</div>
					<div>
						Have WhatsApp installed? Stern ovens talking painted
						pasture yet its express parties use. Sure last upon he
						same as knew next. Of believed or wholesome at +44
						(0)7766780300.
					</div>
					<Button> Message us on WhatsApp </Button>
				</div>
			</div>
		</>
	);
};
