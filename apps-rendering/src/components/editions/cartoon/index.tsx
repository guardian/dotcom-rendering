import { FC } from 'react';
import { Cartoon } from '../../../cartoon';
import { ArticleFormat } from '@guardian/libs';
import { css } from '@emotion/react';
import { from } from '@guardian/source-foundations';
import {
	articlePaddingStyles,
	desktopArticleMargin,
	tabletArticleMargin,
	tabletContentWidth, wideArticleMargin,
	wideContentWidth
} from '../styles';
import { none, some } from "@guardian/types";
import Img from "../../ImgAlt";
import FigCaption from "../../FigCaption";
import { CaptionIconVariant } from "../../CaptionIcon";
import Caption from "../../caption";
import { Optional } from "../../../optional";
import Credit from "../../Credit";

const cartoonId = 'multi-panel-cartoon-figure';

interface Props {
	cartoon: Cartoon;
	format: ArticleFormat
}

const layoutStyles = css`
	position: relative;
	width: 100%;
	${from.tablet} {
		width: ${tabletContentWidth + tabletArticleMargin + 12}px;
		${from.desktop} {
			width: ${wideContentWidth + desktopArticleMargin + 12}px;
			${from.wide} {
				width: ${wideContentWidth + wideArticleMargin + 12}px;
			}
		}
	}
`;

const imageSizes = {
	mediaQueries: [],
	default: '100%',
}

const captionStyles = css`
	padding-left: 5px;
	${from.tablet} {
		padding-left: 0px;
	}
`;

const Cartoon: FC<Props> = ({
	cartoon: { images, credit, caption, nativeCaption },
	format,
}) => {
	return (
		<div css={[articlePaddingStyles, layoutStyles]}>
			<figure aria-labelledby={cartoonId}>
				{ images.map((image) => {
					return (<Img
						image={image}
						sizes={imageSizes}
						format={format}
						className={none}
						lightbox={some({
							className: 'js-launch-slideshow js-main-image',
							caption: nativeCaption,
							credit: credit,
						})}
					/>)
				})}
				<FigCaption
					css={captionStyles}
					format={format}
					variant={CaptionIconVariant.Image}
				>
					{Optional.some([
						<Caption caption={caption} format={format} />,
						<Credit credit={credit} format={format}/>
					])}
				</FigCaption>
			</figure>
		</div>
	);
}

export default Cartoon;
