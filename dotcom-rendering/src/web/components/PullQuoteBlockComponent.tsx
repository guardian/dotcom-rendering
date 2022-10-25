import { css } from '@emotion/react';
import { ArticleDesign, ArticleSpecial } from '@guardian/libs';
import { from, headline, text, until } from '@guardian/source-foundations';
import { unescapeData } from '../../lib/escapeData';
import type { Palette } from '../../types/palette';
import { QuoteIcon } from './QuoteIcon';

const partiallyLeft = css`
	width: 220px;
	margin-left: -10px;
	margin-right: 10px;
	padding-left: 10px;
	padding-right: 10px;
	clear: left;
	float: left;

	${until.mobileMedium} {
		width: 100%;
	}

	${from.leftCol} {
		margin-left: -120px;
	}

	:after {
		left: 10px;
		border-radius: 0 0 25px;

		${from.leftCol} {
			border-radius: 0 0 0 25px;
			left: 0;
			margin-left: 85px;
		}
	}
`;
const fullyLeft = css`
	margin-left: -10px;
	margin-right: 10px;
	padding-left: 10px;
	padding-right: 10px;
	clear: left;
	float: left;

	${until.mobileLandscape} {
		width: 100%;
	}
	${from.mobileLandscape} {
		width: 220px;
	}
	${from.leftCol} {
		width: 140px;
		margin-left: -150px;
	}
	${from.wide} {
		width: 200px;
		margin-left: -215px;
	}
`;

const partiallyInline = css`
	margin-left: 0;
	padding-left: 10px;
	padding-right: 10px;
	display: block;

	${from.mobileLandscape} {
		margin-left: -20px;
	}
	${from.phablet} {
		margin-left: -10px;
	}
	${from.leftCol} {
		margin-left: -38px;
	}

	:after {
		border-radius: 0 0 25px;
		left: 10px;

		${from.phablet} {
			left: 10px;
		}
		${from.leftCol} {
			left: 27px;
		}
	}
`;

const fullyInline = css`
	margin-left: -10px;
	display: block;
`;

function decidePosition(role: string, design: ArticleDesign) {
	if (design === ArticleDesign.PhotoEssay) {
		return role === 'supporting' ? fullyLeft : fullyInline;
	}
	return role === 'supporting' ? partiallyLeft : partiallyInline;
}

const decideFontWeight = (theme: ArticleTheme) => {
	if (theme === ArticleSpecial.SpecialReportAlt) return 'light';

	return 'bold';
};

function decideFont(role: string) {
	if (role === 'supporting') {
		return css`
			${headline.xxsmall({ fontWeight: 'light' })};
		`;
	}
	return css`
		${headline.xsmall({ fontWeight: 'light' })};
	`;
}

export const PullQuoteBlockComponent: React.FC<{
	html?: string;
	palette: Palette;
	format: ArticleFormat;
	role: string;
	attribution?: string;
}> = ({ html, palette, format, attribution, role }) => {
	if (!html) return <></>;
	switch (format.design) {
		case ArticleDesign.Editorial:
		case ArticleDesign.Letter:
		case ArticleDesign.Comment:
			return (
				<aside
					css={[
						decidePosition(role, format.design),
						css`
							${headline.xxsmall({ fontWeight: 'light' })};
							line-height: 25px;
							position: relative;
							background-color: ${palette.background.pullQuote};
							padding-top: 6px;
							padding-bottom: 12px;
							margin-bottom: 28px;

							:after {
								content: '';
								width: 25px;
								height: 25px;
								bottom: -25px;
								position: absolute;
								background-color: ${palette.background
									.pullQuote};
							}
						`,
					]}
				>
					<QuoteIcon colour={palette.fill.quoteIcon} />
					<blockquote
						css={css`
							display: inline;
						`}
						dangerouslySetInnerHTML={{
							__html: unescapeData(html),
						}}
					/>
					<footer>
						<cite>{attribution}</cite>
					</footer>
				</aside>
			);
		case ArticleDesign.PhotoEssay:
			return (
				<aside
					css={[
						decidePosition(role, format.design),
						decideFont(role),
						css`
							color: ${palette.text.pullQuote};
							line-height: 25px;
							position: relative;
							padding-left: 10px;
							padding-right: 10px;
							padding-top: 6px;
							padding-bottom: 12px;
							margin-bottom: 16px;
						`,
					]}
				>
					<QuoteIcon colour={palette.fill.quoteIcon} />
					<blockquote
						dangerouslySetInnerHTML={{
							__html: unescapeData(html),
						}}
					/>
					<footer>
						<cite
							css={css`
								color: ${text.supporting};
							`}
						>
							{attribution}
						</cite>
					</footer>
				</aside>
			);
		default:
			return (
				<aside
					css={[
						decidePosition(role, format.design),
						css`
							${headline.xxsmall({
								fontWeight: decideFontWeight(format.theme),
							})};
							line-height: 25px;
							position: relative;
							background-color: ${palette.background.pullQuote};
							padding-left: 10px;
							padding-right: 10px;
							padding-top: 6px;
							padding-bottom: 12px;
							margin-bottom: 1.75rem;
							color: ${palette.text.pullQuote};

							:after {
								content: '';
								width: 25px;
								height: 25px;
								bottom: -25px;
								position: absolute;
								background-color: ${palette.background
									.pullQuote};
							}
						`,
					]}
				>
					<QuoteIcon colour={palette.fill.quoteIcon} />
					<blockquote
						css={css`
							display: inline;
						`}
						dangerouslySetInnerHTML={{
							__html: unescapeData(html),
						}}
					/>
					<footer>
						<cite
							css={css`
								color: ${palette.text.pullQuoteAttribution};
							`}
						>
							{attribution}
						</cite>
					</footer>
				</aside>
			);
	}
};
