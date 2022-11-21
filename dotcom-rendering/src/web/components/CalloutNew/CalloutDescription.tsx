import { css } from '@emotion/react';
import { textSans, space, body } from '@guardian/source-foundations';
import { decidePalette } from '../../lib/decidePalette';

const descriptionStyles = (format: ArticleFormat) =>
	css`
		a {
			color: ${decidePalette(format).text.richLink};
		}
		${textSans.small()}
		padding-bottom: ${space[4]}px;
		${body.medium()}
	`;

interface Props {
	description: string;
	format: ArticleFormat;
}

export const CalloutDescription = ({ description, format }: Props) => (
	<div
		dangerouslySetInnerHTML={{ __html: description }}
		css={descriptionStyles(format)}
	></div>
);
