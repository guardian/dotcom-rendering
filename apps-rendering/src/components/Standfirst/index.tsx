// ----- Imports ----- //
import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, ArticleSpecial } from '@guardian/libs';
import { headline } from '@guardian/source-foundations';
import type { Item } from 'item';
import { getFormat } from 'item';
import DeadBlogStandfirst from './DeadBlogStandfirst';
import ImmersiveLabsStandfirst from './ImmersiveLabsStandfirst';
import ImmersiveStandfirst from './ImmersiveStandfirst';
import LabsStandfirst from './LabsStandfirst';
import LiveBlogStandfirst from './LiveBlogStandfirst';
import MediaStandfirst from './MediaStandfirst';
import DefaultStandfirst, { defaultStyles } from './Standfirst.defaults';

// ----- Component ----- //
interface Props {
	item: Item;
}

const Standfirst: React.FC<Props> = ({ item }) => {
	const format = getFormat(item);

	if (format.display === ArticleDisplay.Immersive) {
		return format.theme === ArticleSpecial.Labs ? (
			<ImmersiveLabsStandfirst item={item} />
		) : (
			<ImmersiveStandfirst item={item} />
		);
	}
	if (format.theme === ArticleSpecial.Labs) {
		return <LabsStandfirst item={item} />;
	}
	switch (format.design) {
		case ArticleDesign.LiveBlog:
			return <LiveBlogStandfirst item={item} />;
		case ArticleDesign.DeadBlog:
			return <DeadBlogStandfirst item={item} />;

		case ArticleDesign.Gallery:
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
			return <MediaStandfirst item={item} />;

		case ArticleDesign.Review:
		case ArticleDesign.Feature:
		case ArticleDesign.Editorial:
		case ArticleDesign.Letter:
		case ArticleDesign.Comment:
			return (
				<DefaultStandfirst
					item={item}
					css={css(
						defaultStyles(format),
						css`
							${headline.xxsmall({ fontWeight: 'light' })}
						`,
					)}
				/>
			);
		default:
			return (
				<DefaultStandfirst
					item={item}
					css={css(
						defaultStyles(format),
						css`
							${headline.xxxsmall({ fontWeight: 'bold' })}
							padding: 0;
						`,
					)}
				/>
			);
	}
};

// ----- Exports ----- //

export default Standfirst;
