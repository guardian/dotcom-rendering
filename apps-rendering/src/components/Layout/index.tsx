// ----- Imports ----- //

import { css } from '@emotion/react';
import type { Edition } from '@guardian/apps-rendering-api-models/edition';
import { ArticleDesign, ArticleDisplay, ArticleSpecial } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';
import { remSpace } from '@guardian/source-foundations';
import { partition } from '@guardian/types';
import { getAdPlaceholderInserter } from 'ads';
import type { BodyElement } from 'bodyElement';
import { ElementKind } from 'bodyElement';
import CommentLayout from 'components/Layout/CommentLayout';
import GalleryLayout from 'components/Layout/GalleryLayout';
import InteractiveLayout from 'components/Layout/InteractiveLayout';
import LabsLayout from 'components/Layout/LabsLayout';
import LiveLayout from 'components/Layout/LiveLayout';
import MediaLayout from 'components/Layout/MediaLayout';
import StandardLayout from 'components/Layout/StandardLayout';
import type { Item } from 'item';
import type { FC, ReactNode } from 'react';
import { renderAll, renderAllWithoutStyles } from 'renderer';
import ImmersiveLayout from './ImmersiveLayout';

// ----- Functions ----- //

const renderWithAds =
	(shouldHide: boolean) =>
	(format: ArticleFormat, elements: BodyElement[]): ReactNode[] =>
		getAdPlaceholderInserter(shouldHide)(
			renderAll(format, elements),
			format,
		);

// ----- Component ----- //

interface Props {
	item: Item;
	shouldHideAds: boolean;
	edition: Edition;
}

const notImplemented = (
	<p
		css={css`
			padding: 0 ${remSpace[3]};
		`}
	>
		Content format not implemented yet
	</p>
);

const Layout: FC<Props> = ({ item, shouldHideAds, edition }) => {
	if (
		item.design === ArticleDesign.LiveBlog ||
		item.design === ArticleDesign.DeadBlog
	) {
		return <LiveLayout item={item} edition={edition} />;
	}

	const body = partition(item.body).oks;
	const render = renderWithAds(shouldHideAds);

	if (item.theme === ArticleSpecial.Labs) {
		return (
			<LabsLayout item={item} edition={edition}>
				{render(item, body)}
			</LabsLayout>
		);
	}

	if (
		item.design === ArticleDesign.Interactive &&
		item.display === ArticleDisplay.Immersive
	) {
		return (
			<InteractiveLayout item={item}>
				{renderAllWithoutStyles(item, body)}
			</InteractiveLayout>
		);
	}

	if (
		item.design === ArticleDesign.Comment ||
		item.design === ArticleDesign.Letter ||
		item.design === ArticleDesign.Editorial
	) {
		return (
			<CommentLayout item={item} edition={edition}>
				{render(item, body)}
			</CommentLayout>
		);
	}

	if (item.design === ArticleDesign.Gallery) {
		return (
			<GalleryLayout item={item} edition={edition}>
				{render(item, body)}
			</GalleryLayout>
		);
	}

	if (
		item.design === ArticleDesign.Audio ||
		item.design === ArticleDesign.Video
	) {
		return (
			<MediaLayout item={item} edition={edition}>
				{render(
					item,
					body.filter((elem) => elem.kind === ElementKind.Image),
				)}
			</MediaLayout>
		);
	}

	if (
		item.design === ArticleDesign.Feature ||
		item.design === ArticleDesign.Analysis ||
		item.design === ArticleDesign.Review ||
		item.design === ArticleDesign.Standard ||
		item.design === ArticleDesign.Interactive ||
		item.design === ArticleDesign.Quiz ||
		item.design === ArticleDesign.MatchReport ||
		item.design === ArticleDesign.Obituary ||
		item.design === ArticleDesign.Correction ||
		item.design === ArticleDesign.Interview
	) {
		if (item.display === ArticleDisplay.Immersive) {
			return (
				<ImmersiveLayout item={item} edition={edition}>
					{render(item, body)}
				</ImmersiveLayout>
			);
		}

		return (
			<StandardLayout item={item} edition={edition}>
				{render(item, body)}
			</StandardLayout>
		);
	}

	return notImplemented;
};

// ----- Exports ----- //

export default Layout;
