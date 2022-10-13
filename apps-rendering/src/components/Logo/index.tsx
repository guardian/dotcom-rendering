import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { text } from '@guardian/common-rendering/src/editorialPalette';
import { ArticleDesign } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';
import { remSpace, textSans, until } from '@guardian/source-foundations';
import Anchor from 'components/Anchor';
import { getFormat } from 'item';
import type { Item } from 'item';
import { maybeRender } from 'lib';
import type { FC } from 'react';
import { darkModeCss } from 'styles';

interface Props {
	item: Item;
}

const styles = (
	format: ArticleFormat,
	lightModeImage: string,
	darkModeImage?: string,
): SerializedStyles => {
	return css`
		margin: ${remSpace[9]} 0;
		${textSans.small()}
		background-color: transparent;

		img {
			content: url('${lightModeImage}');
			display: block;
			margin: ${remSpace[3]} 0;
			max-height: 60px;
		}

		label {
			color: ${text.branding(format)};
		}

		a {
			color: ${text.articleLink(format)};
		}

		${darkModeCss`
            img {
                content: url("${darkModeImage ?? lightModeImage}");
            }

            label {
                color: ${text.brandingDark(format)};
            }

            a {
                color: ${text.linkDark(format)};
            }
        `}
	`;
};

const blogStyles = css`
	margin: 0 0 ${remSpace[4]};

	${until.mobileLandscape} {
		padding-left: ${remSpace[3]};
		padding-right: ${remSpace[3]};
	}

	img {
		max-height: unset;
	}
`;

const galleryStyles = (lightModeImage: string, darkModeImage?: string) => css`
	img {
		content: url("${darkModeImage ?? lightModeImage}");
	}
`;

const getStyles = (
	format: ArticleFormat,
	lightModeImage: string,
	darkModeImage?: string,
): SerializedStyles => {
	switch (format.design) {
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
			return css(
				styles(format, lightModeImage, darkModeImage),
				blogStyles,
			);
		case ArticleDesign.Gallery:
			return css(
				styles(format, lightModeImage, darkModeImage),
				galleryStyles(lightModeImage, darkModeImage),
			);
		default:
			return styles(format, lightModeImage, darkModeImage);
	}
};

export const cleanImageUrl = (url: string): string =>
	encodeURI(url).replace(/\(/g, '%28').replace(/\)/g, '%29');

const Logo: FC<Props> = ({ item }) => {
	const format = getFormat(item);

	return maybeRender(item.branding, (branding) => {
		const lightLogo = cleanImageUrl(branding.logo);
		const darkLogo = cleanImageUrl(branding.altLogo ?? branding.logo);

		return (
			<section css={getStyles(format, lightLogo, darkLogo)}>
				<label>{branding.label}</label>
				<a href={branding.sponsorUri}>
					<img alt={branding.sponsorName} />
				</a>
				<Anchor href={branding.aboutUri} format={format}>
					About this content
				</Anchor>
			</section>
		);
	});
};

export default Logo;
