import { css } from '@emotion/react';
import { textSans } from '@guardian/source-foundations';
import { SvgShareCallout } from '@guardian/source-react-components';
import { decidePalette } from '../../lib/decidePalette';

const shareCalloutStyles = css`
	display: flex;
	align-items: center;
`;
const shareCalloutTextStyles = (format: ArticleFormat) =>
	css`
		a {
			color: ${decidePalette(format).text.richLink};
			border-bottom: 1px solid ${decidePalette(format).text.richLink};
			text-decoration: none;
		}
		display: inline-block;
		${textSans.xsmall()}
	`;

const placeholderCircle = css`
	width: 45px;
	display: inline-block;
`;

interface Props {
	format: ArticleFormat;
}

export const CalloutShareComponent = ({ format }: Props) => {
	return (
		<>
			<div css={shareCalloutStyles}>
				<div css={placeholderCircle}>
					<SvgShareCallout />
				</div>
				<div css={shareCalloutTextStyles(format)}>
					Know others who are affected?{' '}
					<a href="https://www.theguardian.com/tone/callout">
						Please share this callout.
					</a>
				</div>
			</div>
		</>
	);
};
