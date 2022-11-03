import type { SerializedStyles } from '@emotion/react';
import { css, ThemeProvider } from '@emotion/react';
import {
	background,
	text,
} from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import {
	from,
	headline,
	remSpace,
	textSans,
	until,
} from '@guardian/source-foundations';
import { Button, buttonThemeBrandAlt } from '@guardian/source-react-components';
import type { FC, ReactElement } from 'react';
import { darkModeCss, wideContentWidth } from 'styles';

type Props = {
	className: string;
	paragraph: number;
	format: ArticleFormat;
};

const adLabelsStyles = (format: ArticleFormat): SerializedStyles => css`
	${textSans.xsmall()}
	color: ${text.adLabel(format)};
	padding: ${remSpace[3]};
	float: left;
	// We need to account for padding on both sides
	width: calc(100% - 2 * ${remSpace[3]});

	p > strong {
		margin: 0;
		float: left;
		font-size: 16px;
		font-weight: 400;

		${darkModeCss`
		color: ${text.adLabelDark(format)};
	`}
	}
`;

const supportBannerStyles = (format: ArticleFormat): SerializedStyles => css`
	padding: ${remSpace[3]};
	background-color: ${background.supportBanner(format)};

	p > strong {
		${headline.xxxsmall()};
		margin-top: 0;
	}

	button {
		margin-top: ${remSpace[3]};
	}

	${darkModeCss`
		background-color: ${background.supportBannerDark(format)};
	`}
`;

const styles = (format: ArticleFormat): SerializedStyles => css`
	clear: both;
	margin: ${remSpace[4]} 0;
	color: ${text.adSlot(format)};
	background: ${background.adSlot(format)};

	&.hidden {
		display: none;
	}

	${darkModeCss`
		background-color: ${background.adSlotDark(format)};
	`}

	${from.desktop} {
		position: absolute;
		margin-left: calc(${wideContentWidth}px + ${remSpace[4]});
		min-width: 300px;
		margin-bottom: ${remSpace[6]};
	}

	${until.phablet} {
		margin: 1em -${remSpace[3]};
	}

	// This class is applied if the article has fewer than 15 paragraphs.
	&.short:nth-of-type(1) {
		${from.desktop} {
			top: 0;
		}
	}
`;

const adHeight = '258px';

const adSlotStyles = css`
	clear: both;
	padding-bottom: ${adHeight};

	// This class is applied in the nativeCommunication module
	// to the first ad slot if Teads ads are enabled.
	&.ad-slot-square {
		height: 344px;
		width: 320px;
		margin-left: auto;
		margin-right: auto;
		padding-bottom: 0;
	}
`;

const AdSlot: FC<Props> = ({ className, paragraph, format }): ReactElement => (
	<aside
		css={styles(format)}
		className={className}
		key={`ad-after-${paragraph}-para`}
	>
		<div css={adLabelsStyles(format)} className="ad-labels">
			<p>
				<strong>Advertisement</strong>
			</p>
		</div>
		<div css={adSlotStyles} className="ad-slot"></div>
		<div css={supportBannerStyles(format)} className="support-banner">
			<p>
				<strong>Support the Guardian and enjoy the app ad-free.</strong>
			</p>
			<ThemeProvider theme={buttonThemeBrandAlt}>
				<Button>Support the Guardian</Button>
			</ThemeProvider>
		</div>
	</aside>
);

export default AdSlot;
