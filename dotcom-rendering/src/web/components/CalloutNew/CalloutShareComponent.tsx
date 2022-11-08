import { css } from '@emotion/react';
import { textSans } from '@guardian/source-foundations';
import { decidePalette } from '../../lib/decidePalette';

const shareCalloutStyles = css`
	display: flex;
	align-items: center;
	padding-left: 10px;
	padding-right: 10px;
`;
const shareCalloutTextStyles = (format: ArticleFormat) =>
	css`
		a {
			color: ${decidePalette(format).text.richLink};
		}
		display: inline-block;
		${textSans.xsmall()}
	`;

const placeholderCircle = css`
	height: 33px;
	width: 35px;
	border-radius: 50%;
	background-color: yellow;
	border: black solid 2px;
	display: inline-block;
	margin: 10px 10px 10px 0px;
`;

interface Props {
	format: ArticleFormat;
}

export const CalloutShareComponent = ({ format }: Props) => {
	return (
		<>
			<div css={shareCalloutStyles}>
				<span css={placeholderCircle}></span>{' '}
				<div css={shareCalloutTextStyles(format)}>
					Know others who are affected?{' '}
					<a href="https://www.theguardian.com/tone/callout">
						Share this callout.
					</a>
				</div>
			</div>
		</>
	);
};
