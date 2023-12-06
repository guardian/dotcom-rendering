import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign } from '@guardian/libs';
import { remSpace } from '@guardian/source-foundations';
import type { Option } from '../../../vendor/@guardian/types/index';
import { maybeRender } from 'lib';
import { text as kickerTextPalette } from 'palette';
import type { FC, ReactElement } from 'react';

type Props = {
	format: ArticleFormat;
	text: Option<string>;
};

const dotStyles = (colour: string): SerializedStyles => {
	return css`
		color: ${colour};
		:before {
			border-radius: 62.5rem;
			display: inline-block;
			position: relative;
			background-color: currentColor;
			width: 0.75em;
			height: 0.75em;
			content: '';
			margin-right: ${remSpace[1]};
			vertical-align: initial;
		}
	`;
};

const liveDot = (
	format: ArticleFormat,
	colour: string,
): ReactElement | null => {
	if (format.design === ArticleDesign.LiveBlog) {
		return <span css={dotStyles(colour)} />;
	} else {
		return null;
	}
};

const kickerStyles = (colour: string): SerializedStyles => css`
	color: ${colour};
	font-weight: 700;
	margin-right: ${remSpace[1]};
`;

const slashStyles = css`
	&::after {
		content: '/';
		display: inline-block;
		margin-left: ${remSpace[1]};
	}
`;

const Kicker: FC<Props> = ({ format, text }) => {
	return maybeRender(text, (t) => {
		const kickerColour = kickerTextPalette.kicker(format);
		return (
			<span css={kickerStyles(kickerColour)}>
				{liveDot(format, kickerColour)}
				<span css={slashStyles}>{t}</span>
			</span>
		);
	});
};

export default Kicker;
