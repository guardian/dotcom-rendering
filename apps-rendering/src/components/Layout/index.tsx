// ----- Imports ----- //

import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, ArticleSpecial } from '@guardian/libs';
import { remSpace } from '@guardian/source-foundations';
import CommentLayout from 'components/Layout/CommentLayout';
import GalleryLayout from 'components/Layout/GalleryLayout';
import InteractiveLayout from 'components/Layout/InteractiveLayout';
import LabsLayout from 'components/Layout/LabsLayout';
import LiveLayout from 'components/Layout/LiveLayout';
import StandardLayout from 'components/Layout/StandardLayout';
import type { Item } from 'item';
import type { FC } from 'react';
import AnalysisLayout from './AnalysisLayout';
import ImmersiveLayout from './ImmersiveLayout';
import LetterLayout from './LetterLayout';
import NewsletterSignUpLayout from './NewsletterSignUpLayout';

// ----- Component ----- //

interface Props {
	item: Item;
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

const Layout: FC<Props> = ({ item }) => {
	if (
		item.design === ArticleDesign.LiveBlog ||
		item.design === ArticleDesign.DeadBlog
	) {
		return <LiveLayout item={item} />;
	}

	if (item.theme === ArticleSpecial.Labs) {
		return <LabsLayout item={item} />;
	}

	if (
		item.design === ArticleDesign.Interactive &&
		item.display === ArticleDisplay.Immersive
	) {
		return <InteractiveLayout item={item} />;
	}

	if (
		item.design === ArticleDesign.Comment ||
		item.design === ArticleDesign.Editorial
	) {
		return <CommentLayout item={item} />;
	}

	if (item.design === ArticleDesign.Letter) {
		return <LetterLayout item={item} />;
	}
	if (item.design === ArticleDesign.Analysis) {
		return <AnalysisLayout item={item} />;
	}

	if (item.design === ArticleDesign.Gallery) {
		return <GalleryLayout item={item} />;
	}

	if (item.design === ArticleDesign.NewsletterSignup) {
		return <NewsletterSignUpLayout item={item} />;
	}

	if (
		item.design === ArticleDesign.Feature ||
		item.design === ArticleDesign.Explainer ||
		item.design === ArticleDesign.Review ||
		item.design === ArticleDesign.Standard ||
		item.design === ArticleDesign.Interactive ||
		item.design === ArticleDesign.Quiz ||
		item.design === ArticleDesign.MatchReport ||
		item.design === ArticleDesign.Obituary ||
		item.design === ArticleDesign.Correction ||
		item.design === ArticleDesign.Interview ||
		item.design === ArticleDesign.Recipe
	) {
		if (item.display === ArticleDisplay.Immersive) {
			return <ImmersiveLayout item={item} />;
		}

		return <StandardLayout item={item} />;
	}

	return notImplemented;
};

// ----- Exports ----- //

export default Layout;
