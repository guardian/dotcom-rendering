import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { palette, remSpace } from '@guardian/source/foundations';
import type { BodyElement } from 'bodyElement';
import { background } from 'palette';
import { render } from 'renderer';
import { darkModeCss } from 'styles';

interface ArticleBodyProps {
	className?: SerializedStyles[];
	shouldHideAdverts: boolean;
	format: ArticleFormat;
	body: BodyElement[];
}

const styles = (format: ArticleFormat): SerializedStyles => css`
	background: ${background.articleContent(format)};
	position: relative;
	clear: both;

	iframe {
		width: 100%;
		border: none;
	}

	twitter-widget,
	figure[data-atom-type='explainer'] {
		margin: ${remSpace[4]} 0;
		clear: both;
		display: inline-block;
	}

	${darkModeCss`
		background: ${background.articleContentDark(format)};
		color: ${palette.neutral[86]};

		p:last-child {
			margin-bottom: 0;
		}
	`}
`;

const ArticleBody = ({
	className,
	format,
	body,
	shouldHideAdverts,
}: ArticleBodyProps) => {
	const classNames = className ? className : [];
	return (
		<div css={[styles(format), ...classNames]}>
			{render(shouldHideAdverts, format, body)}
		</div>
	);
};

export default ArticleBody;
