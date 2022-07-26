import { css } from '@emotion/react';
import { brandAlt, space, textSans } from '@guardian/source-foundations';
import { SvgNewsletter } from './SvgNewsletter';
// TO DO replace SvgNewsletter import when this project is updated to use @guardian/eslint-plugin-source-react-components 6.0.0

type NewsletterCategoryProps = {
	text: string;
};

const containerStyle = css`
	display: flex;
	align-items: center;
	padding-top: ${space[3]}px;
	padding-bottom: ${space[2]}px;

	svg {
		background-color: ${brandAlt[400]};
		border-radius: 50%;
		padding: 2px;
		margin-right: ${space[2]}px;
	}
`;

const spanStyle = css`
	${textSans.medium({ fontWeight: 'bold' })};
`;

export const NewsletterCategory = ({ text }: NewsletterCategoryProps) => (
	<div css={containerStyle}>
		<SvgNewsletter size="small" />
		<span css={spanStyle}>{text}</span>
	</div>
);
